import React from "react";

const hobbies = [
  {
    title: "Building side projects",
    description:
      "Experimenting with new frameworks, patterns and ideas in small, focused projects.",
    accent: "from-indigo-500/60 to-fuchsia-500/50",
  },
  {
    title: "Learning & reading",
    description:
      "Exploring topics like system design, frontend architecture and developer experience.",
    accent: "from-emerald-500/60 to-teal-500/50",
  },
  {
    title: "Design & UX",
    description:
      "Paying attention to details, layouts and micro-interactions that make interfaces feel nice.",
    accent: "from-sky-500/60 to-indigo-500/50",
  },
];

export const HobbiesPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-100/90">
          Outside of work
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Hobbies & interests
        </h1>
        <p className="text-sm text-slate-300 max-w-xl">
          A few things I enjoy that feed back into how I think about building
          products and writing code.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {hobbies.map((hobby) => (
          <div
            key={hobby.title}
            className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-black/40 overflow-hidden"
          >
            <div
              className={`pointer-events-none absolute -inset-20 opacity-30 blur-3xl bg-gradient-to-br ${hobby.accent}`}
            />
            <div className="relative space-y-2">
              <h2 className="text-sm font-semibold text-slate-50">
                {hobby.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {hobby.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
