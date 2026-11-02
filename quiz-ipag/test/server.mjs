// Essai local : sert public/ et la fonction, avec un magasin en mémoire à la place de Netlify Blobs.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { handle } from "../netlify/functions/quiz/quiz.mjs";

const mem = new Map();
const store = {
  get: async (k) => (mem.has(k) ? JSON.parse(mem.get(k)) : null),
  setJSON: async (k, v) => void mem.set(k, JSON.stringify(v)),
  delete: async (k) => void mem.delete(k),
  list: async ({ prefix }) => ({ blobs: [...mem.keys()].filter((k) => k.startsWith(prefix)).map((key) => ({ key })) }),
};
const types = { ".html": "text/html; charset=utf-8", ".png": "image/png", ".pdf": "application/pdf" };
const root = new URL("../public/", import.meta.url).pathname;

http.createServer(async (req, res) => {
  const url = `http://localhost${req.url}`;
  if (req.url.startsWith("/api/")) {
    const chunks = []; for await (const c of req) chunks.push(c);
    const r = await handle(new Request(url, { method: req.method, headers: req.headers, body: chunks.length ? Buffer.concat(chunks) : undefined }), store);
    res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(await r.text()); return;
  }
  const path = new URL(url).pathname === "/" ? "index.html" : new URL(url).pathname.slice(1);
  try { const b = await readFile(join(root, path)); res.writeHead(200, { "content-type": types[extname(path)] || "application/octet-stream" }); res.end(b); }
  catch { res.writeHead(404); res.end("404"); }
}).listen(process.env.PORT || 8888, () => console.log("http://localhost:" + (process.env.PORT || 8888)));
