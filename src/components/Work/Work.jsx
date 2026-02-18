import { useRef, useState, useEffect, useCallback } from "react";
import Particles from "../ui/Particles/Particles";
import "../../styles/Work/Work.scss";

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

// ── Project Card ───────────────────────────────────────────────
function ProjectCard({ project, index }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="work-card"
      aria-label={`Ver proyecto ${project.title}`}
      style={{ "--card-index": index }}
    >
      {/* Image */}
      <div className="work-card__media">
        <img
          src={project.image}
          alt={project.title}
          className="work-card__img"
          loading="lazy"
          draggable="false"
        />
        {/* Hover overlay */}
        <div className="work-card__hover-overlay" aria-hidden="true">
          <ArrowIcon className="work-card__hover-icon" />
        </div>
      </div>

      {/* Footer */}
      <div className="work-card__footer">
        <span className="work-card__title">{project.title}</span>
        <ul className="work-card__tags" aria-label="Tecnologías">
          {project.tags.map((tag) => (
            <li key={tag} className="work-card__tag">{tag}</li>
          ))}
        </ul>
      </div>
    </a>
  );
}

// ── Work Section ───────────────────────────────────────────────
function Work() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = PROJECTS.length;

  // Update active dot on scroll
  const onTrackScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.querySelector(".work-card")?.offsetWidth ?? 0;
    const gap = 24;
    const idx = Math.round(el.scrollLeft / (cardW + gap));
    setActiveIndex(Math.max(0, Math.min(idx, total - 1)));
  }, [total]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onTrackScroll, { passive: true });
    return () => el.removeEventListener("scroll", onTrackScroll);
  }, [onTrackScroll]);

  const scrollTo = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.querySelector(".work-card")?.offsetWidth ?? 320;
    el.scrollBy({ left: dir * (cardW + 24), behavior: "smooth" });
  };

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      {/* Particles background — independiente del hero */}
      <div className="work__bg" aria-hidden="true">
        <Particles
          particleColors={["#ffffff", "#aaaaaa", "#666666"]}
          particleCount={80}
          particleSpread={10}
          speed={0.06}
          particleBaseSize={60}
          alphaParticles
          disableRotation={false}
          pixelRatio={Math.min(window.devicePixelRatio, 2)}
        />
      </div>

      {/* Inner layout */}
      <div className="work__inner">
        {/* Header row */}
        <div className="work__header">
          <h2 className="work__title" id="work-title">
            <span className="work__title-line work__title-line--dim">Selected</span>
            <span className="work__title-line work__title-line--bright">works.</span>
          </h2>

          {/* Nav arrows */}
          <div className="work__nav" aria-label="Navegar proyectos">
            <button
              className="work__nav-btn"
              onClick={() => scrollTo(-1)}
              disabled={activeIndex === 0}
              aria-label="Proyecto anterior"
            >
              <span className="work__nav-arrow work__nav-arrow--left" aria-hidden="true" />
            </button>
            <button
              className="work__nav-btn"
              onClick={() => scrollTo(1)}
              disabled={activeIndex >= total - 1}
              aria-label="Proyecto siguiente"
            >
              <span className="work__nav-arrow work__nav-arrow--right" aria-hidden="true" />
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
        <div className="work__dots" role="tablist" aria-label="Indicadores de proyecto">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ir a ${p.title}`}
              className={`work__dot${i === activeIndex ? " work__dot--active" : ""}`}
              onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                const cardW = el.querySelector(".work-card")?.offsetWidth ?? 320;
                el.scrollTo({ left: i * (cardW + 24), behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;