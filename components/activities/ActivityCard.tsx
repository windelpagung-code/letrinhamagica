import Link from "next/link";
import { Download, Star, Monitor } from "lucide-react";
import { CATEGORIES, formatAge } from "@/lib/utils";

interface Activity {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  ageMin: number;
  ageMax: number;
  difficulty: string;
  type: string;
  thumbnailUrl?: string | null;
  downloadsCount: number;
  ratingAvg: number;
}

interface Props {
  activity: Activity;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-red-100 text-red-700",
};

const difficultyLabels: Record<string, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

export default function ActivityCard({ activity }: Props) {
  const cat = CATEGORIES.find((c) => c.value === activity.category);

  return (
    <Link
      href={`/atividade/${activity.id}`}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all group"
    >
      {/* Thumbnail */}
      <div className="h-36 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 relative flex items-center justify-center overflow-hidden">
        {activity.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activity.thumbnailUrl}
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
            {cat?.emoji ?? "📄"}
          </span>
        )}
        {/* Type badge */}
        {activity.type === "INTERACTIVE" && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Monitor className="w-3 h-3" />
            Interativo
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="text-gray-900 font-semibold text-sm mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {activity.title}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            {formatAge(activity.ageMin, activity.ageMax)}
          </span>
          {cat && (
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
              {cat.label}
            </span>
          )}
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[activity.difficulty] ?? "bg-gray-100 text-gray-600"}`}
          >
            {difficultyLabels[activity.difficulty] ?? activity.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            {activity.downloadsCount.toLocaleString("pt-BR")}
          </div>
          {activity.ratingAvg > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {activity.ratingAvg.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
