import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const userId = session.user.id!;

  const activity = await db.activity.findUnique({
    where: { id },
    include: {
      creator: { select: { name: true, image: true } },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { user: { select: { name: true } } },
      },
    },
  });

  if (!activity || activity.status !== "PUBLISHED") {
    return NextResponse.json({ error: "Atividade não encontrada" }, { status: 404 });
  }

  const favorite = await db.favorite.findUnique({
    where: { userId_activityId: { userId, activityId: id } },
  });

  return NextResponse.json({ ...activity, isFavorited: !!favorite });
}
