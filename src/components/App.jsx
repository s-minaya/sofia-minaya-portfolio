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
  const [arrivedFromMenu, setArrivedFromMenu] = useState(false);
  const [enteredByScroll, setEnteredByScroll] = useState(false);
  const workRef = useRef(null);

  const handleNavigateFromMenu = (target) => {
    if (target === "work") {
      // User requested Work from menu: show Hero first but in workMode.
      setArrivedFromMenu(true);
      setEnteredByScroll(false);
      // Close menu animation happens in App; wait briefly then scroll Hero into view
      const transitionMs = 1100;
      setTimeout(() => {
        const heroEl = document.getElementById("home");
        if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
      }, transitionMs);
      // We will clear arrivedFromMenu later when the user actually scrolls to Work
    }
  };

  useEffect(() => {
    // On first load, disable browser scroll restoration and ensure we start at the Hero
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash === "#work") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    // Force top-of-page on mount to ensure Hero is visible first
    window.scrollTo(0, 0);

    if (!workRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          // Only consider this an "entered by scroll" when the user has actually scrolled
          // (scrollY > small threshold) to avoid firing on initial layout. Also allow
          // transition from arrivedFromMenu when the user scrolls down.
          const userScrolled = window.scrollY > 10;
          if (userScrolled) {
            setEnteredByScroll(true);
            setArrivedFromMenu(false);
          }
        });
      },
      { root: null, threshold: 0.25 }
    );
    observer.observe(workRef.current);
    return () => observer.disconnect();
  }, [arrivedFromMenu]);

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
      <MenuOverlay isOpen={isOpen} onClose={close} onNavigate={handleNavigateFromMenu} />

      {/* Hero + secciones */}
      <div className={`app-container ${isOpen ? "app-container--menu-open" : ""}`}>
        <Hero
          onMenuClick={toggle}
          isMenuOpen={isOpen}
          workMode={arrivedFromMenu && !enteredByScroll}
          hideScrollIndicator={enteredByScroll}
        />
        <div className="app-sections">
          <section id="work" ref={workRef}>
            <Work projectsRef={workRef} />
          </section>
          {/* Futuras secciones About, etc. */}
        </div>
      </div>
    </>
  );
}

export default App;