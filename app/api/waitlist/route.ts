import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(2, "Nome muito curto").optional(),
  role: z.enum(["parent", "teacher"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const existing = await db.waitlist.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Este email já está na lista de espera!" },
        { status: 200 }
      );
    }

    await db.waitlist.create({ data });

    return NextResponse.json(
      { message: "Você entrou na lista de espera! 🎉" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    console.error(JSON.stringify({ level: "error", route: "/api/waitlist", error: String(error) }));
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  const count = await db.waitlist.count();
  return NextResponse.json({ count });
}
