import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiSass,
  SiJest,
  SiTestinglibrary,
  SiExpress,
} from "react-icons/si";

const projects = [
  {
    id: "dark-horoscope",
    title: "Dark Horoscope",
    description:
      "Simple exercise, gothic glow-up ⋆｡°✩ a dark horoscope app with a bat oracle, exact zodiac calculations and a typewriter fortune effect.",

    tags: ["Vanilla JS", "Tailwind CSS", "Vite", "HTML"],
    icon: SiJavascript,
    image: new URL("../images/projects/react-and-frontend/horoscope.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/horoscope/",
    repoUrl: "https://github.com/s-minaya/horoscope",
    status: "published",
  },
  {
    id: "minaya-travel",
    title: "Minaya Travel",
    description:
      "A fictional travel agency, built around modern UI/UX ⋆｡°✩ a Japan-themed landing page with my first light/dark mode.",

    tags: ["React", "Tailwind CSS", "Vite"],
    icon: SiReact,
    image: new URL("../images/projects/featured/minaya-travel.webp", import.meta.url)
      .href,
    url: "https://s-minaya.github.io/minaya-travel/",
    repoUrl: "https://github.com/s-minaya/minaya-travel",
    status: "published",
  },
  {
    id: "react-testing-library",
    title: "React Testing Library",
    description:
      "Beyond the happy path ⋆｡°✩ testing React components and hooks with Vitest, mocks, spies and MSW, following TDD and SOLID principles.",

    tags: ["React", "MSW", "Vitest", "TDD", "TypeScript"],
    icon: SiTestinglibrary,
    image: new URL(
      "../images/projects/testing-and-best-practices/react-testing-library.webp",
      import.meta.url,
    ).href,
    url: null,
    repoUrl: "https://github.com/s-minaya/react-testing-library",
    status: "published",
  },
  {
    id: "bat-magotchi",
    title: "Bat-Magotchi",
    description:
      "Feed it, don't garlic it ⋆｡°✩ a retro Game Boy-style Tamagotchi where a pixel bat lives or dies by your food choices.",

    tags: ["Vanilla JS", "Game", "SCSS", "Vite"],
    icon: SiJavascript,
    image: new URL("../images/projects/react-and-frontend/bat-magotchi.webp", import.meta.url)
      .href,
    url: "https://s-minaya.github.io/bat-magotchi/",
    repoUrl: "https://github.com/s-minaya/bat-magotchi",
    status: "published",
  },
  {
    id: "animal-crossing-api",
    title: "Animal Crossing API",
    description:
      "No frontend, no mercy ⋆｡°✩ a REST API for Animal Crossing data, every endpoint tested and approved via Postman.",

    tags: ["Node.js", "Express", "MySQL", "Postman"],
    icon: SiExpress,
    image: new URL(
      "../images/projects/full-stack-and-apis/animal-crossing-api.webp",
      import.meta.url,
    ).href,
    url: null,
    repoUrl:
      "https://github.com/s-minaya/modulo-4-evaluacion-final-bpw-s-minaya",
    status: "published",
  },
  {
    id: "profile-cards",
    title: "Awesome Profile Cards",
    description:
      "Your professional profile, packaged beautifully ⋆｡°✩ a profile card generator built sprint by sprint with a Scrum team, backed by Node.js.",

    tags: ["React", "Node.js", "Express", "MySQL"],
    icon: SiReact,
    image: new URL("../images/projects/featured/profile-cards.webp", import.meta.url)
      .href,
    url: "https://estherquiros.github.io/project-promo-58-modulo-3-team-2/",
    repoUrl:
      "https://github.com/Mercedes-Bichweiler/project-promo-58-modulo-4-team-2",
    status: "published",
  },
  {
    id: "javascript-testing-practice",
    title: "JavaScript Testing Practice",
    description:
      "Testing, the whole pyramid ⋆｡°✩ unit, integration, E2E and UI tests on a Node.js API, following TDD/BDD and the AAA pattern, backed by MongoDB, Docker and CI/CD.",

    tags: ["MongoDB", "Node.js", "Jest", "CI/CD", "Docker"],
    icon: SiJest,
    image: new URL(
      "../images/projects/full-stack-and-apis/testing-con-javascript.webp",
      import.meta.url,
    ).href,
    url: null,
    repoUrl: "https://github.com/s-minaya/testing-con-javascript",
    status: "published",
  },
  {
    id: "math-workshop",
    title: "Math Workshop",
    description:
      "More than the course asked for ⋆｡°✩ a math and stats calculator suite with custom coupons, persistent data, and a little companion worth clicking.",

    tags: ["Vanilla JS", "SCSS", "Vite"],
    icon: SiJavascript,
    image: new URL("../images/projects/react-and-frontend/matematicas.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/Matematicas-con-JavaScript/",
    repoUrl: "https://github.com/s-minaya/Matematicas-con-JavaScript",
    status: "published",
  },
  {
    id: "pokemon-team",
    title: "Design Your Pokémon Team",
    description:
      "Started as a CSS animations course, evolved into a full Pokémon team builder ⋆｡°✩ animated modal, persistent picks, my own extras.",

    tags: ["Vanilla JS", "HTML", "SCSS", "Vite"],
    icon: SiJavascript,
    image: new URL("../images/projects/react-and-frontend/pokemon.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/dise-a-tu-equipo-pokemon/",
    repoUrl: "https://github.com/s-minaya/dise-a-tu-equipo-pokemon",
    status: "published",
  },
  {
    id: "memory-game",
    title: "Memory Game",
    description:
      "Match the sushi before you're out of moves ⋆｡°✩ a classic memory game with a tasty twist, built with React.",

    tags: ["React", "Game", "SCSS", "Vite"],
    icon: SiReact,
    image: new URL("../images/projects/react-and-frontend/memoria.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/juego-de-memoria/",
    repoUrl: "https://github.com/s-minaya/juego-de-memoria",
    status: "published",
  },
  {
    id: "harry-potter",
    title: "Harry Potter Characters",
    description:
      "Accio, character data! A Harry Potter explorer with house filters, search and routing ⋆｡°✩ built for Adalab's Module 3 evaluation.",

    tags: ["React", "SCSS", "Fetch API", "Vite"],
    icon: SiReact,
    image: new URL(      "../images/projects/full-stack-and-apis/harry-potter.webp", import.meta.url)
      .href,
    url: "https://beta.adalab.es/modulo-3-evaluacion-final-s-minaya/",
    repoUrl: "https://github.com/s-minaya/modulo-3-evaluacion-final-s-minaya",
    status: "published",
  },
  {
    id: "countries-explorer",
    title: "Countries Explorer",
    description:
      "No API, no problem ⋆｡°✩ a fully state-driven country catalog with real-time search and continent filters. Adalab evaluation project.",

    tags: ["React", "SCSS", "Vite"],
    icon: SiReact,
    image: new URL("../images/projects/react-and-frontend/paises.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/Listado-de-paises/",
    repoUrl: "https://github.com/s-minaya/Listado-de-paises",
    status: "published",
  },
  {
    id: "virtual-store",
    title: "Virtual Store",
    description:
      "Shop, refresh, shop again ⋆｡°✩ a vanilla JS storefront with live search and a cart backed by localStorage. Adalab evaluation project.",

    tags: ["Vanilla JS", "Fetch API", "HTML", "CSS", "Vite"],
    icon: SiJavascript,
    image: new URL(      "../images/projects/full-stack-and-apis/tienda-virtual.webp", import.meta.url)
      .href,
    url: "https://beta.adalab.es/modulo-2-evaluacion-final-s-minaya/",
    repoUrl: "https://github.com/s-minaya/modulo-2-evaluacion-final-s-minaya",
    status: "published",
  },
  {
    id: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    description:
      "No time for style, just logic ⋆｡°✩ a 10-round rock-paper-scissors showdown against JavaScript, built in under 4 hours.",

    tags: ["Vanilla JS", "HTML", "CSS", "Game", "Vite"],
    icon: SiJavascript,
    image: new URL(
      "../images/projects/where-i-started/piedra-papel-tijera.webp",
      import.meta.url,
    ).href,
    url: "https://beta.adalab.es/modulo-2-evaluacion-intermedia-s-minaya/",
    repoUrl:
      "https://github.com/s-minaya/modulo-2-evaluacion-intermedia-s-minaya",
    status: "published",
  },
  {
    id: "adatech",
    title: "Adatech",
    description:
      "Built by women, for women in tech ⋆｡°✩ a fictional startup's landing page, hand-coded in HTML and CSS, Scrum-style.",

    tags: ["HTML", "CSS", "Vite"],
    icon: SiHtml5,
    image: new URL("../images/projects/where-i-started/adatech.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/proyect-promo-58-module-1-team-1/",
    repoUrl: "https://github.com/s-minaya/proyect-promo-58-module-1-team-1",
    status: "published",
  },
  {
    id: "layout-design-exam",
    title: "Layout Design Exam",
    description:
      "From Zeplin to reality ⋆｡°✩ a pixel-perfect, responsive layout built with Sass and BEM, exam-tested down to the last media query.",

    tags: ["HTML", "SASS", "BEM", "Vite"],
    icon: SiSass,
    image: new URL("../images/projects/react-and-frontend/modulo-1.webp", import.meta.url).href,
    url: "https://beta.adalab.es/modulo-1-evaluacion-final-s-minaya/",
    repoUrl: "https://github.com/s-minaya/modulo-1-evaluacion-final-s-minaya",
    status: "published",
  },
  {
    id: "login-social-media",
    title: "Login social media",
    description:
      "Where mewsernames and pawswords are law ⋆｡°✩ a tiny cat-themed social network login, and my first real JavaScript win.",

    tags: ["Vanilla JS", "HTML", "CSS"],
    icon: SiJavascript,
    image: new URL("../images/projects/where-i-started/login.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/log-in-red-social/",
    repoUrl: "https://github.com/s-minaya/log-in-red-social",
    status: "published",
  },
  {
    id: "overwatch-form",
    title: "Overwatch form",
    description:
      "Tank, DPS or Support? Built in my README-is-a-webpage era ⋆｡°✩ an early HTML/CSS experiment that (somehow) still runs.",

    tags: ["HTML", "CSS", "Form"],
    icon: SiCss3,
    image: new URL("../images/projects/where-i-started/overwatch.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/Formulario-OW.github.io/",
    repoUrl: "https://github.com/s-minaya/Formulario-OW.github.io",
    status: "published",
  },
  {
    id: "garden-of-earthly-delights",
    title: "The Garden of Earthly Delights",
    description:
      "An analysis of my favorite painting, The Garden of Earthly Delights ⋆｡°✩ with interactive features that were, let's say, aspirational.",

    tags: ["Vanilla JS", "HTML", "CSS"],
    icon: SiJavascript,
    image: new URL("../images/projects/where-i-started/jardin.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/el-jardin-de-las-delicias/",
    repoUrl: "https://github.com/s-minaya/el-jardin-de-las-delicias",
    status: "published",
  },
  {
    id: "mefis",
    title: "Mefis",
    description:
      "My very first line of code, written for the most demanding client I've ever had: my cat. A day in the life of Mefistófeles, documented in exhaustive (and unnecessary) detail.",

    tags: ["First Project"],
    icon: SiHtml5,
    image: new URL("../images/projects/where-i-started/mefis.webp", import.meta.url).href,
    url: "https://s-minaya.github.io/Mefis/",
    repoUrl: "https://github.com/s-minaya/Mefis",
    status: "published",
  },
  {
    id: "accept-all-cookies",
    title: "Accept All Cookies",
    description:
      "Twelve levels of cookie banners fighting back. A pixel-art game where the interface does everything it can to stop you from clicking Agree.",

    tags: ["React", "TypeScript", "matter.js", "Testing", "Game"],
    icon: SiReact,
    image: new URL(
      "../images/projects/featured/accept-all-cookies.webp",
      import.meta.url,
    ).href,
    url: "https://s-minaya.github.io/accept-all-cookies/",
    repoUrl: "https://github.com/s-minaya/accept-all-cookies",
    status: "published",
  },
  {
    id: "tech-jobs-dashboard",
    title: "Tech Jobs Dashboard",
    description:
      "Full stack tech jobs dashboard visualizing real-time hiring data across 8 European countries ⋆｡°✩ 26,000+ active listings scraped and maintained by a data engineering collaborator. Built the complete frontend and REST API, with dynamic filters, the whole pyramid of testing, and CI/CD pipeline (GitHub Actions). Currently in active development.",
    tags: ["React", "Node.js", "Express", "Recharts", "CI/CD"],
    icon: SiReact,
    image: new URL(
      "../images/projects/featured/tech-jobs-dashboard.webp",
      import.meta.url,
    ).href,
    url: null,
    repoUrl: "https://github.com/s-minaya/tech-jobs-dashboard",
    status: "in-development",
  },
];

export default projects;
