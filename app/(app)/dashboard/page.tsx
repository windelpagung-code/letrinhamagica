import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Download, Heart, Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { FREE_LIMITS, CATEGORIES } from "@/lib/utils";

async function getDashboardData(userId: string) {

  const [downloadsThisMonth, favorites, recentActivities] = await Promise.all([
    db.download.count({
      where: {
        userId,
        downloadedAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
      },
    }),
    db.favorite.count({ where: { userId } }),
    db.activity.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        title: true,
        category: true,
        ageMin: true,
        ageMax: true,
        difficulty: true,
        thumbnailUrl: true,
        downloadsCount: true,
      },
    }),
  ]);

  return { downloadsThisMonth, favorites, recentActivities };
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { downloadsThisMonth, favorites, recentActivities } = await getDashboardData(
    session.user.id!
  );

  const isPremium = session.user.plan === "PREMIUM";
  const downloadProgress = isPremium
    ? 100
    : Math.min((downloadsThisMonth / FREE_LIMITS.downloadsPerMonth) * 100, 100);
  const remainingDownloads = isPremium
    ? "∞"
    : Math.max(FREE_LIMITS.downloadsPerMonth - downloadsThisMonth, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900" style={{ fontFamily: "var(--font-jakarta)" }}>
            Olá, {session.user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">{isPremium ? "Plano Premium ✨" : "Plano Grátis"}</p>
        </div>
        {!isPremium && (
          <Link
            href="/assinatura"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg hover:from-purple-500 hover:to-pink-400 transition-all"
          >
            Upgrade Premium ✨
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          {
            icon: Download,
            label: "Downloads este mês",
            value: downloadsThisMonth,
            sub: isPremium ? "Ilimitado" : `${remainingDownloads} restantes`,
            color: "from-blue-500 to-cyan-500",
          },
          {
            icon: Heart,
            label: "Favoritos",
            value: favorites,
            sub: "atividades salvas",
            color: "from-pink-500 to-rose-500",
          },
          {
            icon: BookOpen,
            label: "Biblioteca",
            value: "200+",
            sub: "atividades disponíveis",
            color: "from-emerald-500 to-teal-500",
          },
          {
            icon: Sparkles,
            label: "Gerações IA",
            value: isPremium ? "∞" : FREE_LIMITS.aiGenerationsPerMonth,
            sub: isPremium ? "Ilimitado" : "por mês",
            color: "from-purple-500 to-violet-500",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs">{stat.sub}</div>
              <div className="text-gray-600 text-sm font-medium mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Download limit bar (free users) */}
      {!isPremium && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-amber-800 font-semibold text-sm">
                Downloads este mês: {downloadsThisMonth}/{FREE_LIMITS.downloadsPerMonth}
              </span>
            </div>
            <Link href="/assinatura" className="text-purple-600 text-xs font-bold hover:underline">
              Fazer upgrade →
            </Link>
          </div>
          <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-jakarta)" }}>
            Categorias
          </h2>
          <Link href="/biblioteca" className="text-purple-600 text-sm font-medium hover:underline flex items-center gap-1">
            Ver todas <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/biblioteca?categoria=${cat.value}`}
              className="bg-white border border-gray-100 rounded-2xl p-4 text-center hover:border-purple-200 hover:shadow-md transition-all group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{cat.emoji}</div>
              <div className="text-xs text-gray-600 font-medium leading-tight">{cat.label}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activities */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-jakarta)" }}>
            Atividades recentes
          </h2>
          <Link href="/biblioteca" className="text-purple-600 text-sm font-medium hover:underline flex items-center gap-1">
            Ver biblioteca <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentActivities.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-gray-500 font-medium">Nenhuma atividade ainda</p>
            <p className="text-gray-400 text-sm mt-1">As atividades publicadas aparecerão aqui.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentActivities.map((activity) => {
              const cat = CATEGORIES.find((c) => c.value === activity.category);
              return (
                <Link
                  key={activity.id}
                  href={`/atividade/${activity.id}`}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-purple-200 transition-all group"
                >
                  <div className="h-32 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <span className="text-5xl">{cat?.emoji ?? "📄"}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 font-semibold text-sm mb-1 line-clamp-2">{activity.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                        {activity.ageMin}–{activity.ageMax} anos
                      </span>
                      <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                        {cat?.label}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">{activity.downloadsCount} downloads</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

