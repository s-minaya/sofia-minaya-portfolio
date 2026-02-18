import "../styles/App.scss";
import Hero from "./Home/Hero";
import PageLoader from "./Loader/PageLoader";
import MenuOverlay from "./Navigation/MenuOverlay";
import useMenuState from "../hooks/useMenuState";
import Particles from "./ui/Particles/Particles";

function App() {
  const { isOpen, toggle, close } = useMenuState();

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
      <MenuOverlay isOpen={isOpen} onClose={close} />

      {/* Hero + secciones */}
      <div className={`app-container ${isOpen ? "app-container--menu-open" : ""}`}>
        <Hero onMenuClick={toggle} isMenuOpen={isOpen} />
        <div className="app-sections">
          {/* Futuras secciones Work, About, etc. */}
        </div>
      </div>
    </>
  );
}

export default App;