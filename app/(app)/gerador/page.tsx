"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Wand2, Sparkles, Download, RefreshCw, BookOpen, Clock, Target,
  Save, Image as ImageIcon, Check
} from "lucide-react";
import toast from "react-hot-toast";
import { CATEGORIES } from "@/lib/utils";

type Difficulty = "easy" | "medium" | "hard";

interface ActivityResult {
  titulo: string;
  descricao: string;
  objetivo: string;
  instrucoes: string;
  instrucoesProfessor: string;
  materiais: string[];
  duracao: string;
  habilidades: string[];
  elementos: { tipo: string; descricao: string; conteudo: string }[];
  variacoes: string[];
}

interface PixabayImage {
  id: number;
  url: string;
  preview: string;
  tags: string;
}

const difficultyOptions: { value: Difficulty; label: string; emoji: string }[] = [
  { value: "easy", label: "Fácil", emoji: "🌱" },
  { value: "medium", label: "Médio", emoji: "🌿" },
  { value: "hard", label: "Difícil", emoji: "🌳" },
];

export default function GeradorPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    categoria: "",
    idade: 5,
    tema: "",
    dificuldade: "easy" as Difficulty,
    descricao: "",
  });
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<ActivityResult | null>(null);
  const [streamText, setStreamText] = useState("");
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleGenerate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!form.categoria) {
      toast.error("Selecione uma categoria");
      return;
    }

    setLoading(true);
    setActivity(null);
    setStreamText("");
    setImages([]);
    setSelectedImage(null);

    try {
      const res = await fetch("/api/generator/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao gerar atividade");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setStreamText(fullText);
      }

      const parsed = JSON.parse(fullText) as ActivityResult;
      setActivity(parsed);
      setStreamText("");
      toast.success("Atividade gerada com sucesso! 🎉");

      // Fetch images in background
      fetchImages(parsed.titulo, form.categoria, form.tema);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao gerar atividade");
    } finally {
      setLoading(false);
    }
  }

  async function fetchImages(titulo: string, categoria: string, tema: string) {
    setLoadingImages(true);
    try {
      const query = tema || titulo;
      const res = await fetch(
        `/api/images/search?q=${encodeURIComponent(query + " children education")}&per_page=6`
      );
      if (res.ok) {
        const data = await res.json();
        setImages(data.images ?? []);
      }
    } catch {
      // silently fail — images are optional
    } finally {
      setLoadingImages(false);
    }
  }

  async function handleSave() {
    if (!activity) return;
    setSaving(true);
    try {
      const res = await fetch("/api/activities/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: activity.titulo,
          descricao: activity.descricao,
          objetivo: activity.objetivo,
          categoria: form.categoria,
          dificuldade: form.dificuldade,
          idade: form.idade,
          tema: form.tema || undefined,
          thumbnailUrl: selectedImage ?? undefined,
          habilidades: activity.habilidades,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Atividade salva na biblioteca! 📚");
      router.push(`/atividade/${data.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  function handleExport() {
    if (!activity) return;
    const text = JSON.stringify(activity, null, 2);
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activity.titulo}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleReset() {
    setActivity(null);
    setStreamText("");
    setImages([]);
    setSelectedImage(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900" style={{ fontFamily: "var(--font-jakarta)" }}>
            Gerador de Atividades com IA
          </h1>
        </div>
        <p className="text-gray-500 ml-13">
          Descreva o que precisa e a IA cria uma atividade pedagógica completa em segundos.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <form onSubmit={handleGenerate} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
            {/* Categoria */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Categoria <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, categoria: cat.value }))}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm text-left transition-all ${
                      form.categoria === cat.value
                        ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="leading-tight">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Idade */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Faixa etária: <span className="text-purple-600">{form.idade} anos</span>
              </label>
              <input
                type="range"
                min={3}
                max={7}
                value={form.idade}
                onChange={(e) => setForm((f) => ({ ...f, idade: parseInt(e.target.value) }))}
                className="w-full accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                {[3, 4, 5, 6, 7].map((a) => <span key={a}>{a} anos</span>)}
              </div>
            </div>

            {/* Dificuldade */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Dificuldade</label>
              <div className="flex gap-2">
                {difficultyOptions.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, dificuldade: d.value }))}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-sm transition-all ${
                      form.dificuldade === d.value
                        ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-xl">{d.emoji}</span>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tema */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tema (opcional)
              </label>
              <input
                type="text"
                value={form.tema}
                onChange={(e) => setForm((f) => ({ ...f, tema: e.target.value }))}
                placeholder="Ex: animais, Natal, oceano, frutas..."
                className="w-full border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 rounded-xl px-4 py-3 text-sm outline-none transition-all"
              />
            </div>

            {/* Descrição adicional */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição adicional (opcional)
              </label>
              <textarea
                value={form.descricao}
                onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                placeholder="Ex: quero que inclua vogais, com 5 exercícios diferentes..."
                rows={3}
                className="w-full border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !form.categoria}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold py-4 rounded-xl text-sm transition-all disabled:opacity-60 shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Gerando atividade...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Gerar Atividade com IA
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result */}
        <div>
          {/* Streaming preview */}
          {streamText && !activity && (
            <div className="bg-white rounded-2xl border border-purple-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-sm font-medium text-purple-600">Gerando atividade...</span>
              </div>
              <pre className="text-xs text-gray-500 whitespace-pre-wrap font-mono overflow-hidden max-h-80">
                {streamText}
              </pre>
            </div>
          )}

          {/* Empty state */}
          {!activity && !streamText && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-10 text-center h-full flex flex-col items-center justify-center min-h-80">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-gray-700 font-bold text-lg mb-2">Pronto para criar!</h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Preencha o formulário ao lado e a IA criará uma atividade pedagógica completa para você.
              </p>
            </div>
          )}

          {/* Activity result */}
          {activity && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {activity.titulo}
                    </h2>
                    <p className="text-white/80 text-sm">{activity.descricao}</p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="shrink-0 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                    title="Gerar nova atividade"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs">
                    <Clock className="w-3 h-3" />
                    {activity.duracao}
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs">
                    <Target className="w-3 h-3" />
                    {form.idade} anos
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Objetivo */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Objetivo</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{activity.objetivo}</p>
                </div>

                {/* Materiais */}
                {activity.materiais.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Materiais</h3>
                    <div className="flex flex-wrap gap-2">
                      {activity.materiais.map((m, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Instruções */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Instruções para a Criança
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {activity.instrucoes}
                  </p>
                </div>

                {/* Dicas professor */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                    💡 Dicas para o Professor/Pai
                  </h3>
                  <p className="text-amber-800 text-sm leading-relaxed">{activity.instrucoesProfessor}</p>
                </div>

                {/* Habilidades BNCC */}
                {activity.habilidades.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Habilidades BNCC
                    </h3>
                    <ul className="space-y-1">
                      {activity.habilidades.map((h, i) => (
                        <li key={i} className="text-gray-600 text-xs flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">•</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Image picker */}
                {(loadingImages || images.length > 0) && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> Escolha uma Imagem (opcional)
                    </h3>
                    {loadingImages ? (
                      <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {images.map((img) => (
                          <button
                            key={img.id}
                            type="button"
                            onClick={() => setSelectedImage(selectedImage === img.url ? null : img.url)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                              selectedImage === img.url
                                ? "border-purple-500 ring-2 ring-purple-200"
                                : "border-transparent hover:border-gray-300"
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.preview}
                              alt={img.tags}
                              className="w-full h-full object-cover"
                            />
                            {selectedImage === img.url && (
                              <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                                <Check className="w-6 h-6 text-white drop-shadow" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Imagens via Pixabay • Clique para selecionar como capa
                    </p>
                  </div>
                )}

                {/* Variações */}
                {activity.variacoes.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Variações</h3>
                    <div className="space-y-2">
                      {activity.variacoes.map((v, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-purple-400 font-bold shrink-0">{i + 1}.</span>
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <button
                    onClick={handleExport}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700 text-sm font-medium transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Exportar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold transition-all disabled:opacity-60"
                  >
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Salvar na Biblioteca
                  </button>
                  <button
                    onClick={() => handleGenerate()}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-bold hover:from-purple-500 hover:to-pink-400 transition-all disabled:opacity-60"
                  >
                    <Sparkles className="w-4 h-4" />
                    Gerar Outra
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
