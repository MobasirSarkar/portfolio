"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown, Download, MapPin, Zap } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { IconType } from "react-icons";

import { SpeedLines } from "@/components/manga/speed-lines";
import { SpeechBubble } from "@/components/manga/speech-bubble";
import { SfxText } from "@/components/manga/sfx-text";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile, site, skills } from "@/lib/content";
import { skillIconMap } from "@/lib/icon-map";
import { useUiStore } from "@/store/ui";

const socialIcons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

const coverSocials = site.socials.filter((s) => s.icon !== "email");

// quick-glance loadout for the cover — names come from profile.json heroTech,
// icon/color resolved from skills.json (content.ts fails the build on unknown names)
const allSkills = skills.flatMap((category) => category.skills);
const heroTech = profile.heroTech
  .map((name) => allSkills.find((skill) => skill.name === name))
  .filter((skill): skill is (typeof allSkills)[number] => skill !== undefined);

export function Cover() {
  const ref = useRef<HTMLElement>(null);
  const startTurn = useUiStore((s) => s.startTurn);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from("[data-cover-item]", {
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".cover-lines", { opacity: 0, scale: 1.25, duration: 0.9 })
          .from(
            ".hero-letter",
            {
              opacity: 0,
              scale: 2.6,
              rotate: 8,
              duration: 0.55,
              stagger: 0.07,
              ease: "back.out(2)",
            },
            "-=0.4",
          )
          .from(
            ".cover-banner",
            { xPercent: -120, opacity: 0, duration: 0.5 },
            "-=0.2",
          )
          .from(
            ".cover-bubble",
            {
              scale: 0,
              opacity: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.5)",
            },
            "-=0.1",
          )
          .from(
            ".cover-sfx",
            { opacity: 0, scale: 0, stagger: 0.08, ease: "back.out(3)" },
            "<",
          )
          .from(".cover-cue", { opacity: 0, y: -10 });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden border-b-4 border-ink px-4 pt-16"
    >
      {/* screentone corners */}
      <div
        aria-hidden
        className="halftone-lg absolute top-0 left-0 h-48 w-48 mask-[linear-gradient(135deg,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="halftone-lg absolute right-0 bottom-0 h-48 w-48 mask-[linear-gradient(-45deg,black,transparent_70%)]"
      />

      <div className="cover-lines absolute inset-0 opacity-30">
        <SpeedLines />
      </div>

      <SfxText className="cover-sfx absolute top-24 left-[8%] hidden -rotate-12 text-4xl text-electric md:block">
        ドン!
      </SfxText>
      <SfxText className="cover-sfx absolute right-[10%] bottom-32 hidden rotate-6 text-4xl text-stroke-ink text-paper md:block">
        BOOM!
      </SfxText>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          data-cover-item
          className="cover-banner mb-4 -skew-x-6 border-2 border-ink bg-electric px-4 py-1"
        >
          <p className="skew-x-6 font-bold text-xs tracking-[0.35em] text-ink sm:text-sm">
            A DEVELOPER STORY — VOL. 1
          </p>
        </div>

        <h1
          data-cover-item
          className="font-display text-[clamp(4rem,18vw,11rem)] leading-[0.9] tracking-wide"
          aria-label={profile.name}
        >
          {profile.heroName.split("").map((ch, i) => (
            <span key={i} aria-hidden className="hero-letter inline-block">
              {ch}
            </span>
          ))}
        </h1>

        <div
          data-cover-item
          className="cover-banner mt-2 border-4 border-ink bg-ink px-6 py-2 panel-shadow-electric"
        >
          <p className="font-display text-xl tracking-[0.25em] text-paper sm:text-2xl">
            {profile.title.toUpperCase()}
          </p>
        </div>

        <div data-cover-item className="cover-bubble mt-8 max-w-md">
          <SpeechBubble tail="left">
            <p className="font-bold text-base sm:text-lg">{profile.tagline}</p>
          </SpeechBubble>
        </div>

        {/* main weapons — quick-glance tech */}
        <div data-cover-item className="cover-bubble mt-7 flex items-center gap-2">
          <span className="hidden font-display text-xs tracking-[0.25em] text-ink/60 sm:block">
            MAIN WEAPONS
          </span>
          <div className="flex flex-wrap justify-center gap-1.5">
            {heroTech.map((skill) => {
              const Icon = skillIconMap[skill.icon];
              if (!Icon) return null;
              return (
                <motion.span
                  key={skill.name}
                  title={skill.name}
                  className="flex size-9 items-center justify-center border-2 border-ink bg-paper panel-shadow-sm"
                  whileHover={{ scale: 1.2, rotate: -6, y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Icon role="img" aria-label={skill.name} className="size-5" style={{ color: skill.color }} />
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div data-cover-item className="cover-bubble mt-7 flex items-center gap-3">
          <motion.a
            href={profile.resume}
            download
            className="flex items-center gap-2 border-4 border-ink bg-electric px-5 py-2.5 font-display text-sm tracking-[0.2em] text-ink panel-shadow"
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="size-4" strokeWidth={3} />
            DOWNLOAD RESUME
          </motion.a>
          {coverSocials.map((social) => {
            const Icon = socialIcons[social.icon];
            if (!Icon) return null;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex size-11 items-center justify-center border-4 border-ink bg-paper text-ink panel-shadow-sm"
                whileHover={{ scale: 1.12, rotate: 5, backgroundColor: "#00b4d8" }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon className="size-5" />
              </motion.a>
            );
          })}
        </div>

        {/* status strip */}
        <div
          data-cover-item
          className="cover-banner mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] font-bold tracking-wider sm:text-xs"
        >
          <span className="flex items-center gap-1.5">
            <Zap className="size-3.5 text-electric" />
            {profile.yearsOfExperience} YEARS EXP
          </span>
          <span aria-hidden className="rotate-45 border border-ink bg-electric p-0.75" />
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-electric" />
            {profile.location.toUpperCase()}
          </span>
          <span aria-hidden className="rotate-45 border border-ink bg-electric p-0.75" />
          <span className="flex items-center gap-1.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-electric opacity-75" />
              <span className="relative inline-flex size-2.5 border border-ink bg-electric" />
            </span>
            OPEN TO NEW ARCS
          </span>
        </div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          startTurn("/#about");
        }}
        data-cover-item
        className="cover-cue absolute bottom-6 flex flex-col items-center gap-1 font-display text-sm tracking-[0.3em]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        TURN PAGE
        <ChevronDown className="size-5" />
      </motion.a>
    </section>
  );
}
