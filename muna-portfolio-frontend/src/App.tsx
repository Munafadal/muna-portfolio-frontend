// src/App.tsx
import React from "react";
import { AppRoutes } from "./router/AppRoutes";
import { SiteHeader } from "./components/layout/SiteHeader";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* gradient background “sky” behind everything */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-x-0 top-0 -z-10 h-96 bg-gradient-to-br from-indigo-700/40 via-fuchsia-600/30 to-sky-500/20 blur-3xl opacity-70 pointer-events-none" />

      <SiteHeader />


      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
