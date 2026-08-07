import { useRef, useState, useEffect, useCallback, lazy, Suspense, memo } from "react";
import { useMobileDetection } from "../../hooks/useMobileDetection";
import { getDefaultParticleCount, getDefaultPixelRatio, DEFAULT_PARTICLE_COLORS } from "../../config/visuals";
import projects from "../../data/projects";
import projectFolders from "../../data/projectFolders";
import ProjectFolder from "../ProjectFolder/ProjectFolder";
const Particles = lazy(() => import("../ui/Particles/Particles"));
const LogoLoop = lazy(() => import("../ui/LogoLoop/LogoLoop"));
import "./Work.scss";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiTailwindcss,
  SiReact,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiAdobephotoshop,
  SiCanva,
  SiRender,
  SiSlack,
  SiPostman,
  SiJest,
  SiVitest,
  SiMockserviceworker,
  SiTestinglibrary,
  SiDocker,
  SiEslint,
} from "react-icons/si";
import { MdGroups } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { TbTestPipe2, TbBrandGithub } from "react-icons/tb";

// ── Tech logos for LogoLoop ────────────────────────────────────
const TECH_LOGOS = [
  { node: <SiJavascript />, title: "JavaScript (ES6+)" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiHtml5 />, title: "HTML5" },
  { node: <SiCss3 />, title: "CSS3" },
  { node: <SiSass />, title: "Sass" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiReact />, title: "React" },
  { node: <SiVite />, title: "Vite" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiExpress />, title: "Express.js" },
  { node: <SiMysql />, title: "MySQL" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiGit />, title: "Git" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <VscVscode />, title: "VS Code" },
  { node: <SiJest />, title: "Jest" },
  { node: <SiVitest />, title: "Vitest" },
  { node: <SiMockserviceworker />, title: "Mock Service Worker" },
  { node: <SiTestinglibrary />, title: "Testing Library" },
  { node: <TbTestPipe2 />, title: "Playwright" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiEslint />, title: "ESLint" },
  { node: <TbBrandGithub />, title: "GitHub Actions" },
  { node: <MdGroups />, title: "Agile & Scrum" },
  { node: <SiRender />, title: "Render" },
  { node: <SiAdobephotoshop />, title: "Photoshop" },
  { node: <SiCanva />, title: "Canva" },
  { node: <SiSlack />, title: "Slack" },
  { node: <SiPostman />, title: "Postman" },
];

// ── Folder previews ───────────────────────────────────────────
const getPreviewImages = (folder) =>
  folder.projectIds
    .slice(0, 3)
    .map((id) => projects.find((p) => p.id === id)?.image ?? null);

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
  const [positions, setPositions] = useState(projectFolders.length);
  const positionsRef = useRef(projectFolders.length);
  const isRewindingRef = useRef(false);
  const isAtEnd = activeIndex >= positions - 1;
  const isMobile = useMobileDetection();

  // ── Geometría real del carrusel ────────────────────────────
  // Ancho de una carpeta + gap del track (24px base, 28px desde $xl).
  const getStep = useCallback((el) => {
    const folders = el.querySelectorAll(".work-folder");
    const cardW = folders[0]?.offsetWidth ?? 320;
    const gap =
      folders[1] && folders[1].offsetLeft - folders[0].offsetLeft > cardW
        ? folders[1].offsetLeft - folders[0].offsetLeft - cardW
        : 24;
    return cardW + gap;
  }, []);

  // Cuántos movimientos (dots) hay según las carpetas visibles en pantalla.
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = getStep(el);
    if (step <= 0) return;
    const maxIndex = Math.round((el.scrollWidth - el.clientWidth) / step);
    const clamped = Math.max(0, Math.min(maxIndex, projectFolders.length - 1));
    positionsRef.current = clamped + 1;
    setPositions(clamped + 1);
  }, [getStep]);

  const onTrackScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || isRewindingRef.current) return;
    const step = getStep(el);
    const maxIndex = positionsRef.current - 1;

    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (atEnd) {
      setActiveIndex(maxIndex);
      return;
    }
    const idx = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(idx, maxIndex)));
  }, [getStep]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", onTrackScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", onTrackScroll);
      window.removeEventListener("resize", measure);
    };
  }, [measure, onTrackScroll]);

  // ── Arrow navigation ──────────────────────────────────────
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * getStep(el), behavior: "smooth" });
  };

  // ── Dot navigation ────────────────────────────────────────
  const scrollToIndex = (i) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * getStep(el), behavior: "smooth" });
  };

  // ── Rewind ────────────────────────────────────────────────
  const handleRewind = useCallback(() => {
    const el = trackRef.current;
    if (!el || isRewindingRef.current) return;

    isRewindingRef.current = true;
    setIsRewinding(true);

    // Sin snap ni scroll suave nativo durante el rAF: el navegador
    // no "pelea" contra la animación y sale más fluido.
    const prevSnap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";

    const startScroll = el.scrollLeft;
    const startTime = performance.now();

    const duration = Math.min(Math.max(startScroll * 0.8, 1200), 2200);

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeInOutCubic(progress);
      el.scrollLeft = startScroll * (1 - eased);

      if (progress < 1) {
        rewindRafRef.current = requestAnimationFrame(animate);
      } else {
        el.scrollLeft = 0;
        el.style.scrollSnapType = prevSnap;
        el.style.scrollBehavior = "";
        isRewindingRef.current = false;
        setIsRewinding(false);
        setActiveIndex(0);
      }
    };

    rewindRafRef.current = requestAnimationFrame(animate);
  }, []);

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
            {projectFolders.map((folder) => (
              <div className="work-folder" key={folder.id}>
                <ProjectFolder
                  title={folder.title}
                  count={folder.projectIds.length}
                  previewImages={getPreviewImages(folder)}
                  to={`/work/${folder.slug}`}
                  defaultOpen={folder.defaultOpen}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div
          className="work__dots"
          role="tablist"
          aria-label="Indicadores de proyecto"
        >
          {Array.from({ length: positions }, (_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ir a la posición ${i + 1} de ${positions}`}
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
