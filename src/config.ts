import type {
  NavBarLink,
  SocialLink,
  Identity,
  AboutPageContent,
  ProjectPageContent,
  BlogPageContent,
  HomePageContent,
} from "./types/config";

export const identity: Identity = {
  name: "Zhenyu Liu",
  logo: "/profile.jpg",
  email: "17737263955@163.com",
};

export const navBarLinks: NavBarLink[] = [
  { title: "首页", url: "/" },
  { title: "关于", url: "/about" },
  { title: "作品", url: "/projects" },
  { title: "成长记录", url: "/blog" },
];

export const socialLinks: SocialLink[] = [
  {
    title: "GitHub",
    url: "https://github.com/liuzhenyu349-gif",
    icon: "mdi:github",
    external: true,
  },
  {
    title: "邮箱",
    url: "mailto:17737263955@163.com",
    icon: "mdi:email",
  },
];

export const homePageContent: HomePageContent = {
  seo: {
    title: "Zhenyu Liu · Learning & Projects",
    description: "Surveying Engineering student exploring Python, AI and software development.",
    image: identity.logo,
  },
  role: "Surveying Engineering Student",
  description:
    "Surveying Engineering student exploring Python, AI and software development. This is where I document what I learn, what I build and how I grow.",
  socialLinks,
  links: [
    { title: "查看成长方向", url: "/projects" },
    { title: "了解我", url: "/about" },
  ],
};

export const aboutPageContent: AboutPageContent = {
  seo: {
    title: "About · Zhenyu Liu",
    description: "About Zhenyu Liu, a Surveying Engineering undergraduate exploring Python, AI and software development.",
    image: identity.logo,
  },
  subtitle: "Learning in public, one practical project at a time",
  about: {
    description: `I'm an undergraduate student majoring in Surveying Engineering. I'm currently learning Python, AI tools and software development, while building practical projects and documenting my growth along the way.
<br/><br/>
This website is not a finished résumé. It is a living record of my learning, experiments and future work.`,
    image_l: { url: "/profile.jpg", alt: "Zhenyu Liu outdoors in the mountains" },
    image_r: { url: "/profile.jpg", alt: "Zhenyu Liu profile photograph" },
  },
  work: {
    description: `My current focus is connecting Surveying Engineering with programming, AI tools and practical software workflows.`,
    items: [
      {
        title: "Undergraduate Student",
        company: { name: "Surveying Engineering", image: "/profile.jpg" },
        date: "Current",
      },
    ],
  },
  connect: {
    description: `I'm open to learning, exchanging ideas and connecting with people working in surveying, Python, AI or software development.`,
    links: socialLinks,
  },
};

export const projectsPageContent: ProjectPageContent = {
  seo: {
    title: "Learning & Projects · Zhenyu Liu",
    description: "Current learning directions and future projects by Zhenyu Liu.",
    image: identity.logo,
  },
  subtitle: "My growth areas and the projects I plan to build",
  projects: [
    {
      title: "Campus Facilities Management System",
      description: "An interactive campus GIS prototype with eight clickable facilities, category filters, keyword search, facility details, opening status and coordinate display.",
      year: "2026",
      status: "Prototype",
      url: "/projects/campus-facilities/",
    },
    {
      title: "Real-time Trajectory Visualizer",
      description: "A surveying-oriented trajectory replay prototype with playback controls, speed adjustment, timeline scrubbing and live coordinate, distance and progress statistics.",
      year: "2026",
      status: "Prototype",
      url: "/projects/trajectory-visualizer/",
    },
    {
      title: "Personal Portfolio",
      description: "My personal portfolio website for showcasing projects, learning progress and future work.",
      year: "2026",
      status: "Coming Soon",
    },
    {
      title: "Python Learning Projects",
      description: "Small Python programs and exercises created during my Python learning journey.",
      year: "2026",
      status: "Coming Soon",
    },
    {
      title: "AI Learning & Workflow",
      description: "My experiments with AI tools, prompting, Codex and AI-assisted workflows.",
      year: "2026",
      status: "Coming Soon",
    },
    {
      title: "Surveying Projects",
      description: "Course projects, fieldwork and technical notes related to Surveying Engineering.",
      year: "2026",
      status: "Coming Soon",
    },
  ],
};

export const blogPageContent: BlogPageContent = {
  seo: {
    title: "Growth Log · Zhenyu Liu",
    description: "Learning notes and growth records from Zhenyu Liu.",
    image: identity.logo,
  },
  subtitle: "Learning notes, experiments and progress — coming soon",
};
