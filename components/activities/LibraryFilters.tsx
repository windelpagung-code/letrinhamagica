"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

interface Props {
  categories: readonly { value: string; label: string; emoji: string }[];
  ageRanges: readonly { value: string; label: string }[];
  difficultyLevels: readonly { value: string; label: string }[];
  currentFilters: {
    categoria?: string;
    idade?: string;
    dificuldade?: string;
    busca?: string;
  };
}

export default function LibraryFilters({ categories, ageRanges, difficultyLevels, currentFilters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const hasFilters = Object.values(currentFilters).some(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
        <input
          type="text"
          defaultValue={currentFilters.busca ?? ""}
          placeholder="Traçado, números..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateFilter("busca", (e.target as HTMLInputElement).value || null);
            }
          }}
          className="w-full border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Categoria</label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                updateFilter(
                  "categoria",
                  currentFilters.categoria === cat.value ? null : cat.value
                )
              }
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all text-left ${
                currentFilters.categoria === cat.value
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Faixa etária</label>
        <div className="flex flex-wrap gap-2">
          {ageRanges.map((age) => (
            <button
              key={age.value}
              onClick={() =>
                updateFilter("idade", currentFilters.idade === age.value ? null : age.value)
              }
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                currentFilters.idade === age.value
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {age.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Dificuldade</label>
        <div className="flex flex-wrap gap-2">
          {difficultyLevels.map((d) => (
            <button
              key={d.value}
              onClick={() =>
                updateFilter(
                  "dificuldade",
                  currentFilters.dificuldade === d.value ? null : d.value
                )
              }
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                currentFilters.dificuldade === d.value
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={() => router.push(pathname)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600 text-sm font-medium transition-all"
        >
          <X className="w-4 h-4" />
          Limpar filtros
        </button>
      )}
    </div>
  );
}
