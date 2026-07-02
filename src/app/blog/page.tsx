import type { Metadata } from "next";
import Link from "next/link";

import { Nav } from "@/components/nav";
import { ChapterHeading } from "@/components/manga/chapter-heading";
import { Panel } from "@/components/manga/panel";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Extras",
  description: "Bonus chapters: notes on engineering, design, and building things.",
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6">
        <ChapterHeading number="EX" title="EXTRAS" subtitle="Bonus chapters & field notes" />

        <div className="mt-14 flex flex-col gap-8">
          {posts.length === 0 && (
            <Panel className="p-8 text-center">
              <p className="font-display text-2xl">NO CHAPTERS YET…</p>
            </Panel>
          )}
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Panel
                tilt={i % 2 === 0 ? "left" : "right"}
                className="p-6 transition-transform duration-200 group-hover:-translate-y-1 group-hover:rotate-0 sm:p-8"
              >
                <div className="halftone absolute top-0 right-0 h-12 w-12" aria-hidden />
                <p className="font-display text-xs tracking-[0.3em] text-electric-deep">
                  {post.frontmatter.date}
                </p>
                <h2 className="mt-2 font-display text-2xl tracking-wide transition-colors group-hover:text-electric sm:text-3xl">
                  {post.frontmatter.title.toUpperCase()}
                </h2>
                <p className="mt-3 text-sm leading-relaxed sm:text-base">
                  {post.frontmatter.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span key={tag} className="border border-ink bg-secondary px-2 py-0.5 font-mono text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Panel>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
