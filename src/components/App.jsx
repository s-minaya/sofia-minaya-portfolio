import "../styles/App.scss";
import Hero from "./Home/Hero";
import PageLoader from "./Loader/PageLoader";
import MenuOverlay from "./Navigation/MenuOverlay";
import useMenuState from "../hooks/useMenuState";
import Particles from "./ui/Particles/Particles";
import Work from "./Work/Work";
import About from "./About/About";
import { useEffect, useRef, useState } from "react";

function App() {
  const { isOpen, toggle, close } = useMenuState();
  const [activeSection, setActiveSection] = useState("home");
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);
  // Cuando aboutFirst=true, About aparece visualmente antes que Work
  const [aboutFirst, setAboutFirst] = useState(false);
  const workRef  = useRef(null);
  const aboutRef = useRef(null);

  const handleNavigateFromMenu = (target) => {
    close();

    if (target === "home") {
      setActiveSection("home");
      // Restaurar orden natural antes de scrollear arriba
      setAboutFirst(false);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1100);
      return;
    }

    if (target === "work") {
      setActiveSection("work");
      // Restaurar orden natural
      setAboutFirst(false);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1100);
      return;
    }

    if (target === "about") {
      setActiveSection("about");
      // Poner About visualmente antes de Work, luego scroll al hero
      setAboutFirst(true);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1100);
      return;
    }
  };

  // Cuando el usuario hace scroll natural de vuelta al hero,
  // restauramos el orden para que work -> about sea el natural de nuevo.
  // Detectamos si está cerca del top (hero visible) y activeSection no es about.
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setHideScrollIndicator(true);
      }

      // Si el usuario ha vuelto a scrollear al hero manualmente
      // y estamos en modo aboutFirst, restauramos el orden natural
      // solo si el usuario scrollea hasta Work (pasando sobre él)
      if (aboutFirst && workRef.current) {
        const workTop = workRef.current.getBoundingClientRect().top;
        // Si Work está visible en pantalla desde abajo (usuario scrolleando hacia abajo),
        // significa que está navegando por las secciones en orden natural → restaurar
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
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  const containerClass = "app-container" + (isOpen ? " app-container--menu-open" : "");

  return (
    <>
      <PageLoader />

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
        onNavigate={handleNavigateFromMenu}
      />

      <div className={containerClass}>
        <Hero
          onMenuClick={toggle}
          isMenuOpen={isOpen}
          workMode={activeSection === "work"}
          aboutMode={activeSection === "about"}
          hideScrollIndicator={hideScrollIndicator}
        />

        {/*
          app-sections es un flex-column.
          Cuando aboutFirst=true, About recibe order:-1 y sube visualmente
          por encima de Work, sin mover el DOM real.
          El scroll natural (work → about) se mantiene intacto porque
          al llegar a Work restauramos el orden.
        */}
        <div className="app-sections">
          <section
            id="work"
            ref={workRef}
            style={{ order: 0 }}
          >
            <Work />
          </section>
          <section
            id="about"
            ref={aboutRef}
            style={{ order: aboutFirst ? -1 : 1 }}
          >
            <About />
          </section>
        </div>
      </div>
    </>
  );
}

export default App;