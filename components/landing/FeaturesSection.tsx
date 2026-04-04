import { Library, Wand2, Users, Download, Sparkles, BookOpen } from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Biblioteca Curada",
    description:
      "200+ atividades organizadas por categoria, faixa etária e habilidade. Filtros avançados para encontrar o material certo.",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    icon: Download,
    title: "PDFs de Alta Qualidade",
    description:
      "Baixe atividades prontas para imprimir em casa ou na escola. Qualidade gráfica profissional.",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    icon: BookOpen,
    title: "Modo Interativo",
    description:
      "A criança resolve na tela com toque ou mouse. Ideal para tablets e computadores em sala de aula.",
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
  },
  {
    icon: Wand2,
    title: "Gerador com Templates",
    description:
      "Crie atividades personalizadas com templates drag-and-drop. Troque imagens, textos, cores e fontes.",
    gradient: "from-purple-500 to-violet-500",
    bg: "bg-purple-50",
  },
  {
    icon: Sparkles,
    title: "Assistência de IA",
    description:
      "Descreva a atividade que precisa e a IA gera automaticamente. Sugestões pedagógicas baseadas na faixa etária.",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
  },
  {
    icon: Users,
    title: "Comunidade de Professores",
    description:
      "Compartilhe suas criações, avalie atividades de colegas e construa uma biblioteca colaborativa.",
    gradient: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Funcionalidades
          </span>
          <h2
            className="text-3xl md:text-5xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Tudo que você precisa para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              ensinar com qualidade
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Uma plataforma completa para pais e professores. Do material pronto ao gerador
            personalizado, em português e alinhado à BNCC.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group p-7 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-gray-900 font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
