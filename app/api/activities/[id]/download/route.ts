import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { FREE_LIMITS } from "@/lib/utils";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const userId = session.user.id!;
  const isPremium = session.user.plan === "PREMIUM";

  // Check monthly download limit for free users
  if (!isPremium) {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const downloadsThisMonth = await db.download.count({
      where: { userId, downloadedAt: { gte: startOfMonth } },
    });

    if (downloadsThisMonth >= FREE_LIMITS.downloadsPerMonth) {
      return NextResponse.json(
        { error: "Limite de downloads atingido. Faça upgrade para Premium!", limitReached: true },
        { status: 403 }
      );
    }
  }

  const activity = await db.activity.findUnique({ where: { id } });
  if (!activity) {
    return NextResponse.json({ error: "Atividade não encontrada" }, { status: 404 });
  }

  // Register download
  await Promise.all([
    db.download.create({ data: { userId, activityId: id } }),
    db.activity.update({ where: { id }, data: { downloadsCount: { increment: 1 } } }),
  ]);

  return NextResponse.json({ success: true, fileUrl: activity.id });
}
