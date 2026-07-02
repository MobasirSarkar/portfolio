import { Bangers, Comic_Neue, JetBrains_Mono } from "next/font/google";

import fontsJson from "../../content/fonts.json";
import { fontsSchema } from "@/lib/schemas";

// next/font requires statically analyzable calls, so the loaders live here;
// content/fonts.json declares the same roles/variables and is validated at
// build time so the two can never silently drift.
export const fonts = fontsSchema.parse(fontsJson);

export const displayFont = Bangers({
  variable: "--font-bangers",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const bodyFont = Comic_Neue({
  variable: "--font-comic",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const monoFont = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
