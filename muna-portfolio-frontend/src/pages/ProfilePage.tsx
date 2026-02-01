// src/pages/ProfilePage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Frontend version of your ProfileAttributes
type ProfileAttributes = {
  id: number;
  name: string;
  bio: string | null;
  location: string | null;
  nationality: string | null;
  availability: string | null;
  dateOfBirth: string | null;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  github: string | null;
  twitter: string | null;
  cv: string | null;
  linkedin: string | null;
  expectedSalery: number | null; // (typo kept to match your existing UI)
  ownACar: boolean;
  haveDrivingLicence: boolean;
  noticePeriod: string | null;
  immigrationStatus: string | null;
  references: string | null;
  willingToRelocate: boolean;
  languages: string | null; // "English, Arabic"
  skills: string | null; // "Node.js, TypeScript"
};

// TEMP fallback – used until API loads or if API fails
const fallbackProfile: ProfileAttributes = {
  id: 1,
  name: "Muna Osman",
  bio: "...",
  location: "London, UK",
  nationality: "Somali / British",
  availability: "Immediately available",
  dateOfBirth: "1995-01-01",
  email: "muna@example.com",
  phoneNumber: "+44 0000 000000",
  address: "London, United Kingdom",
  github: "https://github.com/your-github",
  twitter: null,
  cv: "/uploads/cv-1769939464737-895233691.docx ", // ✅ add this (or null)
  linkedin: "https://linkedin.com/in/your-linkedin",
  expectedSalery: 65000,
  ownACar: false,
  haveDrivingLicence: true,
  noticePeriod: "0–1 month",
  immigrationStatus: "Right to work in the UK",
  references: "Available on request.",
  willingToRelocate: true,
  languages: "English, Arabic, Somali",
  skills: "React, TypeScript, Node.js, Vite, Tailwind CSS, REST APIs",
};


const toList = (value: string | null) =>
  value
    ? value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileAttributes>(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  


  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/profile");

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const data: ProfileAttributes = await res.json();
        if (!cancelled) setProfile(data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load profile");
          // keep fallbackProfile in UI
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const languageList = useMemo(() => toList(profile.languages), [profile.languages]);
  const skillList = useMemo(() => toList(profile.skills), [profile.skills]);

  return (
    <div className="space-y-14">
      {/* Optional status row */}
      {(loading || error) && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
          {loading ? "Loading profile…" : null}
          {error ? <span className="text-rose-300">Couldn’t load profile: {error}</span> : null}
        </div>
      )}

      {/* HERO SECTION – uses name, bio, availability, stack */}
      <section className="grid gap-10 md:grid-cols-[3fr,2fr] items-center">
        {/* Left */}
        <div className="space-y-6">
          {profile.availability && (
            <span className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-100/90">
              {profile.availability}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Hi, I&apos;m {profile.name.split(" ")[0]}.
            <span className="block bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-sky-300 bg-clip-text text-transparent">
              Software Development Engineer.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            {profile.bio ||
              "I build modern web applications with a focus on clean code, performance and great user experience."}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 text-xs text-slate-400">
            {profile.location && (
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>{profile.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">Email:</span>
              <span>{profile.email}</span>
            </div>
            {profile.nationality && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">Nationality:</span>
                <span>{profile.nationality}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right – profile card */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-indigo-700/40 via-fuchsia-600/35 to-sky-500/40 blur-3xl opacity-80" />
          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-2xl font-semibold text-white">
                {profile.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{profile.name}</div>
                <div className="text-xs text-slate-400">Software Development Engineer</div>
                {profile.location && <div className="text-[11px] text-slate-500">{profile.location}</div>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="space-y-1">
                <p className="text-[11px] text-slate-400">Expected salary</p>
                <p className="text-sm font-semibold text-slate-100">
                  {profile.expectedSalery ? `£${profile.expectedSalery.toLocaleString()}` : "Negotiable"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-slate-400">Notice period</p>
                <p className="text-sm font-semibold text-slate-100">{profile.noticePeriod || "Flexible"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-slate-400">Willing to relocate</p>
                <p className="text-sm font-semibold text-slate-100">{profile.willingToRelocate ? "Yes" : "No"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-slate-400">Immigration status</p>
                <p className="text-sm font-semibold text-slate-100">
                  {profile.immigrationStatus || "Not specified"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>
                  Driving licence: <span className="font-semibold">{profile.haveDrivingLicence ? "Yes" : "No"}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span>
                  Own a car: <span className="font-semibold">{profile.ownACar ? "Yes" : "No"}</span>
                </span>
              </div>
            </div>

<div className="pt-2 space-y-2 text-xs">
  <p className="text-[11px] text-slate-400">Links</p>

  <div className="flex flex-wrap gap-2">
    {profile.cv && (
      <Link
        to="/cv"
        className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-emerald-500 hover:text-white transition"
      >
        CV
      </Link>
    )}

    {profile.github && (
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-indigo-500 hover:text-white transition"
      >
        GitHub
      </a>
    )}

    {profile.linkedin && (
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-sky-500 hover:text-white transition"
      >
        LinkedIn
      </a>
    )}

    {profile.twitter && (
      <a
        href={profile.twitter}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-sky-400 hover:text-white transition"
      >
        Twitter
      </a>
    )}
  </div>
</div>

          </div>
        </div>
      </section>

      {/* SKILLS & LANGUAGES */}
      <section className="grid gap-6 md:grid-cols-[3fr,2fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg shadow-black/40">
          <h2 className="text-sm font-semibold text-slate-50 mb-3">Skills</h2>
          {skillList.length ? (
            <div className="flex flex-wrap gap-2 text-[11px]">
              {skillList.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Skills not specified yet.</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg shadow-black/40">
          <h2 className="text-sm font-semibold text-slate-50 mb-3">Languages</h2>
          {languageList.length ? (
            <div className="flex flex-wrap gap-2 text-[11px]">
              {languageList.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-200"
                >
                  {lang}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Languages not specified yet.</p>
          )}
        </div>
      </section>

      {/* REFERENCES */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg shadow-black/40">
        <h2 className="text-sm font-semibold text-slate-50 mb-2">References</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          {profile.references || "References available on request."}
        </p>
      </section>
    </div>
  );
};
