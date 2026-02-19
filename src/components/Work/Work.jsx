import { useRef, useState, useEffect, useCallback, lazy, Suspense, memo } from "react";
import { useMobileDetection } from "../ui/MagicBento/MagicBento";
import { getDefaultParticleCount, getDefaultPixelRatio, DEFAULT_PARTICLE_COLORS } from "../../config/visuals";
const Particles = lazy(() => import("../ui/Particles/Particles"));
const LogoLoop = lazy(() => import("../ui/LogoLoop/LogoLoop"));
import "../../styles/Work/Work.scss";
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiReact,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit,
  SiGithub,
  SiAdobephotoshop,
  SiCanva,
  SiRender,
  SiSlack,
  SiPostman,
} from "react-icons/si";
import { TbTestPipe } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";

// ── Tech logos for LogoLoop ────────────────────────────────────
const TECH_LOGOS = [
  { node: <SiJavascript />, title: "JavaScript (ES6+)" },
  { node: <SiHtml5 />, title: "HTML5" },
  { node: <SiCss3 />, title: "CSS3" },
  { node: <SiSass />, title: "Sass" },
  { node: <SiReact />, title: "React" },
  { node: <SiVite />, title: "Vite" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiExpress />, title: "Express.js" },
  { node: <SiMysql />, title: "MySQL" },
  { node: <SiGit />, title: "Git" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <VscVscode />, title: "VS Code" },
  { node: <TbTestPipe />, title: "Testing" },
  { node: <MdGroups />, title: "Agile & Scrum" },
  { node: <SiRender />, title: "Render" },
  { node: <SiAdobephotoshop />, title: "Photoshop" },
  { node: <SiCanva />, title: "Canva" },
  { node: <SiSlack />, title: "Slack" },
  { node: <SiPostman />, title: "Postman" },
];

const PROJECTS = [
  {
    id: "bat-magotchi",
    title: "Bat-Magotchi",
    description: "Interactive bat Tamagotchi game.",
    url: "https://s-minaya.github.io/bat-magotchi/",
    image: "/src/images/projects/bat-magotchi.jpg",
    tags: ["JavaScript", "Game"],
  },
  {
    id: "animal-crossing-api",
    title: "Animal Crossing API",
    description: "Full REST API with Node.js, Express, and MySQL.",
    url: "https://github.com/Adalab/modulo-4-evaluacion-final-bpw-s-minaya",
    image: "/src/images/projects/animal-crossing-api.jpg",
    tags: ["Node.js", "Express", "MySQL"],
  },
  {
    id: "profile-cards-demo",
    title: "Awesome Profile Cards",
    description: "Fullstack app — live demo + code.",
    url: "https://estherquiros.github.io/project-promo-58-modulo-3-team-2/",
    image: "/src/images/projects/profile-cards.jpg",
    tags: ["React", "Node.js", "MySQL"],
  },
  {
    id: "pokemon",
    title: "Design Your Pokémon Team",
    description: "Advanced carousel and animations.",
    url: "https://s-minaya.github.io/dise-a-tu-equipo-pokemon/",
    image: "/src/images/projects/pokemon.jpg",
    tags: ["JavaScript", "Animations"],
  },
  {
    id: "memoria",
    title: "Memory Game",
    description: "Matching card game using React.",
    url: "https://s-minaya.github.io/juego-de-memoria/",
    image: "/src/images/projects/memoria.jpg",
    tags: ["React", "Game"],
  },
  {
    id: "harry-potter",
    title: "Harry Potter Characters",
    description: "Page with filters and routing.",
    url: "https://beta.adalab.es/modulo-3-evaluacion-final-s-minaya/",
    image: "/src/images/projects/harry-potter.jpg",
    tags: ["React", "Routing"],
  },
  {
    id: "matematicas",
    title: "Math Workshop",
    description: "Interactive math workshop using JavaScript.",
    url: "https://s-minaya.github.io/Matematicas-con-JavaScript/",
    image: "/src/images/projects/matematicas.jpg",
    tags: ["JavaScript", "Educational"],
  },
  {
    id: "tienda",
    title: "Virtual Store",
    description: "First interaction with APIs.",
    url: "https://beta.adalab.es/modulo-2-evaluacion-final-s-minaya/",
    image: "/src/images/projects/tienda-virtual.jpg",
    tags: ["JavaScript", "API"],
  },
  {
    id: "piedra-papel",
    title: "Rock Paper Scissors",
    description: "Getting started with JavaScript.",
    url: "https://beta.adalab.es/modulo-2-evaluacion-intermedia-s-minaya/",
    image: "/src/images/projects/piedra-papel-tijera.jpg",
    tags: ["JavaScript", "Game"],
  },
  {
    id: "adatech",
    title: "Adatech",
    description: "First team project.",
    url: "https://s-minaya.github.io/proyect-promo-58-module-1-team-1/",
    image: "/src/images/projects/adatech.jpg",
    tags: ["HTML", "CSS", "Team"],
  },
  {
    id: "mefis",
    title: "Mefis",
    description: "My very first code! Inspired by my cat.",
    url: "https://s-minaya.github.io/Mefis/",
    image: "/src/images/projects/mefis.jpg",
    tags: ["HTML", "First project"],
  },
];

// ── Arrow SVG ──────────────────────────────────────────────────
function ArrowIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

// ── Rewind Icon SVG ───────────────────────────────────────────
function RewindIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

