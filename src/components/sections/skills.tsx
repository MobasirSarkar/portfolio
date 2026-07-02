"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  SiGo,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiGnubash,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiHtml5,
  SiCss,
  SiSass,
  SiTailwindcss,
  SiGin,
  SiNodedotjs,
  SiFlask,
  SiNestjs,
  SiGraphql,
  SiSocketdotio,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiJenkins,
  SiNginx,
  SiFirebase,
  SiLinux,
  SiGit,
} from "react-icons/si";

import { ChapterHeading } from "@/components/manga/chapter-heading";
import { Panel } from "@/components/manga/panel";
import { Reveal } from "@/components/reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { skills } from "@/lib/content";

const iconMap: Record<string, IconType> = {
  SiGo,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiGnubash,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiHtml5,
  SiCss,
  SiSass,
  SiTailwindcss,
  SiGin,
  SiNodedotjs,
  SiFlask,
  SiNestjs,
  SiGraphql,
  SiSocketdotio,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiJenkins,
  SiNginx,
  SiFirebase,
  SiLinux,
  SiGit,
};

export function Skills() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".skill-grid").forEach((grid) => {
          gsap.from(grid.querySelectorAll(".skill-sticker"), {
            opacity: 0,
            scale: 0,
            rotate: () => gsap.utils.random(-15, 15),
            duration: 0.45,
            stagger: 0.05,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: grid, start: "top 85%" },
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(".skill-sticker", {
          opacity: 0,
          duration: 0.5,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="skills"
      ref={ref}
      className="relative scroll-mt-24 border-y-4 border-ink bg-ink py-24"
    >
      <div aria-hidden className="halftone-electric absolute inset-x-0 top-0 h-24 opacity-40" />
      <div className="mx-auto max-w-6xl px-4 text-paper sm:px-6">
        <Reveal from="wipe">
          <ChapterHeading number="02" title="SKILL TREE" subtitle="Abilities unlocked so far" />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {skills.map((category) => (
            <Panel key={category.label} className="p-6" shadow="electric">
              <h3 className="mb-5 inline-block border-b-4 border-electric font-display text-2xl tracking-wide">
                {category.label.toUpperCase()}
              </h3>
              <div className="skill-grid flex flex-wrap gap-3">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon];
                  if (!Icon) return null;
                  return (
                    <motion.div
                      key={skill.name}
                      title={skill.name}
                      className="skill-sticker group relative flex size-14 items-center justify-center border-2 border-ink bg-paper panel-shadow-sm sm:size-16"
                      whileHover={{ scale: 1.15, rotate: -5, y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <Icon
                        role="img"
                        aria-label={skill.name}
                        className="size-7 sm:size-8"
                        style={{ color: skill.color }}
                      />
                      <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 border border-ink bg-ink px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-paper opacity-0 transition-opacity group-hover:opacity-100">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
