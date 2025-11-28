import React from "react";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AppRoutes } from "./router/AppRoutes";
import { SiteHeader } from "./components/layout/SiteHeader";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top header with nav */}
      <SiteHeader />

      {/* Main layout (sidebar + page content) */}
      <SiteLayout>
        <AppRoutes />
      </SiteLayout>
    </div>
  );
};

export default App;
