// src/components/layout/SiteHeader.tsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import profileImage from "../../assets/profile.jpg";

type NavItem = {
  label: string;
  path: string;
  end?: boolean;
};

const navItems: NavItem[] = [
  { label: "Profile", path: "/profile", end: true },
  { label: "Projects", path: "/projects" },
  { label: "Achievements", path: "/achievements" },
  { label: "Hobbies", path: "/hobbies" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const linkBase = "rounded-full px-4 py-2 text-sm font-medium transition-colors";
const linkInactive = "text-slate-200/80 hover:text-white hover:bg-white/10";
const linkActive =
  "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/40";

export const SiteHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* logo / name */}
          <div className="flex items-center gap-3">
            {/* Clickable profile image */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative focus:outline-none"
              aria-label="Open profile image"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-sky-400 blur opacity-60" />
              <img
                src={profileImage}
                alt="Muna"
                className="relative h-10 w-10 rounded-full object-cover border-2 border-slate-900 bg-slate-800 hover:scale-105 transition"
              />
            </button>

            {/* Name + title */}
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-100">
                Muna Osman
              </div>
              <div className="text-xs text-slate-400">
                Software Development Engineer
              </div>
            </div>
          </div>

          {/* nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  [linkBase, isActive ? linkActive : linkInactive].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/cv"
              className={({ isActive }) =>
                [linkBase, isActive ? linkActive : linkInactive].join(" ")
              }
            >
              CV
            </NavLink>
          </nav>

          {/* Mobile menu button - Always visible on mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded-lg text-white bg-slate-800/80 border border-slate-700 hover:bg-slate-700 hover:border-indigo-500/50 transition z-50 relative shadow-lg"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-slate-950 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="flex flex-col h-full pt-24 px-6 pb-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Navigation</h2>
              <p className="text-xs text-slate-400">Tap a page to navigate</p>
            </div>
            <nav className="flex flex-col gap-2 flex-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className={({ isActive }) =>
                    [
                      "rounded-lg px-4 py-4 text-base font-medium transition-colors text-left",
                      isActive 
                        ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/40" 
                        : "text-slate-200/80 hover:text-white hover:bg-white/10 border border-slate-800",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/cv"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-4 py-4 text-base font-medium transition-colors text-left",
                    isActive 
                      ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/40" 
                      : "text-slate-200/80 hover:text-white hover:bg-white/10 border border-slate-800",
                  ].join(" ")
                }
              >
                CV
              </NavLink>
            </nav>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 px-4 py-3 rounded-lg border-2 border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-white/10 hover:text-white transition font-medium"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}

      {/* Image modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-sm sm:max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-sky-400 blur-2xl opacity-70" />
            <img
              src={profileImage}
              alt="Muna"
              className="relative w-full rounded-3xl object-cover border-4 border-slate-900 bg-slate-800 shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};
