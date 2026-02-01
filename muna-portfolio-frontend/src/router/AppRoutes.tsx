import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { AchievementsPage } from "../pages/AchievementsPage";
import { HobbiesPage } from "../pages/HobbiesPage";
import { BlogPage } from "../pages/BlogPage";
import { CVPage } from "../pages/CVPage";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile" replace />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/hobbies" element={<HobbiesPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/cv" element={<CVPage />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    
    </Routes>
  );
};
