// src/pages/ContactPage.tsx
import React, { useEffect, useState } from "react";
import { getApiUrl } from "../config/api";

type ProfileAttributes = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  location: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
};

const fallbackProfile: ProfileAttributes = {
  id: 1,
  name: "Muna Osman",
  email: "muna@example.com",
  phoneNumber: null,
  location: "London, UK",
  github: null,
  linkedin: null,
  twitter: null,
};

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const ContactPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileAttributes>(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    // Simulate form submission (you can integrate with email service later)
    setTimeout(() => {
      setFormStatus({
        type: "success",
        message: "Thank you for your message! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);

    // TODO: Integrate with email service (e.g., EmailJS, SendGrid, etc.)
    // Example:
    // try {
    //   await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   setFormStatus({ type: 'success', message: 'Message sent!' });
    // } catch (err) {
    //   setFormStatus({ type: 'error', message: 'Failed to send message' });
    // }
  };

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-100/90">
          Get in Touch
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Contact Me
        </h1>
        <p className="text-sm text-slate-300 max-w-xl">
          Have a question or want to work together? I'd love to hear from you.
          Send me a message and I'll respond as soon as possible.
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
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg shadow-black/40">
              <h2 className="text-lg font-semibold text-slate-50 mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                {profile.email && (
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-slate-900 p-2">
                      <svg
                        className="h-5 w-5 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Email</p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-sm text-slate-200 hover:text-indigo-400 transition"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}

                {profile.phoneNumber && (
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-slate-900 p-2">
                      <svg
                        className="h-5 w-5 text-fuchsia-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Phone</p>
                      <a
                        href={`tel:${profile.phoneNumber}`}
                        className="text-sm text-slate-200 hover:text-fuchsia-400 transition"
                      >
                        {profile.phoneNumber}
                      </a>
                    </div>
                  </div>
                )}

                {profile.location && (
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-slate-900 p-2">
                      <svg
                        className="h-5 w-5 text-sky-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Location</p>
                      <p className="text-sm text-slate-200">{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-400 mb-3">Connect with me</p>
                <div className="flex flex-wrap gap-3">
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-200 hover:border-indigo-500 hover:text-white transition"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0 12 5.373 12 12 0 5.302-3.438 9.8-8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}

                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-200 hover:border-sky-500 hover:text-white transition"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}

                  {profile.twitter && (
                    <a
                      href={profile.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-200 hover:border-sky-400 hover:text-white transition"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a5.64 5.64 0 01-3.5 1.81 4.5 4.5 0 004.17 2.81A9 9 0 010 17.5a12.79 12.79 0 007.19 2.1c8.5 0 13.15-7.04 13.15-13.15 0-.2 0-.4-.01-.6a9.4 9.4 0 002.32-2.39z" />
                      </svg>
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg shadow-black/40">
            <h2 className="text-lg font-semibold text-slate-50 mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-slate-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-300 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-medium text-slate-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition resize-none"
                  placeholder="Tell me about your project or question..."
                />
              </div>

              {formStatus.type && (
                <div
                  className={`rounded-lg p-3 text-sm ${
                    formStatus.type === "success"
                      ? "bg-emerald-950/50 border border-emerald-800/50 text-emerald-300"
                      : "bg-rose-950/50 border border-rose-800/50 text-rose-300"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/40 hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};
