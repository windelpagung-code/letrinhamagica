"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { icon: "🎯", label: "Analisando o objetivo pedagógico...", color: "from-purple-500 to-indigo-500" },
  { icon: "🧠", label: "Criando exercícios personalizados...", color: "from-indigo-500 to-blue-500" },
  { icon: "📚", label: "Alinhando com a BNCC...", color: "from-blue-500 to-cyan-500" },
  { icon: "✏️", label: "Montando as atividades práticas...", color: "from-cyan-500 to-teal-500" },
  { icon: "🎨", label: "Preparando a folha de exercícios...", color: "from-teal-500 to-emerald-500" },
  { icon: "✨", label: "Finalizando com carinho...", color: "from-emerald-500 to-purple-500" },
];

export default function GeneratorLoading() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const current = STEPS[step];

  return (
    <div className="bg-white rounded-2xl border border-purple-100 p-8 flex flex-col items-center justify-center min-h-80 text-center">
      {/* Animated icon */}
      <div
        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center mb-6 shadow-lg transition-all duration-700`}
        style={{ fontSize: 40 }}
      >
        {current.icon}
      </div>

      {/* Spinner ring */}
      <div className="relative w-12 h-12 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
        <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
      </div>

      {/* Step label */}
      <p
        key={step}
        className="text-gray-700 font-semibold text-base mb-2 animate-step-in"
      >
        {current.label}
      </p>

      <p className="text-gray-400 text-sm max-w-xs">
        Nossa IA pedagógica está criando uma atividade exclusiva baseada na BNCC para a faixa etária selecionada.
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-500 ${
              i === step
                ? "w-6 h-2 bg-purple-600"
                : i < step
                ? "w-2 h-2 bg-purple-300"
                : "w-2 h-2 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
