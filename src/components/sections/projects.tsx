"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { ChapterHeading } from "@/components/manga/chapter-heading";
import { SfxText } from "@/components/manga/sfx-text";
import { SpeedLines } from "@/components/manga/speed-lines";
import { Reveal } from "@/components/reveal";
import { StackChip } from "@/components/stack-chip";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/content";
import type { Projects as ProjectsData } from "@/lib/schemas";

function ProjectMedia({ project }: { project: ProjectsData[number] }) {
  if (project.video) {
    return (
      <video
        className="h-full w-full object-cover"
        src={project.video}
        poster={project.poster ?? undefined}
        muted
        loop
        playsInline
        autoPlay
        aria-label={`${project.name} demo video`}
      />
    );
  }
  if (project.poster) {
    return (
      <div className="relative h-full min-h-56 w-full halftone">
        <Image
          src={project.poster}
          alt={`${project.name} screenshot`}
          fill
          loading="eager"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
    );
  }
  return (
    <div className="relative flex h-full min-h-56 w-full items-center justify-center overflow-hidden halftone-lg">
      <div className="absolute inset-0 opacity-20">
        <SpeedLines count={40} />
      </div>
      <SfxText className="relative -rotate-6 text-4xl text-electric text-stroke-ink sm:text-5xl">
        DEMO SOON!
      </SfxText>
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction * 320,
    opacity: 0,
    rotate: direction * 2,
  }),
  center: { x: 0, opacity: 1, rotate: 0 },
  exit: (direction: number) => ({
    x: direction * -320,
    opacity: 0,
    rotate: direction * -2,
  }),
};

export function Projects() {
  const [[index, direction], setPage] = useState([0, 0]);
  const count = projects.length;
  const project = projects[index];

  const paginate = (delta: number) =>
    setPage(([current]) => [(current + delta + count) % count, delta]);

  return (
    <section id="projects" className="scroll-mt-24 px-4 py-24 sm:px-6 md:py-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal from="wipe">
          <ChapterHeading
            number="04"
            title="FEATURED BATTLES"
            subtitle="Projects worth telling stories about"
          />
        </Reveal>

        <Reveal from="bottom" className="mt-16 md:mt-6">
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.article
                key={project.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative border-4 border-ink bg-paper panel-shadow"
              >
                <SfxText className="absolute -top-6 right-6 z-10 rotate-6 text-4xl text-electric text-stroke-thin sm:text-5xl">
                  {project.sfx}
                </SfxText>

                <div className="grid md:grid-cols-2">
                  <div className="border-b-4 border-ink md:border-r-4 md:border-b-0">
                    <ProjectMedia project={project} />
                  </div>

                  <div className="flex flex-col p-6 sm:p-8 md:p-6">
                    <p className="font-display text-sm tracking-[0.25em] text-electric-deep">
                      {project.tagline.toUpperCase()}
                    </p>
                    <h3 className="mt-1 font-display text-4xl tracking-wide">
                      {project.name.toUpperCase()}
                    </h3>

                    {/* long descriptions scroll inside the panel in book mode
                        instead of overflowing the page */}
                    <div className="panel-scroll mt-4 flex flex-col gap-3 md:max-h-[max(88px,calc(100svh-628px))] md:overflow-y-auto md:pr-2">
                      {project.description.map((paragraph, j) => (
                        <p key={j} className="text-sm leading-relaxed sm:text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <StackChip key={tech} name={tech} />
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      {project.links.github && (
                        <Button asChild variant="outline" className="border-2 border-ink font-bold">
                          <a href={project.links.github} target="_blank" rel="noreferrer">
                            <FaGithub /> Code
                          </a>
                        </Button>
                      )}
                      {project.links.live && (
                        <Button
                          asChild
                          className="border-2 border-ink bg-electric font-bold text-ink hover:bg-electric-deep hover:text-paper"
                        >
                          <a href={project.links.live} target="_blank" rel="noreferrer">
                            <ExternalLink /> Live
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {count > 1 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              <motion.button
                type="button"
                aria-label="Previous project"
                onClick={() => paginate(-1)}
                className="flex items-center gap-1 border-2 border-ink bg-paper px-4 py-2 font-display text-sm tracking-widest panel-shadow-sm hover:bg-electric"
                whileHover={{ scale: 1.06, rotate: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                <ChevronLeft className="size-4" strokeWidth={3} /> PREV
              </motion.button>

              <span aria-live="polite" className="font-mono text-sm font-bold">
                {index + 1} / {count}
              </span>

              <motion.button
                type="button"
                aria-label="Next project"
                onClick={() => paginate(1)}
                className="flex items-center gap-1 border-2 border-ink bg-paper px-4 py-2 font-display text-sm tracking-widest panel-shadow-sm hover:bg-electric"
                whileHover={{ scale: 1.06, rotate: 2 }}
                whileTap={{ scale: 0.94 }}
              >
                NEXT <ChevronRight className="size-4" strokeWidth={3} />
              </motion.button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
