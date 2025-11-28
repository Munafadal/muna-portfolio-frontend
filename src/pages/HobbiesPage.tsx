import React from "react";

export const HobbiesPage: React.FC = () => {
  return (
    <div className="page-shell">
      <header className="space-y-2">
        <h1 className="page-title">Hobbies</h1>
        <p className="page-subtitle">
          Things I enjoy outside of work and code.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="card space-y-2">
          <h2 className="text-sm font-semibold text-slate-200">
            Examples (update these!)
          </h2>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Learning new tools and frameworks</li>
            <li>Building side projects</li>
            <li>Reading about system design</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
