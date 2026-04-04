import { CATEGORIES } from "@/lib/utils";

const categoryDetails = [
  { value: "tracado", ages: "3–5 anos", skill: "Coordenação motora fina" },
  { value: "numeros", ages: "3–7 anos", skill: "Habilidade numérica" },
  { value: "letras", ages: "4–7 anos", skill: "Alfabetização" },
  { value: "leitura", ages: "5–7 anos", skill: "Leitura inicial" },
  { value: "matematica", ages: "5–7 anos", skill: "Lógico-matemática" },
  { value: "coordenacao", ages: "3–6 anos", skill: "Motricidade" },
];

const gradients = [
  "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-purple-400 to-violet-500",
  "from-orange-400 to-amber-500",
  "from-pink-400 to-rose-500",
  "from-indigo-400 to-blue-500",
];

export default function CategoriesSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Categorias do MVP
          </span>
          <h2
            className="text-3xl md:text-5xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            6 categorias de atividades
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Desenvolvidas por pedagogos, alinhadas à BNCC e organizadas por faixa etária.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => {
            const detail = categoryDetails.find((d) => d.value === cat.value)!;
            return (
              <div
                key={cat.value}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-105 transition-transform`}
                >
                  {cat.emoji}
                </div>
                <h3
                  className="text-gray-900 font-bold text-lg mb-1"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {cat.label}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{detail.skill}</p>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                    {detail.ages}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
