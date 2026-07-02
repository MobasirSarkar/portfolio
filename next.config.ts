import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = "";

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "";
  if (repo && !repo.endsWith(".github.io")) {
    basePath = `/${repo}`;
  }
}

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath || undefined,
  turbopack: { root: __dirname },
};

export default nextConfig;
