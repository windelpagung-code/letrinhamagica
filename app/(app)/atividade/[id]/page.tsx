"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Download, Heart, Star, Clock, Target, BookOpen, ArrowLeft,
  Users, Monitor, Share2, Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import { CATEGORIES, formatAge } from "@/lib/utils";
import InteractiveActivity from "@/components/activities/InteractiveActivity";

interface Activity {
  id: string;
  title: string;
  description: string | null;
  category: string;
  ageMin: number;
  ageMax: number;
  difficulty: string;
  type: string;
  thumbnailUrl: string | null;
  downloadsCount: number;
  ratingAvg: number;
  ratingCount: number;
  skill: string;
  theme: string | null;
  createdAt: string;
  creator?: { name: string | null; image: string | null } | null;
  reviews?: { rating: number; comment: string | null; user: { name: string | null } }[];
  isFavorited?: boolean;
}

const difficultyLabels: Record<string, string> = {
  easy: "Fácil", medium: "Médio", hard: "Difícil",
};

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-red-100 text-red-700",
};

export default function AtividadePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [favoriting, setFavoriting] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);

  useEffect(() => {
    fetch(`/api/activities/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          toast.error("Atividade não encontrada");
          router.push("/biblioteca");
          return;
        }
        setActivity(data);
        setFavorited(data.isFavorited ?? false);
      })
      .catch(() => toast.error("Erro ao carregar atividade"))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/activities/${id}/download`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        if (data.limitReached) {
          toast.error("Limite de downloads atingido. Faça upgrade para Premium!");
        } else {
          toast.error(data.error ?? "Erro ao baixar");
        }
        return;
      }
      toast.success("Download registrado! ✅");
    } finally {
      setDownloading(false);
    }
  }

  async function handleFavorite() {
    setFavoriting(true);
    try {
      const res = await fetch(`/api/activities/${id}/favorite`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setFavorited(data.favorited);
        toast.success(data.favorited ? "Adicionado aos favoritos ❤️" : "Removido dos favoritos");
      }
    } finally {
      setFavoriting(false);
    }
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copiado!");
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (!activity) return null;

  const cat = CATEGORIES.find((c) => c.value === activity.category);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
              {activity.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activity.thumbnailUrl}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-8xl">{cat?.emoji ?? "📄"}</span>
              )}
              {activity.type === "INTERACTIVE" && (
                <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Monitor className="w-3 h-3" />
                  Interativo
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  {formatAge(activity.ageMin, activity.ageMax)}
                </span>
                {cat && (
                  <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                    {cat.emoji} {cat.label}
                  </span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[activity.difficulty] ?? "bg-gray-100 text-gray-600"}`}>
                  {difficultyLabels[activity.difficulty] ?? activity.difficulty}
                </span>
              </div>
              <h1
                className="text-2xl font-black text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {activity.title}
              </h1>
              {activity.description && (
                <p className="text-gray-500 text-sm leading-relaxed">{activity.description}</p>
              )}
            </div>
          </div>

          {/* Interactive mode */}
          {activity.type === "INTERACTIVE" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-purple-500" />
                  Modo Interativo
                </h2>
                <button
                  onClick={() => setShowInteractive(!showInteractive)}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
                >
                  {showInteractive ? "Fechar" : "Iniciar Atividade"}
                </button>
              </div>
              {showInteractive && (
                <InteractiveActivity activity={activity} />
              )}
            </div>
          )}

          {/* Reviews */}
          {activity.reviews && activity.reviews.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Avaliações
              </h2>
              <div className="space-y-4">
                {activity.reviews.map((r, i) => (
                  <div key={i} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star
                            key={si}
                            className={`w-3 h-3 ${si < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{r.user.name ?? "Usuário"}</span>
                    </div>
                    {r.comment && <p className="text-sm text-gray-600">{r.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm hover:from-purple-500 hover:to-pink-400 transition-all disabled:opacity-60"
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Baixar Atividade
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleFavorite}
                disabled={favoriting}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                  favorited
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? "fill-red-500 text-red-500" : ""}`} />
                {favorited ? "Favoritado" : "Favoritar"}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-purple-200 hover:text-purple-600 text-sm font-medium transition-all"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Informações</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <Download className="w-4 h-4 text-gray-400" />
                <span>{activity.downloadsCount.toLocaleString("pt-BR")} downloads</span>
              </div>
              {activity.ratingAvg > 0 && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>{activity.ratingAvg.toFixed(1)} ({activity.ratingCount} avaliações)</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-600">
                <Target className="w-4 h-4 text-gray-400" />
                <span>{formatAge(activity.ageMin, activity.ageMax)}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span>{activity.skill}</span>
              </div>
              {activity.creator && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>por {activity.creator.name ?? "Anônimo"}</span>
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          {cat && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-5 text-center">
              <div className="text-4xl mb-2">{cat.emoji}</div>
              <p className="text-purple-700 font-semibold text-sm">{cat.label}</p>
              {activity.theme && (
                <p className="text-purple-400 text-xs mt-1">Tema: {activity.theme}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
