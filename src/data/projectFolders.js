import projects from "./projects.js";

const projectFolders = [
  {
    id: "featured",
    slug: "featured",
    title: "Featured",
    description: null,
    projectIds: ["accept-all-cookies", "tech-jobs-dashboard", "profile-cards", "minaya-travel"],
    defaultOpen: true,
  },
  {
    id: "full-stack-and-apis",
    slug: "full-stack-and-apis",
    title: "Full Stack & APIs",
    description: null,
    projectIds: ["animal-crossing-api", "javascript-testing-practice", "harry-potter", "countries-explorer", "virtual-store", "tech-jobs-dashboard"],
    defaultOpen: false,
  },
  {
    id: "react-and-frontend",
    slug: "react-and-frontend",
    title: "React & Frontend",
    description: null,
    projectIds: ["memory-game", "dark-horoscope", "layout-design-exam", "math-workshop", "bat-magotchi", "pokemon-team", "minaya-travel"],
    defaultOpen: false,
  },
  {
    id: "testing-and-best-practices",
    slug: "testing-and-best-practices",
    title: "Testing & Best Practices",
    description: null,
    projectIds: ["react-testing-library", "javascript-testing-practice", "accept-all-cookies"],
    defaultOpen: false,
  },
  {
    id: "where-i-started",
    slug: "where-i-started",
    title: "Where I Started",
    description:
      "My first website was in 2025 and the code was written in the README because I didn't know how to use GitHub or deploy to Pages. I keep them all here on purpose: this is where I come from.",
    projectIds: ["bat-magotchi", "adatech", "pokemon-team", "rock-paper-scissors", "login-social-media", "overwatch-form", "garden-of-earthly-delights", "mefis"],
    defaultOpen: false,
  },
];

if (import.meta.env?.DEV) {
  const knownIds = new Set(projects.map((p) => p.id));
  const missing = [
    ...new Set(projectFolders.flatMap((f) => f.projectIds).filter((id) => !knownIds.has(id))),
  ];
  if (missing.length > 0) {
    throw new Error(
      `[data integrity] projectIds sin proyecto en projects.js: ${missing.join(", ")}`
    );
  }
}

export default projectFolders;
