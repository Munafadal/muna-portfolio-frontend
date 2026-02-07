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

  // Close modal with Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
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

          {/* mobile placeholder */}
          <div className="md:hidden">
            <span className="text-xs text-slate-300/80">Menu</span>
          </div>
        </div>
      </header>

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
