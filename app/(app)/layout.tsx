import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, LayoutDashboard, Wand2, User, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 p-5 fixed h-full z-10">
        <Link href="/dashboard" className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-300 to-pink-400 flex items-center justify-center shadow">
            <span className="text-base font-black text-gray-900">L</span>
          </div>
          <span className="font-bold text-gray-900 text-lg" style={{ fontFamily: "var(--font-jakarta)" }}>
            LetrinhaMágica
          </span>
        </Link>

        <nav className="flex-1 space-y-1">
          {[
            { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { href: "/biblioteca", icon: BookOpen, label: "Biblioteca" },
            { href: "/gerador", icon: Wand2, label: "Gerador" },
            { href: "/perfil", icon: User, label: "Meu Perfil" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors text-sm font-medium group"
              >
                <Icon className="w-4 h-4 group-hover:text-purple-600" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
              {session.user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{session.user.name}</p>
              <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-300 to-pink-400 flex items-center justify-center">
            <span className="text-sm font-black text-gray-900">L</span>
          </div>
          <span className="font-bold text-gray-900" style={{ fontFamily: "var(--font-jakarta)" }}>
            LetrinhaMágica
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {[
            { href: "/dashboard", icon: LayoutDashboard },
            { href: "/biblioteca", icon: BookOpen },
            { href: "/gerador", icon: Wand2 },
            { href: "/perfil", icon: User },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-2 rounded-xl text-gray-500 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-0 lg:pt-0">
        <div className="lg:hidden h-14" />
        {children}
      </main>
    </div>
  );
}
