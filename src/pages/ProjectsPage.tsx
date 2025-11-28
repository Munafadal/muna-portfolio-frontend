import React from "react";

const projects = [
  {
    title: "Portfolio",
    description:
      "Personal portfolio built with React, Vite, TypeScript, and Tailwind.",
    tech: ["React", "Vite", "TypeScript", "Tailwind"],
  },
  {
    title: "Geo Addressing System",
    description: "Tooling for location and address management.",
    tech: ["Node.js", "React", "PostgreSQL"],
  },
];

export const ProjectsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-slate-400">
          A few things I&apos;ve been building recently.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm space-y-3"
          >
            <h2 className="text-base font-semibold">{project.title}</h2>
            <p className="text-sm text-slate-300">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-slate-300"
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
