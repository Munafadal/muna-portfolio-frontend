// src/components/profile/HobbyCard.tsx
import React from "react";

type HobbyCardProps = {
  emoji: string;
  title: string;
  description: string;
};

export const HobbyCard: React.FC<HobbyCardProps> = ({
  emoji,
  title,
  description,
}) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
    <div className="text-2xl">{emoji}</div>
    <h2 className="mt-3 text-sm font-semibold text-slate-100">{title}</h2>
    <p className="mt-2 text-sm text-slate-300">{description}</p>
  </div>
);
