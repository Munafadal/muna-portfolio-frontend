import React from "react";

export const BlogPage: React.FC = () => {
  return (
    <div className="page-shell">
      <header className="space-y-2">
        <h1 className="page-title">Blog</h1>
        <p className="page-subtitle">
          Short notes, ideas, and things I&apos;ve been exploring.
        </p>
      </header>

      <section className="card space-y-3">
        <p className="text-sm text-slate-400">
          You can hook this up to Markdown files, a headless CMS, or just keep
          it as a simple list of posts.
        </p>
      </section>
    </div>
  );
};
