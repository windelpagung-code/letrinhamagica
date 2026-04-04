import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-300 to-pink-400 flex items-center justify-center">
                <span className="text-base font-black text-gray-900">L</span>
              </div>
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-jakarta)" }}>
                LetrinhaMágica
              </span>
            </div>
            <p className="text-sm max-w-xs">
              Atividades educativas para crianças de 3 a 7 anos. Em português, com amor.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-white font-semibold mb-3">Produto</p>
              <ul className="space-y-2">
                <li><Link href="/biblioteca" className="hover:text-white transition-colors">Biblioteca</Link></li>
                <li><Link href="/gerador" className="hover:text-white transition-colors">Gerador</Link></li>
                <li><Link href="/cadastro" className="hover:text-white transition-colors">Começar grátis</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Empresa</p>
              <ul className="space-y-2">
                <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><a href="mailto:oi@letrinha-magica.com.br" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Legal</p>
              <ul className="space-y-2">
                <li><Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link href="/termos" className="hover:text-white transition-colors">Termos</Link></li>
                <li><Link href="/lgpd" className="hover:text-white transition-colors">LGPD</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2026 LetrinhaMágica. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <span className="text-pink-400">❤</span> para educadores brasileiros
          </p>
        </div>
      </div>
    </footer>
  );
}
