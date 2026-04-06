"use client";

import { useRef } from "react";
import { Printer, Download } from "lucide-react";
import { CATEGORIES } from "@/lib/utils";

interface Elemento {
  tipo: string;
  descricao: string;
  conteudo: string;
}

interface ActivityResult {
  titulo: string;
  descricao: string;
  objetivo: string;
  instrucoes: string;
  materiais: string[];
  duracao: string;
  habilidades: string[];
  elementos: Elemento[];
  variacoes: string[];
}

interface Props {
  activity: ActivityResult;
  categoria: string;
  idade: number;
  dificuldade: string;
}

// ─── Exercise renderers ───────────────────────────────────────────────────────

function TracadoExercise({ el }: { el: Elemento }) {
  const letters = el.conteudo.replace(/[^A-Za-záéíóúãõâêîôûàèìòùÁÉÍÓÚÃÕÂÊÎÔÛ]/g, "").split("").slice(0, 6);
  if (letters.length === 0) letters.push("A", "E", "I", "O", "U");
  return (
    <div>
      <p className="text-xs text-gray-500 mb-3">{el.descricao}</p>
      <div className="flex gap-4 flex-wrap">
        {letters.map((l, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-16 h-16 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300"
              style={{ fontSize: 40, color: "#d1d5db", fontFamily: "Arial Black, sans-serif" }}
            >
              {l.toUpperCase()}
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="w-10 h-8 border-b-2 border-dashed border-gray-300" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContagemExercise({ el }: { el: Elemento }) {
  const MAX = 5;
  const items = [
    { emoji: "⭐", count: 3 },
    { emoji: "🍎", count: 5 },
    { emoji: "🐶", count: 2 },
    { emoji: "🌸", count: 4 },
  ].slice(0, 3);

  return (
    <div>
      <p className="text-xs text-gray-500 mb-3">{el.descricao}</p>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div key={i} className="border-2 border-gray-200 rounded-xl p-3 text-center">
            <div className="flex flex-wrap gap-1 justify-center mb-2">
              {Array.from({ length: item.count }).map((_, j) => (
                <span key={j} style={{ fontSize: 20 }}>{item.emoji}</span>
              ))}
            </div>
            <div className="border-b-2 border-gray-400 w-12 mx-auto mt-3 h-7 flex items-end justify-center">
              <span className="text-xs text-gray-300">?</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssociacaoExercise({ el }: { el: Elemento }) {
  const pairs = [
    { left: "A", right: "🍎" },
    { left: "B", right: "🐝" },
    { left: "C", right: "🐱" },
    { left: "D", right: "🐶" },
  ].slice(0, 4);

  const shuffledRight = [...pairs].sort(() => Math.random() - 0.5);

  return (
    <div>
      <p className="text-xs text-gray-500 mb-3">{el.descricao}</p>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3">
          {pairs.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg border-2 border-purple-300 flex items-center justify-center font-black text-lg text-purple-700">
                {p.left}
              </div>
              <div className="flex-1 border-b-2 border-dashed border-gray-300 h-5" />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {shuffledRight.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 border-b-2 border-dashed border-gray-300 h-5" />
              <div className="w-10 h-10 rounded-lg border-2 border-pink-300 flex items-center justify-center text-xl">
                {p.right}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorirExercise({ el }: { el: Elemento }) {
  const shapes = ["⬡", "◯", "△", "□"];
  const colors = [
    { name: "Vermelho", hex: "#ef4444" },
    { name: "Azul", hex: "#3b82f6" },
    { name: "Verde", hex: "#22c55e" },
    { name: "Amarelo", hex: "#eab308" },
  ];
  return (
    <div>
      <p className="text-xs text-gray-500 mb-3">{el.descricao}</p>
      <div className="flex gap-6 flex-wrap">
        {shapes.slice(0, 4).map((shape, i) => (
          <div key={i} className="text-center">
            <div
              className="w-16 h-16 rounded-xl border-2 border-dashed flex items-center justify-center mb-1"
              style={{ borderColor: colors[i].hex, fontSize: 36, color: "#e5e7eb" }}
            >
              {shape}
            </div>
            <div
              className="text-xs font-bold"
              style={{ color: colors[i].hex }}
            >
              {colors[i].name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LigarExercise({ el }: { el: Elemento }) {
  const pairs = [
    { num: "1", img: "🐱" },
    { num: "2", img: "🐶" },
    { num: "3", img: "🐰" },
    { num: "4", img: "🐻" },
  ];
  return (
    <div>
      <p className="text-xs text-gray-500 mb-3">{el.descricao}</p>
      <div className="flex justify-between items-center px-4">
        <div className="space-y-4">
          {pairs.map((p, i) => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-purple-400 flex items-center justify-center font-black text-purple-700">
              {p.num}
            </div>
          ))}
        </div>
        <div className="flex-1 mx-4 space-y-4">
          {pairs.map((_, i) => (
            <div key={i} className="border-b-2 border-dashed border-gray-200 h-5" />
          ))}
        </div>
        <div className="space-y-4">
          {[...pairs].sort(() => Math.random() - 0.5).map((p, i) => (
            <div key={i} className="w-10 h-10 rounded-xl border-2 border-pink-300 flex items-center justify-center text-xl">
              {p.img}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TextoExercise({ el }: { el: Elemento }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-2">{el.descricao}</p>
      {el.conteudo && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 mb-3 text-sm text-purple-800 font-medium">
          {el.conteudo}
        </div>
      )}
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-b-2 border-gray-300 h-8" />
        ))}
      </div>
    </div>
  );
}

function renderElemento(el: Elemento, i: number) {
  const tipo = el.tipo.toLowerCase();
  let content: React.ReactNode;

  if (tipo === "tracado") content = <TracadoExercise el={el} />;
  else if (tipo === "contagem") content = <ContagemExercise el={el} />;
  else if (tipo === "associacao") content = <AssociacaoExercise el={el} />;
  else if (tipo === "colorir") content = <ColorirExercise el={el} />;
  else if (tipo === "ligar") content = <LigarExercise el={el} />;
  else content = <TextoExercise el={el} />;

  return (
    <div key={i} className="mb-6 pb-6 border-b-2 border-dashed border-gray-200 last:border-0">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-purple-600 text-white text-sm font-black flex items-center justify-center">
          {i + 1}
        </div>
        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
          {tipo === "tracado" ? "Tracing" :
           tipo === "contagem" ? "Contagem" :
           tipo === "associacao" ? "Associe" :
           tipo === "colorir" ? "Colorir" :
           tipo === "ligar" ? "Ligue" : "Exercício"}
        </span>
      </div>
      {content}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WorksheetPreview({ activity, categoria, idade, dificuldade }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const cat = CATEGORIES.find((c) => c.value === categoria);

  const diffLabel: Record<string, string> = { easy: "Fácil", medium: "Médio", hard: "Difícil" };

  function handlePrint() {
    window.print();
  }

  // Parse instrucoes into numbered steps
  const steps = activity.instrucoes
    .split(/\d+\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Salvar PDF
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 text-sm font-medium transition-all"
        >
          <Download className="w-4 h-4" />
          PDF
        </button>
      </div>

      {/* Worksheet preview (also the print target) */}
      <div
        id="worksheet-print"
        ref={printRef}
        className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg"
        style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}
      >
        {/* Header */}
        <div
          className="p-6 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{cat?.emoji ?? "📄"}</span>
                <span className="text-white/80 text-sm font-bold uppercase tracking-wider">
                  {cat?.label ?? "Atividade"} • {idade} anos • {diffLabel[dificuldade] ?? dificuldade}
                </span>
              </div>
              <h1 className="text-2xl font-black leading-tight mb-1">
                {activity.titulo}
              </h1>
              <p className="text-white/80 text-sm">{activity.objetivo}</p>
            </div>
            <div className="shrink-0 text-right">
              <div className="bg-white/20 rounded-xl px-3 py-1.5 text-xs font-bold mb-1">
                ⏱ {activity.duracao}
              </div>
            </div>
          </div>

          {/* Name/date line */}
          <div className="relative z-10 mt-4 flex gap-6">
            <div className="flex items-end gap-2 flex-1">
              <span className="text-white/70 text-xs whitespace-nowrap">Nome:</span>
              <div className="flex-1 border-b border-white/50 h-5" />
            </div>
            <div className="flex items-end gap-2 w-32">
              <span className="text-white/70 text-xs whitespace-nowrap">Data:</span>
              <div className="flex-1 border-b border-white/50 h-5" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
            <p className="text-xs font-black text-amber-700 uppercase tracking-wider mb-2">📋 O que fazer:</p>
            <ol className="space-y-1">
              {steps.length > 0 ? steps.map((s, i) => (
                <li key={i} className="text-sm text-amber-800 flex gap-2">
                  <span className="font-black text-amber-600 shrink-0">{i + 1}.</span>
                  {s}
                </li>
              )) : (
                <li className="text-sm text-amber-800">{activity.instrucoes}</li>
              )}
            </ol>
          </div>

          {/* Materials */}
          {activity.materiais.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider self-center">🎒 Materiais:</span>
              {activity.materiais.map((m, i) => (
                <span key={i} className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* Exercises */}
          <div className="border-t-4 border-double border-gray-200 pt-5">
            <h2 className="text-lg font-black text-gray-800 mb-5 text-center">
              ✏️ Hora de aprender!
            </h2>
            {activity.elementos && activity.elementos.length > 0
              ? activity.elementos.map((el, i) => renderElemento(el, i))
              : (
                // Fallback: blank lines for writing
                <div className="space-y-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i}>
                      <div className="text-xs text-gray-400 mb-1">Exercício {i + 1}</div>
                      <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <div key={j} className="border-b-2 border-gray-300 h-8" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>

          {/* Evaluation */}
          <div className="border-t-2 border-dashed border-gray-200 pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">⭐ Avaliação do professor:</p>
              <div className="flex gap-2">
                {["😔", "😊", "😄", "🌟"].map((e, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-lg">
                    {e}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-300 font-bold">LetrinhaMágica</div>
              <div className="text-xs text-gray-200">letrinhamagica.com.br</div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Clique em &quot;Imprimir / Salvar PDF&quot; para obter a folha pronta para impressão em A4.
      </p>
    </div>
  );
}
