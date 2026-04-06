import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  titulo: z.string(),
  descricao: z.string(),
  objetivo: z.string(),
  categoria: z.string(),
  dificuldade: z.enum(["easy", "medium", "hard"]),
  idade: z.number(),
  tema: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  habilidades: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const data = schema.parse(body);

  const activity = await db.activity.create({
    data: {
      title: data.titulo,
      description: data.descricao,
      category: data.categoria,
      difficulty: data.dificuldade,
      ageMin: data.idade,
      ageMax: data.idade + 1,
      skill: data.habilidades[0] ?? "Desenvolvimento cognitivo",
      theme: data.tema ?? null,
      thumbnailUrl: data.thumbnailUrl ?? null,
      type: "INTERACTIVE",
      isCommunity: false,
      status: "PUBLISHED",
      creatorId: session.user.id!,
    },
  });

  return NextResponse.json({ id: activity.id });
}
