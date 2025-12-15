import React from "react";

const projects = [
  {
    title: "Portfolio",
    description:
      "Personal portfolio built with React, Vite, TypeScript, and Tailwind, styled with a custom Divi-inspired dark theme.",
    tech: ["React", "Vite", "TypeScript", "Tailwind"],
    highlight: "Frontend · UI/UX",
  },
  {
    title: "Geo Addressing System",
    description:
      "Tools for managing and searching location data, with a focus on accuracy and usability.",
    tech: ["React", "Node", "PostgreSQL"],
    highlight: "Data · APIs",
  },
  {
    title: "Internal Tools",
    description:
      "Dashboards and internal tools to streamline workflows and help teams move faster.",
    tech: ["React", "TypeScript", "REST APIs"],
    highlight: "Productivity",
  },
];

export const ProjectsPage: React.FC = () => {
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

      <section className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-black/40 hover:border-indigo-500/70 hover:shadow-indigo-500/30 transition"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-50">
                {project.title}
              </h2>
              <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-medium text-slate-300 border border-slate-700">
                {project.highlight}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
