import "../styles/App.scss";
import Hero from "./Home/Hero";
import PageLoader from "./Loader/PageLoader";
import MenuOverlay from "./Navigation/MenuOverlay";
import Footer from "./Footer/Footer";
import useMenuState from "../hooks/useMenuState";
import Particles from "./ui/Particles/Particles";
import Work from "./Work/Work";
import About from "./About/About";
import { useEffect, useRef, useState } from "react";

function App() {
  const { isOpen, toggle, close } = useMenuState();
  const [activeSection, setActiveSection] = useState("home");
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);
  const [aboutFirst, setAboutFirst] = useState(false);
  const workRef  = useRef(null);
  const aboutRef = useRef(null);

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

      // Restaurar orden natural cuando Work entra visible en scroll natural
      if (aboutFirst && workRef.current) {
        const workTop = workRef.current.getBoundingClientRect().top;
        if (workTop < window.innerHeight * 0.5 && workTop > 0) {
          setAboutFirst(false);
          setActiveSection("home");
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [aboutFirst]);

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