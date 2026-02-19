import "../styles/App.scss";
import Hero from "./Home/Hero";
import PageLoader from "./Loader/PageLoader";
import MenuOverlay from "./Navigation/MenuOverlay";
import Footer from "./Footer/Footer";
import useMenuState from "../hooks/useMenuState";
import Work from "./Work/Work";
import About from "./About/About";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useMobileDetection } from "./ui/MagicBento/MagicBento";
import { getDefaultPixelRatio, DEFAULT_PARTICLE_COLORS } from "../config/visuals";
const Particles = lazy(() => import("./ui/Particles/Particles"));

function App() {
  const { isOpen, toggle, close } = useMenuState();
  const [activeSection, setActiveSection] = useState("home");
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);
  const [aboutFirst, setAboutFirst] = useState(false);
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
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  const containerClass = "app-container" + (isOpen ? " app-container--menu-open" : "");

  return (
    <>
      <PageLoader />
      <Footer onNavigate={handleNavigate} />

      <div className="menu-bg-layer">
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
          <section id="work" ref={workRef} style={{ order: 0 }}>
            <Work />
          </section>
          <section id="about" ref={aboutRef} style={{ order: aboutFirst ? -1 : 1 }}>
            <About />
          </section>
        </div>
      </div>
    </>
  );
}

export default App;