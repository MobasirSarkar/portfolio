import { MangaBook } from "@/components/manga-book";
import { Nav } from "@/components/nav";
import { Cover } from "@/components/sections/cover";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <MangaBook>
        <Cover />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </MangaBook>
    </>
  );
}
