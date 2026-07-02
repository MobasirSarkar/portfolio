import siteJson from "../../content/site.json";
import profileJson from "../../content/profile.json";
import skillsJson from "../../content/skills.json";
import experienceJson from "../../content/experience.json";
import projectsJson from "../../content/projects.json";

import {
  siteSchema,
  profileSchema,
  skillsSchema,
  experienceSchema,
  projectsSchema,
} from "@/lib/schemas";

// Parsed at build time — invalid content fails the static export.
export const site = siteSchema.parse(siteJson);
export const profile = profileSchema.parse(profileJson);
export const skills = skillsSchema.parse(skillsJson);
export const experience = experienceSchema.parse(experienceJson);
export const projects = projectsSchema.parse(projectsJson);

// cross-file check: every cover heroTech name must exist in skills.json
const skillNames = new Set(skills.flatMap((c) => c.skills.map((s) => s.name)));
const unknownHeroTech = profile.heroTech.filter((name) => !skillNames.has(name));
if (unknownHeroTech.length > 0) {
  throw new Error(
    `profile.json heroTech names missing from skills.json: ${unknownHeroTech.join(", ")}`,
  );
}
