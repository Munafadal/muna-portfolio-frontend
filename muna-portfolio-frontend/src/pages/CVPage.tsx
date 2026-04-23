// src/pages/CVPage.tsx
import React, { useEffect, useState } from "react";
import { getApiUrl, getBackendUrl } from "../config/api";

type ProfileAttributes = {
  id: number;
  name: string;
};

const fallbackProfile: ProfileAttributes = {
  id: 1,
  name: "Muna Osman",
};

export const CVPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileAttributes>(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cvPath, setCvPath] = useState<string | null>(null);
  const [cvLoadError, setCvLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [profileRes, cvRes] = await Promise.all([
          fetch(getApiUrl("/api/profile")),
          fetch(getApiUrl("/api/cv")),
        ]);

        if (!profileRes.ok && !cvRes.ok) {
          throw new Error(
            `Failed to load profile (${profileRes.status}) and CV (${cvRes.status})`,
          );
        }

        if (profileRes.ok) {
          const profileData: ProfileAttributes = await profileRes.json();
          if (!cancelled) {
            setProfile(profileData);
          }
        }

        if (cvRes.ok) {
          const cvData = (await cvRes.json()) as { cv?: string | null };
          if (!cancelled) {
            setCvPath(cvData.cv ?? null);
            setCvLoadError(false);
          }
        } else {
          if (!cancelled) {
            setCvPath(null);
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Failed to load CV page data",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const cvUrl = getApiUrl("/api/cv/file");

  console.log("PROFILE DATA:", profile);
  console.log("CV PATH:", cvPath);
  console.log("CV URL:", cvUrl);

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
          <h2 className="text-sm font-semibold text-slate-50 mb-4">
            Muna - Personal
          </h2>

          {cvPath ? (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  CV Link
                </label>
                <input
                  type="text"
                  value={cvPath}
                  readOnly
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={cvUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/40 hover:brightness-110 transition"
                >
                  Preview CV
                </a>

                <a
                  href={cvUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-6 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800 transition"
                >
                  Open in New Tab
                </a>
              </div>

              <div className="mt-6">
                <label className="block text-xs font-medium text-slate-300 mb-3">
                  Preview
                </label>

                <div className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
                  {cvLoadError ? (
                    <div className="p-8 text-center">
                      <p className="text-amber-300 text-sm font-medium mb-2">
                        CV file not found
                      </p>
                      <p className="text-slate-400 text-xs mb-4 max-w-md mx-auto">
                        Please re-upload your CV using Swagger at{" "}
                        <a
                          href={`${getBackendUrl("")}/api-docs`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 underline"
                        >
                          {getBackendUrl("")}/api-docs
                        </a>
                      </p>
                    </div>
                  ) : cvPath.endsWith(".pdf") || cvPath.includes(".pdf") ? (
                    <iframe
                      src={cvUrl || ""}
                      className="w-full h-[600px] border-0"
                      title="CV Preview"
                      onError={() => setCvLoadError(true)}
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-slate-300 text-sm mb-4">
                        This document type cannot be previewed in the browser.
                      </p>
                      <a
                        href={cvUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/40 hover:brightness-110 transition"
                      >
                        Open CV Document
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-300 text-sm mb-2">
                No CV link available
              </p>
              <p className="text-slate-500 text-xs">
                CV link has not been set yet.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
