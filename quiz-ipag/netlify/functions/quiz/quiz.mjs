// Quiz final IPAG Bloc 2 : une seule fonction pour les élèves et l'enseignante.
// État de la séance et réponses dans Netlify Blobs (magasin « quiz-ipag »).
//   state       { phase: lobby | question | reveal | end, q, openedAt }
//   p/<id>      { name, joinedAt, answers: { <q>: { c, ms } } }
import { getStore } from "@netlify/blobs";
import { QUESTIONS, TEACHER_CODE_SHA256 } from "./questions.mjs";

export const config = { path: "/api/*" };

const LOBBY = { phase: "lobby", q: 0, openedAt: 0 };
const ID = /^[a-z0-9]{12,40}$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// question as students see it: no answer, no explanation
const publicQuestion = (i) => ({ q: QUESTIONS[i].q, options: QUESTIONS[i].options });

const score = (p) =>
  Object.entries(p.answers || {}).reduce((s, [q, a]) => s + (QUESTIONS[q] && a.c === QUESTIONS[q].answer ? 1 : 0), 0);

const time = (p) => Object.values(p.answers || {}).reduce((s, a) => s + (a.ms || 0), 0);

async function players(store) {
  const { blobs } = await store.list({ prefix: "p/" });
  const all = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
  return all.filter(Boolean);
}

// ranking: score, then total answer time (faster first)
const ranking = (list) =>
  list
    .map((p) => ({ name: p.name, score: score(p), time: time(p) }))
    .sort((a, b) => b.score - a.score || a.time - b.time);

async function readState(store) {
  return (await store.get("state", { type: "json" })) || LOBBY;
}

async function teacherView(store, state) {
  const list = await players(store);
  const view = { state, total: QUESTIONS.length, players: list.length, names: list.map((p) => p.name) };
  if (state.phase === "question" || state.phase === "reveal") {
    const counts = QUESTIONS[state.q].options.map(() => 0);
    let answered = 0;
    for (const p of list) {
      const a = p.answers?.[state.q];
      if (a) { answered++; counts[a.c] = (counts[a.c] || 0) + 1; }
    }
    view.question = QUESTIONS[state.q];
    view.answered = answered;
    if (state.phase === "reveal") view.counts = counts;
  }
  if (state.phase === "reveal" || state.phase === "end") view.top = ranking(list).filter((p) => p.score > 0).slice(0, 3);
  return view;
}

export async function handle(req, store) {
  const url = new URL(req.url);
  const route = url.pathname.replace(/^\/api\//, "");
  const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};

  // ---------- élèves ----------
  if (route === "join" && req.method === "POST") {
    const name = String(body.name || "").trim().replace(/\s+/g, " ").slice(0, 30);
    if (!ID.test(body.id || "") || !name) return json({ error: "Prénom obligatoire." }, 400);
    const prev = await store.get(`p/${body.id}`, { type: "json" });
    await store.setJSON(`p/${body.id}`, { name, joinedAt: prev?.joinedAt || Date.now(), answers: prev?.answers || {} });
    return json({ ok: true });
  }

  if (route === "state" && req.method === "GET") {
    const id = url.searchParams.get("id") || "";
    const [state, me] = await Promise.all([readState(store), ID.test(id) ? store.get(`p/${id}`, { type: "json" }) : null]);
    const out = { phase: state.phase, q: state.q, total: QUESTIONS.length, joined: !!me };
    if (me) { out.name = me.name; }
    if (state.phase === "question" || state.phase === "reveal") {
      out.question = publicQuestion(state.q);
      out.mine = me?.answers?.[state.q]?.c ?? null;
    }
    if (state.phase === "reveal") {
      out.answer = QUESTIONS[state.q].answer;
      out.explanation = QUESTIONS[state.q].explanation;
    }
    if (me && (state.phase === "reveal" || state.phase === "end")) out.score = score(me);
    return json(out);
  }

  if (route === "answer" && req.method === "POST") {
    const { id, q, c } = body;
    if (!ID.test(id || "")) return json({ error: "Session inconnue." }, 400);
    const state = await readState(store);
    if (state.phase !== "question" || q !== state.q) return json({ error: "La question est fermée." }, 409);
    if (!Number.isInteger(c) || c < 0 || c >= QUESTIONS[q].options.length) return json({ error: "Réponse invalide." }, 400);
    const me = await store.get(`p/${id}`, { type: "json" });
    if (!me) return json({ error: "Entrez d'abord votre prénom." }, 400);
    if (me.answers?.[q]) return json({ ok: true, c: me.answers[q].c }); // une seule réponse par question
    me.answers = { ...(me.answers || {}), [q]: { c, ms: Math.max(0, Date.now() - (state.openedAt || Date.now())) } };
    await store.setJSON(`p/${id}`, me);
    return json({ ok: true, c });
  }

  // ---------- enseignante ----------
  if (route === "admin" && req.method === "POST") {
    if ((await sha256(String(body.code || "").trim().toUpperCase())) !== TEACHER_CODE_SHA256)
      return json({ error: "Code incorrect." }, 403);
    let state = await readState(store);
    const last = QUESTIONS.length - 1;
    switch (body.action) {
      case "status":
        break;
      case "start":
        state = { phase: "question", q: 0, openedAt: Date.now() };
        break;
      case "reveal":
        if (state.phase === "question") state = { ...state, phase: "reveal" };
        break;
      case "next":
        if (state.phase === "reveal")
          state = state.q < last ? { phase: "question", q: state.q + 1, openedAt: Date.now() } : { ...state, phase: "end" };
        break;
      case "reset": {
        const { blobs } = await store.list({ prefix: "p/" });
        await Promise.all(blobs.map((b) => store.delete(b.key)));
        state = LOBBY;
        break;
      }
      default:
        return json({ error: "Action inconnue." }, 400);
    }
    if (body.action !== "status") await store.setJSON("state", state);
    return json(await teacherView(store, state));
  }

  return json({ error: "Introuvable." }, 404);
}

export default async (req) => handle(req, getStore({ name: "quiz-ipag", consistency: "strong" }));
