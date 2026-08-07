import "../styles/App.scss";
import Hero from "./Home/Hero";
import PageLoader from "./Loader/PageLoader";
import MenuOverlay from "./Navigation/MenuOverlay";
import Footer from "./Footer/Footer";
import ProjectDetail from "./ProjectDetail/ProjectDetail";
import useMenuState from "../hooks/useMenuState";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useMobileDetection } from "../hooks/useMobileDetection";
import { getDefaultPixelRatio, DEFAULT_PARTICLE_COLORS } from "../config/visuals";
const Particles = lazy(() => import("./ui/Particles/Particles"));
const Work = lazy(() => import("./Work/Work"));
const About = lazy(() => import("./About/About"));

function App() {
  const location = useLocation();
  const { isOpen, toggle, close } = useMenuState();
  const [activeSection, setActiveSection] = useState("home");
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);
  const [aboutFirst, setAboutFirst] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const workRef  = useRef(null);
  const aboutRef = useRef(null);
  const isMobile = useMobileDetection();

  const handleNavigate = (target) => {
    if (isOpen) close();

    if (target === "home") {
      setActiveSection("home");
      setAboutFirst(false);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), isOpen ? 1100 : 0);
      return;
    }

    if (target === "work") {
      setActiveSection("work");
      setAboutFirst(false);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), isOpen ? 1100 : 0);
      return;
    }

    if (target === "about") {
      setActiveSection("about");
      setAboutFirst(true);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), isOpen ? 1100 : 0);
      return;
    }
  };

 useEffect(() => {
  const onScroll = () => {
    if (window.scrollY > 10) setHideScrollIndicator(true);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash && !window.location.hash.startsWith("#/")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // "Back to Selected works" llega a "/" con state.scrollTo === "work":
  // espera a que la sección #work (Work es lazy) tenga altura real y
  // entonces hace scroll hasta ella.
  useEffect(() => {
    if (location.pathname !== "/" || location.state?.scrollTo !== "work") return;
    const el = workRef.current;
    if (!el) return;

    let done = false;
    const scrollToWork = () => {
      if (done) return;
      if (el.getBoundingClientRect().height > 0) {
        done = true;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToWork();
    if (done) return;

    const ro = new ResizeObserver(scrollToWork);
    ro.observe(el);
    const fallback = setTimeout(() => {
      ro.disconnect();
      scrollToWork();
    }, 2000);

    return () => {
      ro.disconnect();
      clearTimeout(fallback);
    };
  }, [location, workRef]);

  // Monta las partículas de fondo cuando el navegador quede desocupado (o como
  // máximo tras 1.5 s) para no competir con el primer pintado ni con el loader.
  useEffect(() => {
    let disposed = false;
    const start = () => {
      if (!disposed) setBackgroundReady(true);
    };
    const fallback = setTimeout(start, 1500);
    const scheduleIdle = () => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          clearTimeout(fallback);
          start();
        });
      } else {
        setTimeout(start, 300);
      }
    };
    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      window.addEventListener("load", scheduleIdle, { once: true });
    }
    return () => {
      disposed = true;
      clearTimeout(fallback);
      window.removeEventListener("load", scheduleIdle);
    };
  }, []);

  const containerClass = "app-container" + (isOpen ? " app-container--menu-open" : "");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {location.state?.scrollTo !== "work" && <PageLoader />}
            <Footer onNavigate={handleNavigate} />

            <div className="menu-bg-layer">
              {backgroundReady && (
                <Suspense fallback={null}>
                  <Particles
                    particleColors={DEFAULT_PARTICLE_COLORS}
                    particleCount={isMobile ? 80 : 150}
                    particleSpread={8}
                    speed={0.08}
                    particleBaseSize={80}
                    moveParticlesOnHover
                    alphaParticles
                    disableRotation={false}
                    pixelRatio={getDefaultPixelRatio()}
                  />
                </Suspense>
              )}
            </div>

            <MenuOverlay
              isOpen={isOpen}
              onClose={close}
              onNavigate={handleNavigate}
            />

            <div className={containerClass}>
              <Hero
                onMenuClick={toggle}
                isMenuOpen={isOpen}
                workMode={activeSection === "work"}
                aboutMode={activeSection === "about"}
                hideScrollIndicator={hideScrollIndicator}
              />

              <div className="app-sections">
                <Suspense fallback={null}>
                  <section id="work" ref={workRef} style={{ order: 0 }}>
                    <Work />
                  </section>
                  <section id="about" ref={aboutRef} style={{ order: aboutFirst ? -1 : 1 }}>
                    <About />
                  </section>
                </Suspense>
              </div>
            </div>
          </>
        }
      />
      <Route path="/work/:slug" element={<ProjectDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;