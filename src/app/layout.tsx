import type { Metadata } from "next";
import "./globals.css";

import { fontVariables } from "@/lib/fonts";
import { site, profile } from "@/lib/content";
import { PageTurn } from "@/components/page-turn";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: profile.heroName,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-paper text-ink">
        {children}
        <PageTurn />
      </body>
    </html>
  );
}
