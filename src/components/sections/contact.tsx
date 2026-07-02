"use client";

import { motion } from "motion/react";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import type { IconType } from "react-icons";

import { ChapterHeading } from "@/components/manga/chapter-heading";
import { SpeechBubble } from "@/components/manga/speech-bubble";
import { SfxText } from "@/components/manga/sfx-text";
import { InkDivider } from "@/components/manga/ink-divider";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { site, profile } from "@/lib/content";

const socialIcons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  email: FaEnvelope,
};

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t-4 border-ink bg-ink pt-24 text-paper">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <Reveal from="wipe">
          <ChapterHeading number="05" title="NEXT CHAPTER?" />
        </Reveal>

        <Reveal from="bottom" className="mt-12 max-w-lg">
          <SpeechBubble variant="shout" tail="none" className="bg-paper text-ink">
            <p className="font-bold text-lg sm:text-xl">
              {`Looking for a ${profile.title.toLowerCase()} to join your story? Let's write it together.`}
            </p>
          </SpeechBubble>
        </Reveal>

        <Reveal from="bottom" delay={0.15} className="mt-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Button
              asChild
              size="lg"
              className="h-14 border-4 border-paper bg-electric px-8 font-display text-xl tracking-wider text-ink hover:bg-paper"
            >
              <a href={`mailto:${profile.email}`}>SEND A SIGNAL!</a>
            </Button>
          </motion.div>
        </Reveal>

        <Reveal from="bottom" delay={0.25} className="mt-8">
          <div className="flex gap-4">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.icon === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-12 items-center justify-center border-2 border-paper bg-ink text-paper"
                  whileHover={{ scale: 1.15, rotate: -6, backgroundColor: "#00b4d8", color: "#0a0a0a" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Icon className="size-5" />
                </motion.a>
              );
            })}
          </div>
        </Reveal>

        <SfxText className="mt-12 text-2xl text-paper/20">つづく…</SfxText>
      </div>

      <footer className="mt-16 border-t border-paper/20 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-xs text-paper/60 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name}. To be continued…
          </p>
          <p className="font-mono">Drawn with Next.js + GSAP</p>
        </div>
      </footer>
      <InkDivider className="rotate-180 text-paper" />
    </section>
  );
}