// ── Project Card ───────────────────────────────────────────────
const ProjectCard = memo(function ProjectCard({ project, index }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="work-card"
      aria-label={`Ver proyecto ${project.title}`}
      style={{ "--card-index": index }}
    >
      <div className="work-card__media">
        <img
          src={project.image}
          alt={project.title}
          className="work-card__img"
          loading="lazy"
          draggable="false"
        />
        <div className="work-card__hover-overlay" aria-hidden="true">
          <ArrowIcon className="work-card__hover-icon" />
        </div>
      </div>

      <div className="work-card__footer">
        <span className="work-card__title">{project.title}</span>
        <ul className="work-card__tags" aria-label="Tecnologías">
          {project.tags.map((tag) => (
            <li key={tag} className="work-card__tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
});

// ── Tech Band ─────────────────────────────────────────────────
const TechBand = memo(function TechBand() {
  return (
    <div className="work__tech-band">
      <p className="work__tech-label" aria-label="Tools and technologies">
        tools &amp; technologies
      </p>
      <div className="work__tech-loop">
        <Suspense fallback={null}>
          <LogoLoop
            logos={TECH_LOGOS}
            speed={55}
            direction="left"
            logoHeight={50}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Tools and technologies"
          />
        </Suspense>
      </div>
    </div>
  );
});

// ── Work Section ───────────────────────────────────────────────
function Work() {
  const trackRef = useRef(null);
  const rewindRafRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRewinding, setIsRewinding] = useState(false);
  const total = PROJECTS.length;
  const isAtEnd = activeIndex >= total - 1;
  const isMobile = useMobileDetection();

  const onTrackScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.querySelector(".work-card")?.offsetWidth ?? 0;

    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (atEnd) {
      setActiveIndex(total - 1);
      return;
    }
    const idx = Math.round(el.scrollLeft / (cardW + 24));
    setActiveIndex(Math.max(0, Math.min(idx, total - 1)));
  }, [total]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onTrackScroll, { passive: true });
    return () => el.removeEventListener("scroll", onTrackScroll);
  }, [onTrackScroll]);

  // ── Arrow navigation ──────────────────────────────────────
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.querySelector(".work-card")?.offsetWidth ?? 320;
    el.scrollBy({ left: dir * (cardW + 24), behavior: "smooth" });
  };

  // ── Dot navigation ────────────────────────────────────────
  const scrollToIndex = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.querySelector(".work-card")?.offsetWidth ?? 320;
    el.scrollTo({ left: i * (cardW + 24), behavior: "smooth" });
  };

  // ── Rewind ────────────────────────────────────────────────
  const handleRewind = useCallback(() => {
    const el = trackRef.current;
    if (!el || isRewinding) return;

    setIsRewinding(true);
    el.style.scrollBehavior = "auto"; 

    const startScroll = el.scrollLeft;
    const startTime = performance.now();

    const duration = Math.min(Math.max(startScroll * 0.8, 1200), 2200);

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      el.scrollLeft = startScroll * (1 - eased);

      if (progress < 1) {
        rewindRafRef.current = requestAnimationFrame(animate);
      } else {
        el.scrollLeft = 0;
        el.style.scrollBehavior = "";
        setIsRewinding(false);
        setActiveIndex(0);
      }
    };

    rewindRafRef.current = requestAnimationFrame(animate);
  }, [isRewinding]);


  useEffect(() => {
    return () => {
      if (rewindRafRef.current) cancelAnimationFrame(rewindRafRef.current);
    };
  }, []);

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      {/* Particles background */}
      <div className="work__bg" aria-hidden="true">
        <Suspense fallback={null}>
          <Particles
            particleColors={DEFAULT_PARTICLE_COLORS}
            particleCount={getDefaultParticleCount(isMobile)}
            particleSpread={10}
            speed={0.06}
            particleBaseSize={60}
            alphaParticles
            disableRotation={false}
            pixelRatio={getDefaultPixelRatio()}
          />
        </Suspense>
      </div>

      {/* Inner layout */}
      <div className="work__inner">
        {/* Header row */}
        <div className="work__header">
          <h2 className="work__title" id="work-title">
            <span className="work__title-line work__title-line--dim">
              Selected
            </span>
            <span className="work__title-line work__title-line--bright">
              works.
            </span>
          </h2>

          {/* Nav: prev · next · rewind */}
          <div className="work__nav" aria-label="Navegar proyectos">
            <button
              className="work__nav-btn"
              onClick={() => scrollBy(-1)}
              disabled={activeIndex === 0 || isRewinding}
              aria-label="Proyecto anterior"
            >
              <span
                className="work__nav-arrow work__nav-arrow--left"
                aria-hidden="true"
              />
            </button>

            <button
              className="work__nav-btn"
              onClick={() => scrollBy(1)}
              disabled={isAtEnd || isRewinding}
              aria-label="Proyecto siguiente"
            >
              <span
                className="work__nav-arrow work__nav-arrow--right"
                aria-hidden="true"
              />
            </button>

            {/* Rewind */}
            <button
              className={`work__nav-btn work__nav-btn--rewind${isAtEnd ? " work__nav-btn--rewind-visible" : ""}`}
              onClick={handleRewind}
              disabled={isRewinding}
              aria-label="Volver al primer proyecto"
            >
              <RewindIcon
                className={`work__rewind-icon${isRewinding ? " work__rewind-icon--spinning" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="work__carousel-wrap">
          <div className="work__track" ref={trackRef}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div
          className="work__dots"
          role="tablist"
          aria-label="Indicadores de proyecto"
        >
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ir a ${p.title}`}
              className={`work__dot${i === activeIndex ? " work__dot--active" : ""}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>

        {/* Tech band */}
        <TechBand />
      </div>
    </section>
  );
}

export default Work;
