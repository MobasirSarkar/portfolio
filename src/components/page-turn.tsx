"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { SpeedLines } from "@/components/manga/speed-lines";
import { SfxText } from "@/components/manga/sfx-text";
import { gsap, useGSAP } from "@/lib/gsap";
import { useUiStore } from "@/store/ui";

/**
 * Full-screen manga page-flip wipe. Mounted once in the root layout;
 * plays whenever the ui store's `turnTo` is set, navigating mid-wipe.
 */
export function PageTurn() {
  const turnTo = useUiStore((s) => s.turnTo);
  const endTurn = useUiStore((s) => s.endTurn);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !turnTo) return;

      const go = () => {
        if (turnTo.startsWith("/#")) {
          const target = document.getElementById(turnTo.slice(2));
          if (target) {
            target.scrollIntoView({ behavior: "instant", block: "start" });
            return;
          }
        }
        router.push(turnTo);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        go();
        endTurn();
        return;
      }

      const tl = gsap.timeline({ onComplete: endTurn });
      tl.set(el, { autoAlpha: 1 })
        .fromTo(
          ".turn-electric",
          { xPercent: -160 },
          { xPercent: 0, duration: 0.32, ease: "power3.in" },
        )
        .fromTo(
          ".turn-ink",
          { xPercent: -160 },
          { xPercent: 0, duration: 0.32, ease: "power3.in" },
          0.06,
        )
        .from(".turn-sfx", { scale: 0, rotate: -20, duration: 0.25, ease: "back.out(3)" })
        .add(go, "+=0.05")
        .to(".turn-ink", { xPercent: 160, duration: 0.4, ease: "power3.out" }, "+=0.15")
        .to(".turn-electric", { xPercent: 160, duration: 0.4, ease: "power3.out" }, "<0.06")
        .set(el, { autoAlpha: 0 });
    },
    { scope: ref, dependencies: [turnTo] },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none invisible fixed inset-0 z-[90] overflow-hidden opacity-0"
    >
      <div className="turn-electric absolute inset-y-0 -left-[25%] w-[150%] -skew-x-12 bg-electric" />
      <div className="turn-ink absolute inset-y-0 -left-[25%] w-[150%] -skew-x-12 bg-ink">
        <div className="absolute inset-0 opacity-25">
          <SpeedLines count={48} className="[&_line]:stroke-paper" />
        </div>
        <div className="turn-sfx absolute inset-0 flex items-center justify-center">
          <SfxText className="text-6xl text-paper text-stroke-thin sm:text-7xl">
            FLIP!
          </SfxText>
        </div>
      </div>
    </div>
  );
}
