import Link from "next/link";

import { Nav } from "@/components/nav";
import { SpeedLines } from "@/components/manga/speed-lines";
import { SpeechBubble } from "@/components/manga/speech-bubble";
import { SfxText } from "@/components/manga/sfx-text";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-16">
        <div className="absolute inset-0 opacity-20">
          <SpeedLines />
        </div>
        <SfxText
          decorative={false}
          className="relative text-[clamp(6rem,25vw,14rem)] leading-none text-stroke-ink text-paper"
        >
          404
        </SfxText>
        <div className="relative mt-8 max-w-md">
          <SpeechBubble variant="shout" tail="none">
            <p className="font-bold text-lg">
              This page got lost between chapters!
            </p>
          </SpeechBubble>
        </div>
        <Button asChild className="relative mt-10 border-2 border-ink bg-electric font-display text-lg tracking-wider text-ink hover:bg-ink hover:text-paper">
          <Link href="/">BACK TO VOLUME 1</Link>
        </Button>
      </main>
    </>
  );
}
