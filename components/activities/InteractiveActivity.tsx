"use client";

import { useState, useCallback } from "react";
import { CheckCircle2, XCircle, RefreshCw, Trophy } from "lucide-react";

interface Activity {
  category: string;
  title: string;
  ageMin: number;
  ageMax: number;
}

interface Props {
  activity: Activity;
}

// ─── Letter matching game ──────────────────────────────────────────────────

const LETTER_GAMES = [
  { letter: "A", word: "Abelha", emoji: "🐝" },
  { letter: "B", word: "Bola", emoji: "⚽" },
  { letter: "C", word: "Casa", emoji: "🏠" },
  { letter: "D", word: "Dado", emoji: "🎲" },
  { letter: "E", word: "Estrela", emoji: "⭐" },
  { letter: "F", word: "Flor", emoji: "🌸" },
  { letter: "G", word: "Gato", emoji: "🐱" },
  { letter: "H", word: "Elefante", emoji: "🐘" },
];

// ─── Number matching game ──────────────────────────────────────────────────

const NUMBER_GAMES = [
  { number: 1, emoji: "🍎", items: ["🍎"] },
  { number: 2, emoji: "⭐", items: ["⭐", "⭐"] },
  { number: 3, emoji: "🐶", items: ["🐶", "🐶", "🐶"] },
  { number: 4, emoji: "🌸", items: ["🌸", "🌸", "🌸", "🌸"] },
  { number: 5, emoji: "🦋", items: ["🦋", "🦋", "🦋", "🦋", "🦋"] },
];

// ─── Color matching game ──────────────────────────────────────────────────

