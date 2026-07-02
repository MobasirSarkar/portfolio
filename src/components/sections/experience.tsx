"use client";

import { ChapterHeading } from "@/components/manga/chapter-heading";
import { Panel } from "@/components/manga/panel";
import { SfxText } from "@/components/manga/sfx-text";
import { Reveal } from "@/components/reveal";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <Reveal from="wipe">
        <ChapterHeading number="03" title="STORY ARCS" subtitle="The journey so far" />
      </Reveal>

      <div className="relative mt-16">
        {/* central ink timeline */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-1 bg-ink md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="flex flex-col gap-16">
          {experience.map((job, i) => {
            const onLeft = i % 2 === 0;
            return (
              <li key={job.company} className="relative">
                {/* timeline node */}
                <div
                  aria-hidden
                  className="absolute top-8 left-4 size-5 -translate-x-1/2 rotate-45 border-4 border-ink bg-electric md:left-1/2"
                />
                <Reveal
                  from={onLeft ? "left" : "right"}
                  className={
                    "pl-12 md:w-[calc(50%-2.5rem)] md:pl-0 " +
                    (onLeft ? "md:mr-auto" : "md:ml-auto")
                  }
                >
                  <Panel tilt={onLeft ? "left" : "right"} className="p-6">
                    <SfxText className="absolute -top-5 -right-3 rotate-6 text-3xl text-electric text-stroke-thin">
                      {job.sfx}
                    </SfxText>

                    <p className="font-display text-sm tracking-[0.25em] text-electric-deep">
                      {job.period.toUpperCase()}
                    </p>
                    <h3 className="mt-1 font-display text-3xl tracking-wide">
                      {job.role.toUpperCase()}
                    </h3>
                    <p className="font-bold text-muted-foreground">
                      {job.company} · {job.location}
                    </p>

                    <ul className="mt-4 flex flex-col gap-2">
                      {job.highlights.map((highlight, j) => (
                        <li key={j} className="flex gap-2 text-sm leading-relaxed">
                          <span aria-hidden className="mt-1.5 size-2 shrink-0 rotate-45 bg-ink" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-ink bg-secondary px-2 py-0.5 font-mono text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Panel>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
