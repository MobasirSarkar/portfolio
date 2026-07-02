"use client";

import { useRef } from "react";

import { useBook } from "@/components/manga-book";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  from?: "left" | "right" | "bottom" | "wipe";
  delay?: number;
};

/**
 * Scroll-triggered panel entrance. In horizontal book mode triggers are
 * measured along the book's x tween; degrades to a plain fade under
 * prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  from = "bottom",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const book = useBook();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const wipeVars = {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.9,
        delay,
        ease: "power3.inOut",
      } as const;
      const slideVars = {
        opacity: 0,
        x: from === "left" ? -70 : from === "right" ? 70 : 0,
        y: from === "bottom" ? 70 : 0,
        rotate: from === "left" ? -2 : from === "right" ? 2 : 0,
        duration: 0.85,
        delay,
        ease: "power3.out",
      } as const;

      if (book) {
        const scrollTrigger = {
          trigger: el,
          containerAnimation: book,
          start: "left 85%",
        };
        if (from === "wipe") {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", opacity: 1 },
            { ...wipeVars, scrollTrigger },
          );
          return;
        }
        gsap.from(el, { ...slideVars, scrollTrigger });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(el, {
          opacity: 0,
          duration: 0.5,
          delay,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: el, start: "top 85%" };
        if (from === "wipe") {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", opacity: 1 },
            { ...wipeVars, scrollTrigger },
          );
          return;
        }
        gsap.from(el, { ...slideVars, scrollTrigger });
      });
    },
    { scope: ref, dependencies: [book], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
