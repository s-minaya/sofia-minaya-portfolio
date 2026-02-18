import "../styles/App.scss";
import Hero from "./Home/Hero";
import PageLoader from "./Loader/PageLoader";
import MenuOverlay from "./Navigation/MenuOverlay";
import useMenuState from "../hooks/useMenuState";
import Particles from "./ui/Particles/Particles";
import { useEffect, useRef, useState } from "react";
import Work from "./Work/Work";

function App() {
  const { isOpen, toggle, close } = useMenuState();
  const [workMode, setWorkMode] = useState(false);
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);

  const workRef = useRef(null);

  const handleNavigateFromMenu = (target) => {
    if (target === "work") {
      setWorkMode(true);
      const transitionMs = 1100;
      setTimeout(() => {
        const heroEl = document.getElementById("home");
        if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
      }, transitionMs);
    } else if (target === "home") {
      setWorkMode(false);
    }
  
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setHideScrollIndicator(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash === "#work") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageLoader />

      {/* Fondo partículas */}
      <div className="menu-bg-layer">
        <Particles
          particleColors={["#ffffff", "#cccccc", "#999999"]}
          particleCount={150}
          particleSpread={8}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover
          alphaParticles
          disableRotation={false}
          pixelRatio={Math.min(window.devicePixelRatio, 2)}
        />
      </div>

      {/* Nav del menú */}
      <MenuOverlay
        isOpen={isOpen}
        onClose={close}
        onNavigate={handleNavigateFromMenu}
      />

      {/* Hero + secciones */}
      <div className={`app-container ${isOpen ? "app-container--menu-open" : ""}`}>
        <Hero
          onMenuClick={toggle}
          isMenuOpen={isOpen}
          workMode={workMode}
          hideScrollIndicator={hideScrollIndicator}
        />
        <div className="app-sections">
          <section id="work" ref={workRef}>
            <Work />
          </section>
          {/* Futuras secciones About, etc. */}
        </div>
      </div>
    </>
  );
}

export default App;