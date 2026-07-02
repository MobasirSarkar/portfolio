import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { blogFrontmatterSchema, type BlogFrontmatter } from "@/lib/schemas";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
};

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        frontmatter: blogFrontmatterSchema.parse(data),
        content,
      };
    })
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}