const COLOR_GAMES = [
  { color: "Vermelho", hex: "#EF4444", emoji: "🍎" },
  { color: "Azul", hex: "#3B82F6", emoji: "🫐" },
  { color: "Verde", hex: "#22C55E", emoji: "🌿" },
  { color: "Amarelo", hex: "#EAB308", emoji: "🌻" },
  { color: "Laranja", hex: "#F97316", emoji: "🍊" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ─── Letter Game ────────────────────────────────────────────────────────────

function LetterGame() {
  const [questions] = useState(() => shuffle(LETTER_GAMES).slice(0, 4));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const options = useCallback(() => {
    const wrong = shuffle(LETTER_GAMES.filter((l) => l.letter !== q.letter)).slice(0, 3);
    return shuffle([q, ...wrong]);
  }, [q])();

  function handleAnswer(letter: string) {
    if (selected) return;
    setSelected(letter);
    if (letter === q.letter) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1200);
  }

  function reset() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return <ResultScreen score={score} total={questions.length} onReset={reset} />;
  }

  return (
    <div className="space-y-6">
      <Progress current={current} total={questions.length} score={score} />
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm mb-2">Qual letra começa a palavra?</p>
        <div className="text-7xl mb-2">{q.emoji}</div>
        <p className="text-2xl font-black text-gray-800" style={{ fontFamily: "var(--font-jakarta)" }}>
          {q.word}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isCorrect = opt.letter === q.letter;
          const isSelected = selected === opt.letter;
          let cls = "border-2 rounded-2xl py-4 text-3xl font-black transition-all ";
          if (!selected) {
            cls += "border-gray-200 hover:border-purple-400 hover:bg-purple-50 cursor-pointer text-gray-800";
          } else if (isSelected && isCorrect) {
            cls += "border-emerald-400 bg-emerald-50 text-emerald-700";
          } else if (isSelected && !isCorrect) {
            cls += "border-red-400 bg-red-50 text-red-600";
          } else if (!isSelected && isCorrect) {
            cls += "border-emerald-400 bg-emerald-50 text-emerald-700";
          } else {
            cls += "border-gray-100 text-gray-300";
          }
          return (
            <button key={opt.letter} className={cls} onClick={() => handleAnswer(opt.letter)}>
              {opt.letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Number Game ────────────────────────────────────────────────────────────

function NumberGame() {
  const [questions] = useState(() => shuffle(NUMBER_GAMES).slice(0, 4));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const options = useCallback(() => {
    const wrong = shuffle(NUMBER_GAMES.filter((n) => n.number !== q.number)).slice(0, 3);
    return shuffle([q, ...wrong]);
  }, [q])();

  function handleAnswer(num: number) {
    if (selected !== null) return;
    setSelected(num);
    if (num === q.number) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1200);
  }

  function reset() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return <ResultScreen score={score} total={questions.length} onReset={reset} />;
  }

  return (
    <div className="space-y-6">
      <Progress current={current} total={questions.length} score={score} />
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm mb-3">Quantos {q.emoji} você vê?</p>
        <div className="flex flex-wrap justify-center gap-2 text-4xl min-h-16 items-center">
          {q.items.map((item, i) => (
            <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isCorrect = opt.number === q.number;
          const isSelected = selected === opt.number;
          let cls = "border-2 rounded-2xl py-4 text-3xl font-black transition-all ";
          if (selected === null) {
            cls += "border-gray-200 hover:border-purple-400 hover:bg-purple-50 cursor-pointer text-gray-800";
          } else if (isSelected && isCorrect) {
            cls += "border-emerald-400 bg-emerald-50 text-emerald-700";
          } else if (isSelected && !isCorrect) {
            cls += "border-red-400 bg-red-50 text-red-600";
          } else if (!isSelected && isCorrect) {
            cls += "border-emerald-400 bg-emerald-50 text-emerald-700";
          } else {
            cls += "border-gray-100 text-gray-300";
          }
          return (
            <button key={opt.number} className={cls} onClick={() => handleAnswer(opt.number)}>
              {opt.number}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Drawing Tracing Game ───────────────────────────────────────────────────

function TracingGame() {
  const shapes = [
    { name: "Círculo", path: "M50,10 A40,40 0 1,1 49.9,10", emoji: "⭕" },
    { name: "Quadrado", emoji: "⬜" },
    { name: "Triângulo", emoji: "🔺" },
    { name: "Estrela", emoji: "⭐" },
  ];
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState<boolean[]>(Array(shapes.length).fill(false));

  function markDone() {
    const newDone = [...done];
    newDone[current] = true;
    setDone(newDone);
    if (current + 1 < shapes.length) setCurrent(current + 1);
  }

  const allDone = done.every(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Forma {current + 1} de {shapes.length}</span>
        <span>{done.filter(Boolean).length} concluídas ✅</span>
      </div>

      {allDone ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-xl font-black text-gray-800">Parabéns!</p>
          <p className="text-gray-500 text-sm mt-1">Você traçou todas as formas!</p>
          <button
            onClick={() => { setCurrent(0); setDone(Array(shapes.length).fill(false)); }}
            className="mt-4 flex items-center gap-2 mx-auto py-2 px-4 rounded-xl bg-purple-100 text-purple-700 font-semibold text-sm hover:bg-purple-200 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Recomeçar
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            Trace o contorno de um <strong>{shapes[current].name}</strong> no papel e clique em &quot;Concluído&quot;
          </p>
          <div className="bg-gray-50 rounded-2xl p-10 flex items-center justify-center text-8xl border-2 border-dashed border-gray-200 mb-4">
            {shapes[current].emoji}
          </div>
          <div className="flex gap-3 justify-center">
            {shapes.map((s, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border-2 transition-all ${
                  done[i] ? "border-emerald-400 bg-emerald-50" : i === current ? "border-purple-400 bg-purple-50" : "border-gray-200"
                }`}
              >
                {done[i] ? "✅" : s.emoji}
              </div>
            ))}
          </div>
          <button
            onClick={markDone}
            className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-6 py-3 rounded-xl text-sm hover:from-purple-500 hover:to-pink-400 transition-all"
          >
            ✅ Concluído!
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

function Progress({ current, total, score }: { current: number; total: number; score: number }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i < current ? "w-8 bg-purple-400" : i === current ? "w-8 bg-purple-600" : "w-8 bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-1 text-sm font-semibold text-amber-600">
        <Trophy className="w-4 h-4" />
        {score}
      </div>
    </div>
  );
}

function ResultScreen({ score, total, onReset }: { score: number; total: number; onReset: () => void }) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct === 100 ? "🏆" : pct >= 75 ? "⭐" : pct >= 50 ? "👍" : "💪";
  const msg = pct === 100 ? "Perfeito!" : pct >= 75 ? "Muito bem!" : pct >= 50 ? "Bom trabalho!" : "Continue tentando!";

  return (
    <div className="text-center py-8 space-y-4">
      <div className="text-6xl">{emoji}</div>
      <div>
        <p className="text-2xl font-black text-gray-800">{msg}</p>
        <p className="text-gray-500 text-sm mt-1">
          Você acertou <span className="text-purple-600 font-bold">{score} de {total}</span> perguntas
        </p>
      </div>
      <div className="flex justify-center gap-6 text-center">
        <div>
          <div className="text-2xl font-black text-emerald-600">{score}</div>
          <div className="text-xs text-gray-400 flex items-center gap-1 justify-center">
            <CheckCircle2 className="w-3 h-3" /> Certas
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-red-400">{total - score}</div>
          <div className="text-xs text-gray-400 flex items-center gap-1 justify-center">
            <XCircle className="w-3 h-3" /> Erradas
          </div>
        </div>
        <div>
          <div className="text-2xl font-black text-purple-600">{pct}%</div>
          <div className="text-xs text-gray-400">Acerto</div>
        </div>
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-2 mx-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm hover:from-purple-500 hover:to-pink-400 transition-all"
      >
        <RefreshCw className="w-4 h-4" /> Jogar Novamente
      </button>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function InteractiveActivity({ activity }: Props) {
  const categoryGames: Record<string, React.ReactNode> = {
    letras: <LetterGame />,
    leitura: <LetterGame />,
    numeros: <NumberGame />,
    matematica: <NumberGame />,
    tracado: <TracingGame />,
    coordenacao: <TracingGame />,
  };

  const game = categoryGames[activity.category] ?? <LetterGame />;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
      {game}
    </div>
  );
}
