import { db } from "@/lib/db";
import { CATEGORIES } from "@/lib/utils";
import ActivityCard from "./ActivityCard";

interface Props {
  categoria?: string;
  idade?: string;
  dificuldade?: string;
  busca?: string;
}

async function fetchActivities(filters: Props) {

  const where: Record<string, unknown> = { status: "PUBLISHED" };

  if (filters.categoria) where.category = filters.categoria;
  if (filters.dificuldade) where.difficulty = filters.dificuldade;
  if (filters.busca) {
    where.OR = [
      { title: { contains: filters.busca, mode: "insensitive" } },
      { description: { contains: filters.busca, mode: "insensitive" } },
    ];
  }
  if (filters.idade) {
    const age = parseInt(filters.idade);
    where.ageMin = { lte: age };
    where.ageMax = { gte: age };
  }

  return db.activity.findMany({
    where,
    orderBy: { downloadsCount: "desc" },
    take: 48,
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      ageMin: true,
      ageMax: true,
      difficulty: true,
      type: true,
      thumbnailUrl: true,
      downloadsCount: true,
      ratingAvg: true,
    },
  });
}

export default async function ActivitiesList(props: Props) {
  const activities = await fetchActivities(props);

  if (activities.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-gray-700 font-bold text-lg mb-2">Nenhuma atividade encontrada</h3>
        <p className="text-gray-400">Tente outros filtros ou termos de busca.</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-500 text-sm mb-4">{activities.length} atividades encontradas</p>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </>
  );
}

export function ActivitiesListSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-36 bg-gray-100 animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
