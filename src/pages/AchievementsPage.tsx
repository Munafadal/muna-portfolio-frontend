import React from "react";

const achievements = [
  { label: "Production systems shipped", value: "5+" },
  { label: "Years of experience", value: "X+" }, // fill your number
  { label: "Open-source contributions", value: "Ongoing" },
];

export const AchievementsPage: React.FC = () => {
  return (
    <div className="page-shell">
      <header className="space-y-2">
        <h1 className="page-title">Achievements</h1>
        <p className="page-subtitle">
          Highlights from my work and learning journey.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-3">
        {achievements.map((item) => (
          <div key={item.label} className="card space-y-1">
            <p className="text-2xl font-semibold">{item.value}</p>
            <p className="text-xs text-slate-400">{item.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
