"use client";

import { MapPin, GraduationCap, Zap } from "lucide-react";

import { ChapterHeading } from "@/components/manga/chapter-heading";
import { SpeechBubble } from "@/components/manga/speech-bubble";
import { Panel } from "@/components/manga/panel";
import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <Reveal from="wipe">
        <ChapterHeading number="01" title="ORIGIN STORY" subtitle="Who is this developer?" />
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-10">
          {profile.summary.map((paragraph, i) => (
            <Reveal key={i} from={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "md:ml-12" : "md:mr-12"}>
              <SpeechBubble tail={i % 2 === 0 ? "left" : "right"}>
                <p className="text-base leading-relaxed sm:text-lg">{paragraph}</p>
              </SpeechBubble>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <Reveal from="right">
            <Panel tilt="right" className="p-6">
              <div className="halftone absolute top-0 right-0 h-16 w-16" aria-hidden />
              <p className="font-display text-6xl text-electric">
                {profile.yearsOfExperience}
              </p>
              <p className="mt-1 font-bold text-sm tracking-wide">
                YEARS OF EXPERIENCE
              </p>
            </Panel>
          </Reveal>

          <Reveal from="right" delay={0.1}>
            <Panel tilt="left" className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 shrink-0 text-electric" />
                <p className="font-bold">{profile.location}</p>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Zap className="size-5 shrink-0 text-electric" />
                <p className="font-bold">Open to new arcs</p>
              </div>
            </Panel>
          </Reveal>

          <Reveal from="right" delay={0.2}>
            <Panel className="p-6">
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-1 size-5 shrink-0 text-electric" />
                <div>
                  <p className="font-bold">{profile.education.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.education.institution}, {profile.education.location}
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
