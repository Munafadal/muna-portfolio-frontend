import React from "react";

const posts = [
  {
    title: "Improving the developer experience",
    tag: "Thoughts",
    description:
      "Small improvements in tooling and structure can make a big difference in how it feels to work on a codebase.",
  },
  {
    title: "React + TypeScript patterns I like",
    tag: "Frontend",
    description:
      "A few patterns and habits that keep components predictable, testable and easier to refactor.",
  },
  {
    title: "Learning in public",
    tag: "Growth",
    description:
      "Sharing what I&apos;m learning helps me think more clearly and connect with others solving similar problems.",
  },
];

export const BlogPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-100/90">
          Notes & ideas
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Blog
        </h1>
        <p className="text-sm text-slate-300 max-w-xl">
          Short notes and ideas around frontend, tooling, and how to build
          products that feel good to use.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-black/40 hover:border-indigo-500/70 hover:shadow-indigo-500/30 transition"
          >
            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[10px] font-medium text-slate-300 mb-3">
              {post.tag}
            </span>
            <h2 className="text-sm font-semibold text-slate-50 mb-2">
              {post.title}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {post.description}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
};
