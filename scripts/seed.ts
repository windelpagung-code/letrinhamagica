import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// ─── Pixabay helper ──────────────────────────────────────────────────────────

async function fetchPixabayImage(query: string): Promise<string | null> {
  const key = process.env.PIXABAY_API_KEY;
  if (!key) return null;
  try {
    const url = new URL("https://pixabay.com/api/");
    url.searchParams.set("key", key);
    url.searchParams.set("q", query);
    url.searchParams.set("image_type", "illustration");
    url.searchParams.set("safesearch", "true");
    url.searchParams.set("per_page", "5");
    url.searchParams.set("lang", "pt");
    const res = await fetch(url.toString());
    const data = await res.json() as { hits: { webformatURL: string }[] };
    return data.hits?.[0]?.webformatURL ?? null;
  } catch {
    return null;
  }
}

// ─── Activity definitions ─────────────────────────────────────────────────────

const activities = [
  // ─── LETRAS E SÍLABAS ──────────────────────────────────────────────────────
  {
    title: "Sílabas com Animais: PA-TO, GA-TO, CA-SA",
    description: "Junte as sílabas e descubra o nome dos animais! Uma atividade divertida para aprender a leitura silábica.",
    category: "letras",
    ageMin: 4, ageMax: 6,
    difficulty: "easy",
    skill: "Consciência silábica e leitura",
    theme: "Animais",
    pixabayQuery: "children alphabet letters education",
    type: "INTERACTIVE",
  },
  {
    title: "Monte a Palavra com Letras",
    description: "Organize as letras embaralhadas e forme palavras simples do dia a dia.",
    category: "letras",
    ageMin: 5, ageMax: 7,
    difficulty: "medium",
    skill: "Formação de palavras e soletração",
    theme: "Palavras do cotidiano",
    pixabayQuery: "alphabet puzzle kids learning",
    type: "INTERACTIVE",
  },
  {
    title: "Vogais: A E I O U com Imagens",
    description: "Identifique as vogais em palavras ilustradas e aprenda a diferenciá-las com exemplos coloridos.",
    category: "letras",
    ageMin: 3, ageMax: 5,
    difficulty: "easy",
    skill: "Reconhecimento de vogais",
    theme: "Vogais",
    pixabayQuery: "vowels kids classroom colorful",
    type: "PDF",
  },
  {
    title: "Alfabeto Ilustrado: A de Abelha",
    description: "Conheça cada letra do alfabeto com um desenho correspondente. Trace, repita e aprenda.",
    category: "letras",
    ageMin: 4, ageMax: 6,
    difficulty: "easy",
    skill: "Reconhecimento do alfabeto",
    theme: "Alfabeto",
    pixabayQuery: "alphabet animals children illustration",
    type: "PDF",
  },
  {
    title: "Que Letra Começa? Associe Figura à Letra",
    description: "Observe a figura e marque a letra inicial correta. Ótimo para desenvolver a consciência fonêmica.",
    category: "letras",
    ageMin: 5, ageMax: 7,
    difficulty: "medium",
    skill: "Consciência fonêmica e letra inicial",
    theme: "Sons e letras",
    pixabayQuery: "letter sound matching kids",
    type: "INTERACTIVE",
  },

  // ─── LEITURA ───────────────────────────────────────────────────────────────
  {
    title: "Textos Curtos: Ana vai à Casa da Vovó",
    description: "Leia frases simples com palavras do cotidiano. Perfeito para primeiros leitores em alfabetização.",
    category: "leitura",
    ageMin: 5, ageMax: 7,
    difficulty: "easy",
    skill: "Leitura de frases simples",
    theme: "Família",
    pixabayQuery: "reading children book learn",
    type: "PDF",
  },
  {
    title: "Palavras Simples com Figuras: VACA, BOLA, CASA",
    description: "Leia palavras simples de 2 sílabas associadas a figuras coloridas e ilustrativas.",
    category: "leitura",
    ageMin: 4, ageMax: 6,
    difficulty: "easy",
    skill: "Leitura de palavras simples",
    theme: "Objetos e animais",
    pixabayQuery: "word picture matching children learning",
    type: "INTERACTIVE",
  },
  {
    title: "Ligue o Desenho à Palavra Correta",
    description: "Observe os desenhos e ligue cada um à sua palavra. Atividade de associação visual e leitura.",
    category: "leitura",
    ageMin: 5, ageMax: 7,
    difficulty: "medium",
    skill: "Associação palavra-imagem",
    theme: "Vocabulário",
    pixabayQuery: "matching words pictures worksheet kids",
    type: "INTERACTIVE",
  },
  {
    title: "Frases do Dia a Dia para Completar",
    description: "Complete frases simples escolhendo a palavra correta. Desenvolve compreensão e vocabulário.",
    category: "leitura",
    ageMin: 6, ageMax: 7,
    difficulty: "hard",
    skill: "Compreensão e vocabulário",
    theme: "Cotidiano",
    pixabayQuery: "sentence completion worksheet children",
    type: "PDF",
  },
  {
    title: "Leitura com Histórias Infantis Curtas",
    description: "Texto curtíssimo com ilustrações. A criança lê e depois responde perguntas simples com desenhos.",
    category: "leitura",
    ageMin: 6, ageMax: 7,
    difficulty: "hard",
    skill: "Compreensão de texto e interpretação",
    theme: "Histórias",
    pixabayQuery: "children story book illustration",
    type: "PDF",
  },

  // ─── TRAÇADO ───────────────────────────────────────────────────────────────
  {
    title: "Traçado de Letras Maiúsculas A a Z",
    description: "Trace as letras maiúsculas seguindo os pontilhados. Desenvolve coordenação fina e memória gráfica.",
    category: "tracado",
    ageMin: 4, ageMax: 6,
    difficulty: "easy",
    skill: "Traçado e coordenação motora fina",
    theme: "Letras",
    pixabayQuery: "handwriting practice dotted letters kids",
    type: "PDF",
  },
  {
    title: "Trace os Números de 1 a 10",
    description: "Trace cada número seguindo o modelo pontilhado e conte os objetos ao lado.",
    category: "tracado",
    ageMin: 3, ageMax: 5,
    difficulty: "easy",
    skill: "Traçado de números e contagem",
    theme: "Números",
    pixabayQuery: "number tracing worksheet children",
    type: "PDF",
  },
  {
    title: "Traçado de Formas Geométricas",
    description: "Trace círculos, quadrados, triângulos e retângulos com diferentes tamanhos e cores.",
    category: "tracado",
    ageMin: 3, ageMax: 5,
    difficulty: "easy",
    skill: "Reconhecimento e traçado de formas",
    theme: "Formas",
    pixabayQuery: "geometric shapes tracing kids worksheet",
    type: "PDF",
  },
  {
    title: "Trace o Caminho: Labirinto de Animais",
    description: "Ajude o animal a encontrar seu alimento seguindo o caminho correto. Treina controle do lápis.",
    category: "tracado",
    ageMin: 4, ageMax: 6,
    difficulty: "medium",
    skill: "Controle do traçado e direcionamento",
    theme: "Animais",
    pixabayQuery: "maze animals kids puzzle",
    type: "INTERACTIVE",
  },

  // ─── NÚMEROS ───────────────────────────────────────────────────────────────
  {
    title: "Contagem com Animais: Quantos Há?",
    description: "Conte os animais em cada grupo e escreva o número. Atividade prática de contagem com figuras.",
    category: "numeros",
    ageMin: 3, ageMax: 5,
    difficulty: "easy",
    skill: "Contagem e correspondência número-quantidade",
    theme: "Animais",
    pixabayQuery: "counting animals numbers kids",
    type: "INTERACTIVE",
  },
  {
    title: "Números 1 a 10: Ligue ao Grupo Certo",
    description: "Ligue cada numeral ao grupo com a quantidade correta de objetos. Aprendendo os números 1 a 10.",
    category: "numeros",
    ageMin: 4, ageMax: 6,
    difficulty: "easy",
    skill: "Correspondência numeral-quantidade",
    theme: "Números 1-10",
    pixabayQuery: "number matching quantity kids",
    type: "INTERACTIVE",
  },
  {
    title: "Antes e Depois: Sequência Numérica",
    description: "Complete a sequência escrevendo o número que vem antes e depois. Ordena o pensamento lógico.",
    category: "numeros",
    ageMin: 5, ageMax: 7,
    difficulty: "medium",
    skill: "Sequência numérica e ordem",
    theme: "Sequência",
    pixabayQuery: "number sequence worksheet children",
    type: "PDF",
  },
  {
    title: "Mais ou Menos: Compare as Quantidades",
    description: "Compare dois grupos e marque qual tem mais ou menos. Introduz conceitos de comparação numérica.",
    category: "numeros",
    ageMin: 4, ageMax: 6,
    difficulty: "medium",
    skill: "Comparação de quantidades",
    theme: "Comparação",
    pixabayQuery: "more less comparison kids math",
    type: "PDF",
  },

  // ─── MATEMÁTICA ────────────────────────────────────────────────────────────
  {
    title: "Soma Divertida com Figuras (até 5)",
    description: "Some os objetos ilustrados e escreva o resultado. Adição com apoio visual para iniciantes.",
    category: "matematica",
    ageMin: 5, ageMax: 7,
    difficulty: "easy",
    skill: "Adição com apoio visual",
    theme: "Objetos",
    pixabayQuery: "math addition pictures kids elementary",
    type: "INTERACTIVE",
  },
  {
    title: "Formas e Cores: Classifique os Objetos",
    description: "Separe os objetos por forma e cor. Desenvolve o raciocínio lógico e classificação.",
    category: "matematica",
    ageMin: 3, ageMax: 5,
    difficulty: "easy",
    skill: "Classificação e agrupamento",
    theme: "Formas e cores",
    pixabayQuery: "shapes colors sorting kids",
    type: "INTERACTIVE",
  },
  {
    title: "Padrões e Sequências: Complete o Padrão",
    description: "Observe o padrão de figuras e complete a sequência. Introduz raciocínio lógico e matemático.",
    category: "matematica",
    ageMin: 5, ageMax: 7,
    difficulty: "medium",
    skill: "Padrões e raciocínio lógico",
    theme: "Sequências",
    pixabayQuery: "pattern sequence math kids worksheet",
    type: "PDF",
  },

  // ─── COORDENAÇÃO MOTORA ────────────────────────────────────────────────────
  {
    title: "Recorte e Cole: Animais da Fazenda",
    description: "Recorte os nomes dos animais e cole embaixo do desenho correto. Desenvolve coordenação e leitura.",
    category: "coordenacao",
    ageMin: 4, ageMax: 6,
    difficulty: "easy",
    skill: "Coordenação olho-mão e associação",
    theme: "Fazenda",
    pixabayQuery: "farm animals cut paste worksheet kids",
    type: "PDF",
  },
  {
    title: "Liga os Pontos: Descubra o Animal",
    description: "Ligue os pontos em ordem numérica e descubra o animal escondido. Treina sequência e coordenação.",
    category: "coordenacao",
    ageMin: 4, ageMax: 6,
    difficulty: "medium",
    skill: "Coordenação motora e sequência numérica",
    theme: "Animais",
    pixabayQuery: "connect dots animals kids worksheet",
    type: "INTERACTIVE",
  },
  {
    title: "Colorir sem Sair da Linha: Frutas",
    description: "Pinte cada fruta com a cor certa sem ultrapassar as bordas. Essencial para coordenação fina.",
    category: "coordenacao",
    ageMin: 3, ageMax: 5,
    difficulty: "easy",
    skill: "Controle do lápis e coordenação fina",
    theme: "Frutas",
    pixabayQuery: "fruit coloring page kids",
    type: "PDF",
  },
  {
    title: "Dobrar e Criar: Origami Simples para Crianças",
    description: "Passo a passo para dobrar papel e criar animais simples. Desenvolve psicomotricidade fina.",
    category: "coordenacao",
    ageMin: 5, ageMax: 7,
    difficulty: "hard",
    skill: "Psicomotricidade e sequência lógica",
    theme: "Origami",
    pixabayQuery: "origami paper folding children craft",
    type: "PDF",
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`🌱 Iniciando seed com ${activities.length} atividades...`);

  let created = 0;
  let skipped = 0;

  for (const act of activities) {
    const existing = await db.activity.findFirst({ where: { title: act.title } });
    if (existing) {
      console.log(`  ⏭  Já existe: ${act.title}`);
      skipped++;
      continue;
    }

    console.log(`  🔍 Buscando imagem: "${act.pixabayQuery}"`);
    const thumbnailUrl = await fetchPixabayImage(act.pixabayQuery);

    await db.activity.create({
      data: {
        title: act.title,
        description: act.description,
        category: act.category,
        ageMin: act.ageMin,
        ageMax: act.ageMax,
        difficulty: act.difficulty,
        skill: act.skill,
        theme: act.theme,
        type: act.type as "PDF" | "INTERACTIVE",
        thumbnailUrl: thumbnailUrl ?? null,
        status: "PUBLISHED",
        isCommunity: false,
        downloadsCount: Math.floor(Math.random() * 200) + 10,
        ratingAvg: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        ratingCount: Math.floor(Math.random() * 40) + 5,
      },
    });

    console.log(`  ✅ Criada: ${act.title}${thumbnailUrl ? " (com imagem)" : " (sem imagem)"}`);
    created++;

    // Respect Pixabay rate limit (200 req/min)
    await new Promise((r) => setTimeout(r, 350));
  }

  console.log(`\n🎉 Seed concluído! ${created} criadas, ${skipped} já existiam.`);
}

main().catch(console.error).finally(() => db.$disconnect());
