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
  const [cvLoadError, setCvLoadError] = useState(false);

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
    const url = getBackendUrl(cv);
    // Debug: log the URL being used
    console.log('CV URL:', cv, '→ Full URL:', url);
    return url;
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
            <div className="space-y-6">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Preview CV
                </a>
                <a
                  href={getCVUrl(profile.cv) || "#"}
                  target="_blank"
                  rel="noreferrer"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open in New Tab
                </a>
              </div>

              {/* CV Preview Section */}
              <div className="mt-6">
                <label className="block text-xs font-medium text-slate-300 mb-3">
                  Preview
                </label>
                <div className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
                  {cvLoadError ? (
                    <div className="p-8 text-center">
                      <svg
                        className="mx-auto h-16 w-16 text-amber-500 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <p className="text-amber-300 text-sm font-medium mb-2">
                        CV file not found
                      </p>
                      <p className="text-slate-400 text-xs mb-4 max-w-md mx-auto">
                        The CV file may have been deleted due to server restart. Please re-upload your CV using the Swagger UI at{" "}
                        <a
                          href={`${getBackendUrl("")}/api/docs`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 underline"
                        >
                          {getBackendUrl("")}/api/docs
                        </a>
                        {" "}→ POST /api/cv/upload
                      </p>
                      <a
                        href={getCVUrl(profile.cv) || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-6 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800 transition"
                      >
                        Try Opening Direct Link
                      </a>
                    </div>
                  ) : profile.cv.endsWith('.pdf') || profile.cv.includes('.pdf') ? (
                    <iframe
                      src={getCVUrl(profile.cv) || ""}
                      className="w-full h-[600px] border-0"
                      title="CV Preview"
                      onError={() => setCvLoadError(true)}
                      onLoad={(e) => {
                        // Check if iframe loaded an error page
                        try {
                          const iframe = e.target as HTMLIFrameElement;
                          if (iframe.contentDocument?.body?.textContent?.includes('Cannot GET')) {
                            setCvLoadError(true);
                          }
                        } catch (err) {
                          // Cross-origin restrictions may prevent access
                          // We'll rely on the onError handler
                        }
                      }}
                    />
                  ) : profile.cv.endsWith('.docx') || profile.cv.endsWith('.doc') || profile.cv.includes('.docx') || profile.cv.includes('.doc') ? (
                    <div className="p-8 text-center">
                      <svg
                        className="mx-auto h-16 w-16 text-slate-500 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-slate-300 text-sm mb-4">
                        Word documents cannot be previewed in the browser.
                      </p>
                      <a
                        href={getCVUrl(profile.cv) || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/40 hover:brightness-110 transition"
                      >
                        Open CV Document
                      </a>
                    </div>
                  ) : (
                    <iframe
                      src={getCVUrl(profile.cv) || ""}
                      className="w-full h-[600px] border-0"
                      title="CV Preview"
                      onError={() => setCvLoadError(true)}
                    />
                  )}
                </div>
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
