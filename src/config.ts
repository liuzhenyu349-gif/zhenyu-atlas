import type { NavBarLink, SocialLink, Identity, AboutPageContent, ProjectPageContent, BlogPageContent, HomePageContent } from "./types/config";

export const identity: Identity = {
  name: "Zhenyu Liu",
  brand: "Zhenyu Atlas",
  logo: "/zhenyu-atlas-mark.png",
  hero: "/zhenyu-atlas-hero.png",
  email: "17737263955@163.com",
};

export const navBarLinks: NavBarLink[] = [
  { title: "Work", url: "/projects" },
  { title: "About", url: "/about" },
  { title: "Journey", url: "/blog" },
  { title: "Contact", url: "mailto:17737263955@163.com" },
];

export const socialLinks: SocialLink[] = [
  { title: "GitHub", url: "https://github.com/liuzhenyu349-gif", icon: "mdi:github", external: true },
  { title: "Email", url: "mailto:17737263955@163.com", icon: "mdi:email" },
];

export const homePageContent: HomePageContent = {
  seo: { title: "Zhenyu Atlas · Surveying, GIS, Python & AI", description: "A personal atlas of projects, experiments and ideas by Zhenyu Liu — from coordinates and maps to code and artificial intelligence.", image: identity.hero },
  role: "Surveying Engineering · GIS · Python · AI",
  description: "A personal atlas of projects, experiments and ideas — from coordinates and maps to code and artificial intelligence.",
  socialLinks,
  links: [{ title: "Explore my work", url: "/projects" }],
};

export const aboutPageContent: AboutPageContent = {
  seo: { title: "About · Zhenyu Atlas", description: "About Zhenyu Liu, a Surveying Engineering undergraduate exploring GIS, Python, AI and software development.", image: identity.logo },
  subtitle: "Maps are where I started. Code is where I'm going.",
  about: {
    description: `I'm an undergraduate student majoring in Surveying Engineering. I am learning how maps, coordinates and spatial thinking can meet Python, AI and software development.<br/><br/>Zhenyu Atlas is not a finished résumé. It is a living record of practical experiments, honest progress and the work still ahead.`,
    image_l: { url: identity.logo, alt: "Zhenyu Atlas monogram" },
    image_r: { url: identity.hero, alt: "Zhenyu Atlas golden cartographic artwork" },
  },
  work: { description: "My current focus is connecting Surveying Engineering with programming, AI tools and practical software workflows.", items: [{ title: "Undergraduate Student", company: { name: "Surveying Engineering", image: identity.logo }, date: "Current" }] },
  connect: { description: "I’m open to learning, exchanging ideas and connecting with people working in surveying, GIS, Python, AI or software development.", links: socialLinks },
};

export const projectsPageContent: ProjectPageContent = {
  seo: { title: "Selected Work · Zhenyu Atlas", description: "GIS and surveying prototypes by Zhenyu Liu.", image: identity.hero },
  subtitle: "Practical prototypes where spatial thinking meets software.",
  projects: [
    { title: "Survey Data Quality Inspector", description: "A Python web tool that turns fourth-order leveling data into route calculations, quality status, anomaly reports and interactive charts, with explicit limits for learning and assisted checking.", image: "/project-previews/survey-data-inspector.png", year: "2026", field: "Surveying · Python", status: "Prototype", url: "/projects/survey-data-inspector/" },
    { title: "Campus Facilities Explorer", description: "An interactive campus sketch built from simulated facility records. Search and filter places, then compare straight-line distances from a sample location; opening labels use demonstration schedules.", image: "/project-previews/campus-facilities.png", previewNote: "Earlier preview · Open updated demo ↗", year: "2026", field: "GIS · Spatial Data", status: "Prototype", url: "/projects/campus-facilities/" },
    { title: "Trajectory Replay Prototype", description: "A replay of synthetic timestamped points with example coordinates, estimated point-to-point distance, preset speed values and simple stop and sampling-gap checks.", image: "/project-previews/trajectory-visualizer.png", previewNote: "Earlier preview · Open updated demo ↗", year: "2026", field: "Surveying · Data", status: "Prototype", url: "/projects/trajectory-visualizer/" },
  ],
};

export const blogPageContent: BlogPageContent = {
  seo: { title: "Journey · Zhenyu Atlas", description: "Learning notes, experiments and growth records from Zhenyu Liu.", image: identity.logo },
  subtitle: "An honest archive of learning, building and becoming.",
};
