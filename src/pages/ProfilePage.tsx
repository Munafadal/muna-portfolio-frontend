import React from "react";

export const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-slate-400">
          A quick snapshot of who Muna Osman is and what she does.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">About</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            I&apos;m Muna Osman, a Software Development Engineer who enjoys building
            clean, performant products—especially with React, TypeScript, and
            modern tooling like Vite and Tailwind. I like solving real problems
            with thoughtful UI and solid engineering foundations. 
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-200">
            Tech snapshot
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {["React", "TypeScript", "Vite", "Tailwind", "REST APIs"].map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-slate-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
