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

const WORK_TYPEWRITER_TEXTS = [
  "backend development.",
  "frontend development.",
  "Agile & Scrum methodologies.",
  "testing (basic knowledge)",
];

const ABOUT_TYPEWRITER_TEXTS = [
  "curiosity-driven.",
  "detail-oriented.",
  "always learning.",
  "creative at heart.",
];

function Hero({ onMenuClick, workMode = false, aboutMode = false, hideScrollIndicator = false }) {
  const activeTexts = workMode
    ? WORK_TYPEWRITER_TEXTS
    : aboutMode
      ? ABOUT_TYPEWRITER_TEXTS
      : HERO_TYPEWRITER_TEXTS;

  const { displayed, isDeleting } = useTypewriter({
    texts: activeTexts,
    typingSpeed: 75,
    deletingSpeed: 45,
    pauseAfterType: 2000,
    pauseAfterDelete: 350,
  });

  // ── Title ────────────────────────────────────────────────────
  const titleDim = workMode
    ? "Here is some of my"
    : aboutMode
      ? "A little bit"
      : "Hey, I'm";

  const titleBright = workMode
    ? "Work."
    : aboutMode
      ? "About me."
      : "Sofía Minaya.";

  // ── Subtitle ─────────────────────────────────────────────────
  const subtitleFixed = workMode
    ? "I have experience with"
    : aboutMode
      ? "I'm"
      : "I'm a";

  // ── Description ──────────────────────────────────────────────
  let descriptionNode;
  if (workMode) {
    descriptionNode = (
      <p className="hero__description">
        When I&apos;m not coding, you&apos;ll probably find me gaming, drawing,
        or going down a random creative rabbit hole.
      </p>
    );
  } else if (aboutMode) {
    descriptionNode = (
      <p className="hero__description">
        Hospitality industry survivor turned full-stack developer.
        Curious, resilient, and always chasing the next creative challenge.
      </p>
    );
  } else {
    descriptionNode = (
      <p className="hero__description">
        Passionate about creating, learning,
        <br />
        and sharing ideas through code and art.
      </p>
    );
  }

  const cursorClass = "hero__cursor" + (isDeleting ? " hero__cursor--deleting" : "");

  return (
    <section id="home" className="hero">
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
              {titleDim}{" "}
            </span>
            <span className="hero__title-line hero__title-line--bright">
              {titleBright}
            </span>
          </h1>

          <p className="hero__subtitle">
            <span className="hero__subtitle-fixed">{subtitleFixed}</span>
            {"\u00A0"}
            <span className="hero__subtitle-typewriter">
              {displayed}
              <span className={cursorClass} />
            </span>
          </p>

          {descriptionNode}
        </div>
      </div>

      {/* Indicador de scroll */}
      {!hideScrollIndicator && (
        <div className="hero__scroll">
          <ScrollIndicator />
        </div>
      )}
    </section>
  );
}

export default Hero;