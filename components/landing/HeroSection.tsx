"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, BookOpen, Download, Brain } from "lucide-react";
import toast from "react-hot-toast";

export default function HeroSection() {
  const waitlistCount = 847;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      toast.success(data.message);
      setJoined(true);
      setEmail("");
    } catch {
      toast.error("Erro ao entrar na lista. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const displayCount = Math.max(waitlistCount, 847);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #1a0533 0%, #2d0a5e 35%, #4c1d95 70%, #6d28d9 100%)",
      }}
    >
      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-16 w-[480px] h-[480px] rounded-full animate-float-slow"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[40%] -right-24 w-80 h-80 rounded-full animate-float"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 left-[30%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-300 to-pink-400 flex items-center justify-center shadow-lg">
            <span className="text-lg font-black">L</span>
          </div>
          <span
            className="text-white font-bold text-xl tracking-tight"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            LetrinhaMágica
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
          >
            Começar grátis
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
          <span className="text-white/85 text-sm font-medium">
            +{displayCount.toLocaleString("pt-BR")} educadores na lista de espera
          </span>
        </div>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 max-w-4xl"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Atividades educativas{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x">
            mágicas
          </span>{" "}
          para crianças de 3 a 7 anos
        </h1>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Biblioteca curada de atividades, gerador com IA e modo interativo. Tudo em português,
          alinhado à BNCC. Pronto para imprimir ou usar na tela.
        </p>

        {/* Waitlist form */}
        {!joined ? (
          <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-12">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com.br"
              required
              className="flex-1 glass text-white placeholder:text-white/40 rounded-xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-300 hover:to-pink-400 text-gray-900 font-bold px-6 py-3.5 rounded-xl text-sm transition-all disabled:opacity-60 whitespace-nowrap shadow-lg"
            >
              {loading ? "Entrando..." : "Quero entrar 🎉"}
            </button>
          </form>
        ) : (
          <div className="glass rounded-2xl px-8 py-5 mb-12 text-white text-center">
            <div className="text-2xl mb-1">🎉</div>
            <p className="font-semibold">Você está na lista!</p>
            <p className="text-white/60 text-sm mt-1">Avisaremos quando abrirmos o acesso.</p>
          </div>
        )}

        {/* Stat pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: BookOpen, label: "200+ atividades", color: "from-blue-400 to-cyan-400" },
            { icon: Download, label: "PDFs imprimíveis", color: "from-emerald-400 to-teal-400" },
            { icon: Brain, label: "Gerador com IA", color: "from-purple-400 to-pink-400" },
            { icon: Sparkles, label: "Modo interativo", color: "from-yellow-400 to-orange-400" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="glass rounded-full flex items-center gap-2 px-4 py-2">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon className="w-3 h-3 text-white" />
              </div>
              <span className="text-white/80 text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative z-10 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" className="w-full fill-white">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
