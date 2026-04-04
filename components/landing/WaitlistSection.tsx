"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function WaitlistSection() {
  const [form, setForm] = useState({ email: "", name: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      toast.success(data.message);
      setJoined(true);
    } catch {
      toast.error("Erro ao entrar na lista. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-5xl mb-6">🌟</div>
        <h2
          className="text-3xl md:text-5xl font-black text-white mb-4"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Entre na lista de espera
        </h2>
        <p className="text-white/70 text-lg mb-10">
          Seja um dos primeiros a acessar. Membros da lista ganham 3 meses grátis no Premium.
        </p>

        {joined ? (
          <div className="glass rounded-2xl p-8">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-white font-bold text-xl mb-2">Você está na lista!</h3>
            <p className="text-white/60">
              Avisaremos pelo seu email assim que abrirmos o acesso.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Seu nome"
                className="glass text-white placeholder:text-white/40 rounded-xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-white/30 w-full"
              />
              <select
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="glass text-white/70 rounded-xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-white/30 w-full bg-transparent"
              >
                <option value="" className="text-gray-900">Você é...</option>
                <option value="parent" className="text-gray-900">Pai / Mãe</option>
                <option value="teacher" className="text-gray-900">Professor(a)</option>
              </select>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="seu@email.com.br"
                required
                className="flex-1 glass text-white placeholder:text-white/40 rounded-xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-300 hover:to-pink-400 text-gray-900 font-bold px-6 py-3.5 rounded-xl text-sm transition-all disabled:opacity-60 shadow-lg whitespace-nowrap"
              >
                {loading ? "..." : "Entrar 🚀"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
