import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";
import { z } from "zod";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const schema = z.object({
  categoria: z.string(),
  idade: z.number().min(3).max(7),
  tema: z.string().optional(),
  dificuldade: z.enum(["easy", "medium", "hard"]).default("easy"),
  descricao: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), { status: 401 });
  }

  const body = await req.json();
  const data = schema.parse(body);

  const categoriaLabel: Record<string, string> = {
    tracado: "Traçado de Linhas e Formas",
    numeros: "Números (escrita e contagem)",
    letras: "Letras e Sílabas",
    leitura: "Leitura",
    matematica: "Matemática Básica",
    coordenacao: "Coordenação Motora",
  };

  const dificuldadeLabel: Record<string, string> = {
    easy: "fácil",
    medium: "médio",
    hard: "difícil",
  };

  const prompt = `Você é um pedagogo especialista em educação infantil brasileira, alinhado à BNCC.

Crie uma atividade educativa completa com as seguintes especificações:
- Categoria: ${categoriaLabel[data.categoria] ?? data.categoria}
- Faixa etária: ${data.idade} anos
- Dificuldade: ${dificuldadeLabel[data.dificuldade]}
${data.tema ? `- Tema: ${data.tema}` : ""}
${data.descricao ? `- Descrição adicional: ${data.descricao}` : ""}

Responda com um JSON estruturado assim:
{
  "titulo": "Nome criativo da atividade",
  "descricao": "Descrição pedagógica curta (2-3 frases)",
  "objetivo": "Objetivo de aprendizagem alinhado à BNCC",
  "instrucoes": "Instruções para a criança realizar a atividade (passo a passo)",
  "instrucoesProfessor": "Dicas para o professor/pai ao aplicar a atividade",
  "materiais": ["material 1", "material 2"],
  "duracao": "X minutos",
  "habilidades": ["habilidade BNCC 1", "habilidade BNCC 2"],
  "elementos": [
    {
      "tipo": "texto|tracado|contagem|associacao|colorir|ligar",
      "descricao": "Descrição do elemento visual da atividade",
      "conteudo": "Conteúdo específico (ex: letra A, número 3, etc)"
    }
  ],
  "variacoes": ["Variação mais fácil", "Variação mais difícil"]
}

Responda APENAS com o JSON, sem markdown, sem explicações extras.`;

  const result = streamText({
    model: openai("gpt-4o-mini"),
    prompt,
    temperature: 0.7,
    maxOutputTokens: 1500,
  });

  return result.toTextStreamResponse();
}
