import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/profile", label: "Profile", emoji: "👤" },
  { to: "/projects", label: "Projects", emoji: "🛠️" },
  { to: "/achievements", label: "Achievements", emoji: "🏆" },
  { to: "/hobbies", label: "Hobbies", emoji: "🎧" },
  { to: "/blog", label: "Blog", emoji: "✍️" },
];

interface SiteLayoutProps {
  children: React.ReactNode;
}

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/80 backdrop-blur">
          {/* Logo + name */}
          <div className="px-6 py-6 border-b border-slate-800">
            <div className="h-10 w-10 rounded-2xl bg-emerald-400 flex items-center justify-center text-slate-950 font-bold text-lg">
              M
            </div>
            <div className="mt-4 space-y-0.5">
              <p className="text-sm font-semibold">Muna</p>
              <p className="text-xs text-slate-400">
                Software Development Engineer
              </p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-3 py-2 transition-all",
                    "hover:bg-slate-800/70 hover:text-slate-50",
                    "border border-transparent",
                    isActive
                      ? "bg-slate-800 text-slate-50 border-slate-700 shadow-sm"
                      : "text-slate-300",
                  ].join(" ")
                }
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-base">
                  {item.emoji}
                </span>
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-500">
            © {new Date().getFullYear()} Muna Osman
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Top bar on mobile */}
          <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur px-4 py-3 flex items-center justify-between md:hidden">
            <div>
              <p className="text-sm font-semibold">Muna</p>
              <p className="text-xs text-slate-400">
                Software Development Engineer
              </p>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
