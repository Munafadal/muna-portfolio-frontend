import React from "react";

const achievements = [
  {
    label: "Production systems shipped",
    value: "5+",
    accent: "from-indigo-500 to-fuchsia-500",
  },
  {
    label: "Years of experience",
    value: "1+",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    label: "Ongoing learning streak",
    value: "Every week",
    accent: "from-sky-400 to-indigo-500",
  },
];

export const AchievementsPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-100/90">
          Highlights & milestones
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Achievements
        </h1>
        <p className="text-sm text-slate-300 max-w-xl">
          A quick snapshot of the progress I&apos;ve made so far—and the kind of
          impact I&apos;m aiming for.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {achievements.map((a) => (
          <div
            key={a.label}
            className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-black/40 overflow-hidden"
          >
            <div
              className={`pointer-events-none absolute -inset-16 opacity-30 blur-3xl bg-gradient-to-br ${a.accent}`}
            />
            <div className="relative space-y-2">
              <p className="text-2xl font-semibold text-slate-50">{a.value}</p>
              <p className="text-xs text-slate-300">{a.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg shadow-black/40">
        <h2 className="text-sm font-semibold text-slate-50 mb-2">
          What these mean
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          For me, achievements are less about titles and more about growth:
          learning new tools, shipping things that work, and collaborating well
          with others. I&apos;m interested in roles where I can keep growing
          while helping teams move faster and build better products.
        </p>
      </section>
    </div>
  );
};
