// Questions du quiz final IPAG Bloc 2 (source : quiz commentés V3, Dropbox).
// Le hash est celui du code enseignant ; le code lui-même n'est pas dans le dépôt.
export const TEACHER_CODE_SHA256 = "cf65a86efab960a7d753552ac0474ea22743982a38eb5e62ee050bd77fb92d12";

export const QUESTIONS = [
  {
    "q": "Combien de dirigeants de 60 ans ou plus pourraient partir à la retraite d'ici 2032 ?",
    "options": [
      "Environ 50 000",
      "Environ 200 000",
      "Environ 500 000"
    ],
    "answer": 2,
    "explanation": "Environ 500 000 dirigeants, alors que seulement 26 000 à 37 000 entreprises sont cédées chaque année.",
    "source": "rapport Grégoire"
  },
  {
    "q": "Combien d'entreprises d'au moins un salarié sont à transmettre d'ici 2030 ?",
    "options": [
      "Environ 37 000",
      "Environ 130 000",
      "Environ 370 000"
    ],
    "answer": 2,
    "explanation": "370 000 entreprises, dont 310 000 TPE. Au rythme actuel, seules 130 000 seraient effectivement transmises en cinq ans.",
    "source": "Bpifrance Le Lab, 2025"
  },
  {
    "q": "Environ quelle part des transmissions de PME (20 à 249 salariés) se fait au sein de la famille ?",
    "options": [
      "Un quart",
      "La moitié",
      "Les trois quarts"
    ],
    "answer": 0,
    "explanation": "Sur le marché des PME, la transmission familiale ne pèse qu'un quart. Elle est plus fréquente dans les très petites entreprises.",
    "source": "Observatoire CNCFA-Epsilon, 2021"
  },
  {
    "q": "Un MBI (Management Buy-In), c'est :",
    "options": [
      "Une reprise par les salariés ou l'équipe de direction",
      "Une reprise par un repreneur extérieur",
      "Une introduction en Bourse"
    ],
    "answer": 1,
    "explanation": "Le MBO est la reprise par l'équipe en place ; le MBI fait entrer un dirigeant venu de l'extérieur.",
    "source": null
  },
  {
    "q": "Quand on rachète un fonds de commerce, on reprend aussi les dettes de la société.",
    "options": [
      "Vrai",
      "Faux"
    ],
    "answer": 1,
    "explanation": "On achète des actifs (clientèle, droit au bail, matériel), pas la société elle-même.",
    "source": null
  },
  {
    "q": "Quand on rachète les titres d'une société, on reprend :",
    "options": [
      "Uniquement ses actifs",
      "Son actif et son passif",
      "Uniquement sa clientèle"
    ],
    "answer": 1,
    "explanation": "Acheter les titres, c'est acheter la société entière, avec ses dettes et ses risques passés. D'où des audits plus étendus.",
    "source": null
  },
  {
    "q": "Lequel de ces points est un avantage de la reprise ?",
    "options": [
      "Une liberté totale pour tout construire",
      "Des clients et un chiffre d'affaires dès le premier jour",
      "Un prix d'achat peu élevé",
      "Peu de dettes au démarrage"
    ],
    "answer": 1,
    "explanation": "L'activité tourne déjà : clients, chiffre d'affaires et salariés sont là. La liberté totale, un faible investissement de départ et peu de dettes sont les avantages de la création.",
    "source": null
  },
  {
    "q": "Quel inconvénient est propre à la reprise ?",
    "options": [
      "Trouver ses premiers clients",
      "Hériter de risques cachés",
      "Faire connaître sa marque"
    ],
    "answer": 1,
    "explanation": "Certains problèmes ne sont pas visibles au départ (litiges, passif social, matériel usé). Les deux autres difficultés sont celles du créateur.",
    "source": null
  },
  {
    "q": "Qu'est-ce qui pousse typiquement un dirigeant à vendre son entreprise ?",
    "options": [
      "Accélérer sa carrière",
      "Partir à la retraite en assurant l'avenir de l'entreprise",
      "La lassitude de la gestion des ressources humaines : recruter, fidéliser, gérer les conflits",
      "Les réponses B et C"
    ],
    "answer": 3,
    "explanation": "La retraite et l'absence de succession familiale restent les premières motivations. La gestion du personnel en est une autre, très concrète : difficultés de recrutement, absentéisme, conflits, usure du dirigeant. Accélérer sa carrière est une motivation de repreneur.",
    "source": null
  },
  {
    "q": "Selon le rapport Grégoire, quel est le premier risque d'une reprise ?",
    "options": [
      "Le niveau des taux d'intérêt",
      "La dépendance au dirigeant sortant",
      "La concurrence étrangère"
    ],
    "answer": 1,
    "explanation": "Clients, savoir-faire, décisions : tout repose souvent sur le cédant. D'où l'importance de son accompagnement après la cession.",
    "source": "rapport Grégoire"
  },
  {
    "q": "Combien de temps faudrait-il pour bien préparer une transmission ?",
    "options": [
      "6 mois",
      "1 an",
      "3 à 5 ans"
    ],
    "answer": 2,
    "explanation": "Le rapport Grégoire recommande 3 à 5 ans. La plupart des dirigeants s'y prennent moins de 2 ans avant.",
    "source": "rapport Grégoire"
  },
  {
    "q": "Combien de temps dure en général une opération de reprise, de la cible trouvée au closing ?",
    "options": [
      "2 à 4 mois",
      "4 à 6 mois",
      "6 à 12 mois"
    ],
    "answer": 2,
    "explanation": "Comptez 6 à 12 mois entre la cible trouvée et le closing : négociation, LOI, audits, financement, protocole. Avec la préparation et la recherche, le parcours complet prend 12 à 24 mois.",
    "source": null
  },
  {
    "q": "Dans quel ordre se succèdent les étapes juridiques d'une reprise ?",
    "options": [
      "LOI, NDA, audits, closing",
      "NDA, LOI, audits, protocole, closing",
      "NDA, protocole, audits, LOI, closing"
    ],
    "answer": 1,
    "explanation": "On signe d'abord la confidentialité, puis on fixe le cadre (LOI), on vérifie (audits), on signe le contrat (protocole) et on transfère la propriété (closing).",
    "source": null
  },
  {
    "q": "À quoi sert un NDA (engagement de confidentialité) ?",
    "options": [
      "Protéger les informations confidentielles échangées",
      "Fixer le prix de la transaction",
      "Définir l'accompagnement du cédant",
      "Garantir le financement bancaire"
    ],
    "answer": 0,
    "explanation": "Il est signé avant toute transmission d'informations sur l'entreprise.",
    "source": null
  },
  {
    "q": "Un teaser contient le nom de l'entreprise.",
    "options": [
      "Vrai",
      "Faux"
    ],
    "answer": 1,
    "explanation": "Le teaser est anonyme. Le nom n'est donné qu'après la signature du NDA.",
    "source": null
  },
  {
    "q": "La LOI (lettre d'intention) oblige le repreneur à acheter l'entreprise.",
    "options": [
      "Vrai",
      "Faux"
    ],
    "answer": 1,
    "explanation": "Elle cadre la négociation mais n'oblige pas à acheter, sauf ses clauses d'exclusivité et de confidentialité.",
    "source": null
  },
  {
    "q": "La due diligence consiste uniquement à vérifier les comptes financiers.",
    "options": [
      "Vrai",
      "Faux"
    ],
    "answer": 1,
    "explanation": "Elle couvre aussi le juridique, le fiscal, le social, le commercial et l'informatique.",
    "source": null
  },
  {
    "q": "À quoi sert une GAP (garantie d'actif et de passif) ?",
    "options": [
      "Fixer le prix définitif",
      "Protéger l'acheteur si une dette ou un risque non révélé apparaît après la vente",
      "Décrypter les comptes de la société",
      "Organiser le financement"
    ],
    "answer": 1,
    "explanation": "Le vendeur indemnise l'acheteur si un passif antérieur à la cession apparaît après la vente, par exemple un redressement fiscal.",
    "source": null
  },
  {
    "q": "Un earn-out est :",
    "options": [
      "Une partie du prix payée selon les résultats futurs de l'entreprise",
      "Un complément de salaire pour un homme clé",
      "Une somme due à la banque"
    ],
    "answer": 0,
    "explanation": "Il réduit l'écart entre le prix demandé et le prix offert : une partie du prix dépend des résultats futurs.",
    "source": null
  },
  {
    "q": "Le cédant peut aider à financer l'acquisition grâce à un crédit vendeur.",
    "options": [
      "Vrai",
      "Faux"
    ],
    "answer": 0,
    "explanation": "17 % des reprises y ont recours ; il pèse alors 40 % du financement.",
    "source": "Bpifrance Le Lab, 2025"
  }
];
