// src/components/layout/SiteHeader.tsx
import React from "react";
import { NavLink } from "react-router-dom";

type NavItem = {
  label: string;
  path: string;
  end?: boolean;
};

const navItems: NavItem[] = [
  { label: "Profile", path: "/", end: true },
  { label: "Projects", path: "/projects" },
  { label: "Achievements", path: "/achievements" },
  { label: "Hobbies", path: "/hobbies" },
  { label: "Blog", path: "/blog" },
];

const desktopBase = "rounded-full px-3 py-1 text-sm font-medium transition";
const desktopInactive = "text-slate-300 hover:bg-slate-800 hover:text-white";
const desktopActive = "bg-indigo-500 text-white shadow-md shadow-indigo-500/30";

const mobileBase = "rounded-full px-3 py-1 text-xs font-medium transition";
const mobileInactive = "text-slate-300 hover:bg-slate-800 hover:text-white";
const mobileActive = "bg-indigo-500 text-white shadow-md shadow-indigo-500/30";

export const SiteHeader: React.FC = () => {
  return (
    <>
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/80 text-lg font-semibold">
              M
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100">Muna Osman</div>
              <div className="text-xs text-slate-400">
                Junior Software Development Engineer
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  [
                    desktopBase,
                    isActive ? desktopActive : desktopInactive,
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile nav */}
      <nav className="border-b border-slate-800 bg-slate-900/60 px-2 py-2 md:hidden">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                [mobileBase, isActive ? mobileActive : mobileInactive].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};
