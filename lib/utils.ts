import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAge(ageMin: number, ageMax: number) {
  if (ageMin === ageMax) return `${ageMin} anos`;
  return `${ageMin}–${ageMax} anos`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const CATEGORIES = [
  { value: "tracado", label: "Traçado de Linhas e Formas", emoji: "✏️" },
  { value: "numeros", label: "Números", emoji: "🔢" },
  { value: "letras", label: "Letras e Sílabas", emoji: "🔤" },
  { value: "leitura", label: "Leitura", emoji: "📖" },
  { value: "matematica", label: "Matemática Básica", emoji: "➕" },
  { value: "coordenacao", label: "Coordenação Motora", emoji: "✂️" },
] as const;

export const AGE_RANGES = [
  { value: "3", label: "3 anos" },
  { value: "4", label: "4 anos" },
  { value: "5", label: "5 anos" },
  { value: "6", label: "6 anos" },
  { value: "7", label: "7 anos" },
] as const;

export const DIFFICULTY_LEVELS = [
  { value: "easy", label: "Fácil" },
  { value: "medium", label: "Médio" },
  { value: "hard", label: "Difícil" },
] as const;

export const FREE_LIMITS = {
  downloadsPerMonth: 5,
  interactivePerMonth: 3,
  aiGenerationsPerMonth: 3,
  templates: 5,
} as const;
