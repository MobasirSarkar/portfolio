"use client";

import { createContext, useContext, useRef, useState } from "react";

import { gsap, ScrollSmoother, useGSAP, type ScrollTrigger } from "@/lib/gsap";

const BookContext = createContext<gsap.core.Tween | null>(null);

/** The horizontal page-flip tween when book mode is active, null in vertical mode. */
export function useBook() {
  return useContext(BookContext);
}

let seekFn: ((id: string) => boolean) | null = null;

/** Jump the book to the page containing #id. Returns false when not in book mode. */
export function bookSeek(id: string): boolean {
  return seekFn ? seekFn(id) : false;
}

/**
 * Turns its children into manga pages: on md+ screens (without reduced
 * motion) vertical scrolling flips through full-viewport pages laid out on
 * the x axis, like reading a book. On small screens and under
 * prefers-reduced-motion it renders the normal vertical stack.
 */
export function MangaBook({ children }: { children: React.ReactNode }) {
  const smoothWrapRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const [horizontal, setHorizontal] = useState(false);
  const [tween, setTween] = useState<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // inertia-smoothed scrolling (Apple-style easing between wheel ticks);
    // touch devices keep native momentum scrolling
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: smoothWrapRef.current ?? undefined,
        content: smoothContentRef.current ?? undefined,
        smooth: 1.2,
        smoothTouch: false,
      });
      return () => smoother.kill();
    });

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        setHorizontal(true);
        return () => setHorizontal(false);
      },
    );
  });

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!horizontal || !wrap || !track) return;

      const distance = () => track.scrollWidth - window.innerWidth;
      const pages = track.children.length;

      const t = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            // snap from actual progress, not the velocity-projected value —
            // projection makes fast wheels and programmatic jumps skip pages
            snapTo: (value: number, self?: ScrollTrigger) =>
              Math.round((self?.progress ?? value) * (pages - 1)) / (pages - 1),
            duration: { min: 0.35, max: 0.8 },
            delay: 0.15,
            ease: "power2.inOut",
          },
        },
      });

      seekFn = (id) => {
        const target = document.getElementById(id);
        const st = t.scrollTrigger;
        if (!target || !st) return false;
        const index = Array.prototype.findIndex.call(
          track.children,
          (page: Element) => page.contains(target),
        );
        if (index < 0) return false;
        // animate instead of jumping: an instant jump reads as huge velocity
        // and the velocity-projected snap flings the book to its first/last page
        gsap.to(window, {
          scrollTo: st.start + (index / (pages - 1)) * (st.end - st.start),
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
        return true;
      };
      setTween(t);

      return () => {
        seekFn = null;
        setTween(null);
      };
    },
    { dependencies: [horizontal], revertOnUpdate: true },
  );

  return (
    /* outer pair = ScrollSmoother wrapper/content; the extra inner div is a
       stable parent for ScrollTrigger's pin, which re-parents its child into
       a .pin-spacer that must stay invisible to React's sibling bookkeeping */
    <div ref={smoothWrapRef}>
      <div ref={smoothContentRef}>
        <div>
          <div ref={wrapRef} className={horizontal ? "overflow-hidden" : undefined}>
            <main ref={trackRef} className={horizontal ? "book-track" : undefined}>
              <BookContext.Provider value={tween}>{children}</BookContext.Provider>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
