import { z } from "zod";

const fontRoleSchema = z.object({
  family: z.string().min(1),
  cssVariable: z.string().startsWith("--"),
  weights: z.array(z.string().regex(/^\d{3}$/)),
  role: z.string().min(1),
});

export const fontsSchema = z.object({
  display: fontRoleSchema,
  body: fontRoleSchema,
  mono: fontRoleSchema,
});

export const siteSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.url(),
  nav: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().startsWith("/"),
    }),
  ),
  socials: z.array(
    z.object({
      label: z.string().min(1),
      href: z.url(),
      icon: z.enum(["github", "linkedin", "email"]),
    }),
  ),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  heroName: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.array(z.string().min(1)).min(1),
  email: z.email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  yearsOfExperience: z.string().min(1),
  resume: z.string().startsWith("/").endsWith(".pdf"),
  education: z.object({
    degree: z.string().min(1),
    institution: z.string().min(1),
    location: z.string().min(1),
  }),
});

export const skillsSchema = z.array(
  z.object({
    label: z.string().min(1),
    skills: z.array(
      z.object({
        name: z.string().min(1),
        icon: z.string().startsWith("Si"),
        color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      }),
    ),
  }),
);

export const experienceSchema = z.array(
  z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    period: z.string().min(1),
    location: z.string().min(1),
    stack: z.array(z.string().min(1)),
    highlights: z.array(z.string().min(1)).min(1),
    sfx: z.string().min(1),
  }),
);

export const projectsSchema = z.array(
  z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    tagline: z.string().min(1),
    description: z.array(z.string().min(1)).min(1),
    tech: z.array(z.string().min(1)).min(1),
    video: z.string().startsWith("/videos/").nullable(),
    poster: z.string().startsWith("/").nullable(),
    links: z.object({
      live: z.url().optional(),
      github: z.url().optional(),
    }),
    sfx: z.string().min(1),
  }),
);

export const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.iso.date(),
  tags: z.array(z.string().min(1)).default([]),
});

export type Fonts = z.infer<typeof fontsSchema>;
export type Site = z.infer<typeof siteSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Projects = z.infer<typeof projectsSchema>;
export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
