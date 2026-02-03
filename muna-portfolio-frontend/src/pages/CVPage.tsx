// src/pages/CVPage.tsx
import React, { useEffect, useState } from "react";
import { getApiUrl, getBackendUrl } from "../config/api";

type ProfileAttributes = {
  id: number;
  cv: string | null;
  name: string;
};

const fallbackProfile: ProfileAttributes = {
  id: 1,
  cv: null,
  name: "Muna Osman",
};

export const CVPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileAttributes>(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(getApiUrl("/api/profile"));

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const data = await res.json();
        if (!cancelled) {
          setProfile(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load profile");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Helper function to get full CV URL
  const getCVUrl = (cv: string | null): string | null => {
    if (!cv) return null;
    return getBackendUrl(cv);
  };

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-100/90">
          Resume
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Curriculum Vitae
        </h1>
        <p className="text-sm text-slate-300 max-w-xl">
          View and open your CV.
        </p>
      </header>

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8 text-center">
          <p className="text-slate-300">Loading...</p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-rose-800/50 bg-rose-950/20 p-6">
          <p className="text-rose-300 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg shadow-black/40">
          <h2 className="text-sm font-semibold text-slate-50 mb-4">Muna - Personal</h2>
          
          {profile.cv ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  CV Link
                </label>
                <input
                  type="text"
                  value={profile.cv}
                  readOnly
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 focus:outline-none"
                  placeholder="No CV link set"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href={getCVUrl(profile.cv) || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/40 hover:brightness-110 transition"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open CV
                </a>
                <a
                  href={getCVUrl(profile.cv) || "#"}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-6 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800 transition"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-300 text-sm mb-2">No CV link available</p>
              <p className="text-slate-500 text-xs">CV link has not been set yet.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
