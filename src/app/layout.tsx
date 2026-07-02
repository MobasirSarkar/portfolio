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
    // overflow-x-clip on html: pre-animation Reveal offsets (x: ±70) widen the
    // document, and mobile browsers expand the layout viewport past body's
    // overflow-x-hidden — clipping must live on the root element
    <html lang="en" className={`${fontVariables} h-full overflow-x-clip antialiased`}>
      {/* keep body block-level: ScrollTrigger pin spacing is disabled inside flex parents */}
      <body className="min-h-full overflow-x-hidden bg-paper text-ink">
        {children}
        <PageTurn />
      </body>
    </html>
  );
}
