// src/components/profile/AchievementItem.tsx
import React from "react";

type AchievementItemProps = {
  title: string;
  details: string;
};

export const AchievementItem: React.FC<AchievementItemProps> = ({
  title,
  details,
}) => (
  <li className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
    <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
    <p className="mt-2 text-sm text-slate-300">{details}</p>
  </li>
);
