"use client";

import { ChapterHeading } from "@/components/manga/chapter-heading";
import { Panel } from "@/components/manga/panel";
import { SfxText } from "@/components/manga/sfx-text";
import { Reveal } from "@/components/reveal";
import { StackChip } from "@/components/stack-chip";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <>
      {experience.map((job, i) => {
        const onLeft = i % 2 === 0;
        return (
          <section
            key={job.company}
            id={i === 0 ? "experience" : undefined}
            className="scroll-mt-24 px-4 py-24 sm:px-6 md:py-8"
          >
            <div className="mx-auto w-full max-w-4xl">
              {/* repeat chapter heading only on book pages, not in the mobile stack */}
              <Reveal from="wipe" className={i > 0 ? "hidden md:block" : ""}>
                <ChapterHeading
                  number="03"
                  title="STORY ARCS"
                  subtitle={`The journey so far — ${i + 1} of ${experience.length}`}
                />
              </Reveal>

              <Reveal from={onLeft ? "left" : "right"} className="mt-12 md:mt-6">
                <Panel tilt={onLeft ? "left" : "right"} className="p-6 sm:p-8">
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

                  {/* long job histories scroll inside the panel in book mode
                      instead of overflowing the page */}
                  <ul className="panel-scroll mt-4 flex flex-col gap-2 md:max-h-[30svh] md:overflow-y-auto md:pr-2">
                    {job.highlights.map((highlight, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed">
                        <span aria-hidden className="mt-1.5 size-2 shrink-0 rotate-45 bg-ink" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <StackChip key={tech} name={tech} />
                    ))}
                  </div>
                </Panel>
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}
