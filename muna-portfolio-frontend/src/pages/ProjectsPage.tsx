import React, { useEffect, useState } from "react";
import { getApiUrl } from "../config/api";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string; // Comma-separated string
  highlight: string | null;
  url: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  order: number;
};

// Fallback projects (used if API fails)
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Beauty Hub",
    description:
      "A beauty and cosmetics platform built with modern web technologies.",
    tech: "React, TypeScript, Vite, Tailwind",
    highlight: "Frontend · E-commerce",
    url: null,
    githubUrl: null,
    imageUrl: null,
    featured: false,
    order: 0,
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "Personal portfolio website showcasing projects and skills.",
    tech: "React, TypeScript, Vite, Tailwind",
    highlight: "Frontend · Portfolio",
    url: null,
    githubUrl: null,
    imageUrl: null,
    featured: false,
    order: 1,
  },
];

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(getApiUrl("/api/projects"));

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const data: Project[] = await res.json();
        if (!cancelled) {
          // If no projects in database, use fallback
          setProjects(data.length > 0 ? data : fallbackProjects);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load projects");
          // Keep fallback projects in UI
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Convert tech string to array
  const getTechArray = (tech: string): string[] => {
    return tech
      ? tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
  };
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-100/90">
          Selected work
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Projects
        </h1>
        <p className="text-sm text-slate-300 max-w-xl">
          A few things I&apos;ve been working on—from personal experiments to
          production-ready tools.
        </p>
      </header>

      {loading && (
        <div className="text-center py-10">
          <p className="text-slate-400">Loading projects...</p>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
          <p className="text-sm text-yellow-300">
            ⚠️ {error}. Showing fallback projects.
          </p>
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-black/40 hover:border-indigo-500/70 hover:shadow-indigo-500/30 transition"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-50">
                {project.title}
              </h2>
              {project.highlight && (
                <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-medium text-slate-300 border border-slate-700">
                  {project.highlight}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-300 mb-3">
              {getTechArray(project.tech).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
            {(project.url || project.githubUrl) && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-800">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  >
                    View Project →
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-400 hover:text-slate-300 transition"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};
