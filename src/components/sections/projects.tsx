"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { ChapterHeading } from "@/components/manga/chapter-heading";
import { SfxText } from "@/components/manga/sfx-text";
import { SpeedLines } from "@/components/manga/speed-lines";
import { Reveal } from "@/components/reveal";
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

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6"
    >
      <Reveal from="wipe">
        <ChapterHeading
          number="04"
          title="FEATURED BATTLES"
          subtitle="Projects worth telling stories about"
        />
      </Reveal>

      <div className="mt-16 flex flex-col gap-20">
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={project.id} from={flip ? "right" : "left"}>
              <motion.article
                className="relative border-4 border-ink bg-paper panel-shadow"
                whileHover={{ y: -6, boxShadow: "10px 12px 0 0 #00b4d8" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <SfxText className="absolute -top-6 right-6 z-10 rotate-6 text-4xl text-electric text-stroke-thin sm:text-5xl">
                  {project.sfx}
                </SfxText>

                <div
                  className={`grid md:grid-cols-2 ${flip ? "md:[direction:rtl]" : ""}`}
                >
                  <div className="border-b-4 border-ink [direction:ltr] md:border-b-0 md:border-e-4">
                    <ProjectMedia project={project} />
                  </div>

                  <div className="flex flex-col p-6 [direction:ltr] sm:p-8">
                    <p className="font-display text-sm tracking-[0.25em] text-electric-deep">
                      {project.tagline.toUpperCase()}
                    </p>
                    <h3 className="mt-1 font-display text-4xl tracking-wide">
                      {project.name.toUpperCase()}
                    </h3>

                    <div className="mt-4 flex flex-col gap-3">
                      {project.description.map((paragraph, j) => (
                        <p
                          key={j}
                          className="text-sm leading-relaxed sm:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="border border-ink bg-secondary px-2 py-0.5 font-mono text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      {project.links.github && (
                        <Button
                          asChild
                          variant="outline"
                          className="border-2 border-ink font-bold"
                        >
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FaGithub /> Code
                          </a>
                        </Button>
                      )}
                      {project.links.live && (
                        <Button
                          asChild
                          className="border-2 border-ink bg-electric font-bold text-ink hover:bg-electric-deep hover:text-paper"
                        >
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLink /> Live
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
