import "../../styles/Home/Hero.scss";
import Iridescence from "../ui/Iridescence/Iridescence";
import ScrollIndicator from "../ui/ScrollIndicator/ScrollIndicator";
import MenuButton from "../Navigation/MenuButton";
import useTypewriter from "../../hooks/useTypewriter";

const HERO_TYPEWRITER_TEXTS = [
  "full stack developer junior.",
  "bit nerdy.",
  "multidisciplinary artist.",
];

function Hero({ onMenuClick }) {
  const { displayed, isDeleting } = useTypewriter({
    texts: HERO_TYPEWRITER_TEXTS,
    typingSpeed: 75,
    deletingSpeed: 45,
    pauseAfterType: 2000,
    pauseAfterDelete: 350,
  });

  return (
    <section className="hero">
      {/* Fondo iridiscente */}
      <div className="hero__bg">
        <Iridescence color={[0.5, 0.6, 0.8]} speed={1} amplitude={0.12} />
      </div>

      {/* Navbar */}
      <header className="hero__header">
        <MenuButton onClick={onMenuClick} />
      </header>

      {/* Contenido principal */}
      <div className="hero__content">
        <div className="hero__text-block">
          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--dim">
              Hey, I&apos;m{" "}
            </span>
            <span className="hero__title-line hero__title-line--bright">
              Sofía Minaya.
            </span>
          </h1>

          <p className="hero__subtitle">
            <span className="hero__subtitle-fixed">I&apos;m a </span>
            <span className="hero__subtitle-typewriter">
              {displayed}
              <span
                className={`hero__cursor ${
                  isDeleting ? "hero__cursor--deleting" : ""
                }`}
              />
            </span>
          </p>

          <p className="hero__description">
            Passionate about creating, learning,
            <br />
            and sharing ideas through code and art.
          </p>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="hero__scroll">
        <ScrollIndicator />
      </div>
    </section>
  );
}

export default Hero;