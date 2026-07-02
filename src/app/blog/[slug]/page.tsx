import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";

import { Nav } from "@/components/nav";
import { InkDivider } from "@/components/manga/ink-divider";
import { mdxComponents } from "@/components/mdx-components";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-display text-sm tracking-[0.2em] transition-colors hover:text-electric"
        >
          <ArrowLeft className="size-4" /> BACK TO EXTRAS
        </Link>

        <header className="mt-8">
          <p className="font-display text-sm tracking-[0.3em] text-electric-deep">
            {post.frontmatter.date}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight tracking-wide sm:text-5xl">
            {post.frontmatter.title.toUpperCase()}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span key={tag} className="border border-ink bg-secondary px-2 py-0.5 font-mono text-xs">
                #{tag}
              </span>
            ))}
          </div>
          <InkDivider className="mt-8" />
        </header>

        <article className="mt-10">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>
      </main>
    </>
  );
}
