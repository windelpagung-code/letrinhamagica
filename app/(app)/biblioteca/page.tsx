import { Suspense } from "react";
import { CATEGORIES, AGE_RANGES, DIFFICULTY_LEVELS } from "@/lib/utils";
import LibraryFilters from "@/components/activities/LibraryFilters";
import ActivitiesList, { ActivitiesListSkeleton } from "@/components/activities/ActivitiesList";

interface PageProps {
  searchParams: Promise<{
    categoria?: string;
    idade?: string;
    dificuldade?: string;
    busca?: string;
  }>;
}

export default async function BibliotecaPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1
          className="text-3xl font-black text-gray-900 mb-1"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Biblioteca de Atividades
        </h1>
        <p className="text-gray-400 text-sm">
          Atividades educativas para crianças de 3 a 7 anos
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <Suspense fallback={<div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />}>
            <LibraryFilters
              categories={CATEGORIES}
              ageRanges={AGE_RANGES}
              difficultyLevels={DIFFICULTY_LEVELS}
              currentFilters={params}
            />
          </Suspense>
        </aside>
        <div className="flex-1">
          <Suspense fallback={<ActivitiesListSkeleton />}>
            <ActivitiesList
              categoria={params.categoria}
              idade={params.idade}
              dificuldade={params.dificuldade}
              busca={params.busca}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
