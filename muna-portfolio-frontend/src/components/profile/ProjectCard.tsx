// src/components/profile/ProjectCard.tsx
import React from "react";

type ProjectCardProps = {
  title: string;
  tech: string;
  description: string;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  tech,
  description,
}) => (
  <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
    <div>
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      <p className="mt-1 text-xs text-indigo-300">{tech}</p>
      <p className="mt-3 text-sm text-slate-300">{description}</p>
    </div>
  </div>
);
