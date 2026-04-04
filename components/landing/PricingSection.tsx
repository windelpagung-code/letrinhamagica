import { Check, X } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Grátis",
    price: "R$ 0",
    period: "para sempre",
    cta: "Começar grátis",
    href: "/cadastro",
    highlight: false,
    features: [
      { label: "5 downloads de PDF/mês", included: true },
      { label: "3 atividades interativas/mês", included: true },
      { label: "Acesso parcial à biblioteca", included: true },
      { label: "5 templates básicos", included: true },
      { label: "Compartilhar atividades", included: true },
      { label: "Biblioteca completa", included: false },
      { label: "Editor visual completo", included: false },
      { label: "IA generativa ilimitada", included: false },
      { label: "Downloads ilimitados", included: false },
      { label: "Sem marca d'água", included: false },
    ],
  },
  {
    name: "Premium",
    price: "R$ 24,90",
    period: "por mês",
    pricePeriod: "ou R$ 199,90/ano",
    cta: "Assinar Premium",
    href: "/cadastro?plan=premium",
    highlight: true,
    features: [
      { label: "Downloads ilimitados", included: true },
      { label: "Atividades interativas ilimitadas", included: true },
      { label: "Biblioteca completa", included: true },
      { label: "Todos os templates", included: true },
      { label: "Compartilhar + destaque no perfil", included: true },
      { label: "Editor visual completo", included: true },
      { label: "IA generativa ilimitada", included: true },
      { label: "Sem marca d'água", included: true },
      { label: "Suporte prioritário", included: true },
      { label: "Novidades em primeira mão", included: true },
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Preços
          </span>
          <h2
            className="text-3xl md:text-5xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Simples e transparente
          </h2>
          <p className="text-gray-500 text-lg">Comece grátis, faça upgrade quando precisar.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 relative ${
                plan.highlight
                  ? "border-purple-500 bg-gradient-to-b from-purple-50 to-white shadow-xl shadow-purple-100"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
                    Mais popular ✨
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="text-gray-900 font-bold text-xl mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-4xl font-black text-gray-900"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm">/{plan.period}</span>
                </div>
                {plan.pricePeriod && (
                  <p className="text-gray-400 text-sm mt-1">{plan.pricePeriod}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 shrink-0" />
                    )}
                    <span className={f.included ? "text-gray-700" : "text-gray-400"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full text-center py-3.5 rounded-xl font-bold text-sm block transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-lg"
                    : "border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Preços sujeitos a ajuste. Sem surpresas — cancele a qualquer momento.
        </p>
      </div>
    </section>
  );
}
