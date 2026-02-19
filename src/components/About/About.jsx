/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Gamepad2, Palette, Music, Sprout, FolderGit2, Clock, Coffee, Plane, ChefHat } from "lucide-react";
import Particles from "../ui/Particles/Particles";
import "../../styles/About/About.scss";
import portraitGif from "../../images/portrait.gif";

// ── Stats data ─────────────────────────────────────────────────
const STATS = [
  { value: 18,   suffix: "",  label: "projects built",   icon: FolderGit2 },
  { value: 1040, suffix: "+", label: "hours of code",    icon: Clock      },
  { value: 260,  suffix: "+", label: "coffees consumed", icon: Coffee     },
];

// ── Animated counter hook ──────────────────────────────────────
function useCountUp(target, duration = 1800, startOnMount = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
}

// ── Single stat item ───────────────────────────────────────────
function StatItem({ value, suffix, label, icon: Icon, delay = 0 }) {
  const { count, start } = useCountUp(value, 1600);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(start, delay); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [start, delay]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-item__icon" aria-hidden="true">
        <Icon size={18} strokeWidth={1.5} />
      </span>
      <div className="stat-item__number">
        {count.toLocaleString("en-US")}<span className="stat-item__suffix">{suffix}</span>
      </div>
      <span className="stat-item__label">{label}</span>
    </div>
  );
}

// ── Animated Stats Component ───────────────────────────────────
function AnimatedStats() {
  return (
    <div className="about-cell about-cell--stats">
      <span className="about-cell__label">by the numbers</span>
      <div className="stats__grid">
        {STATS.map((s, i) => (
          <StatItem key={s.label} {...s} delay={i * 200} />
        ))}
      </div>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────
const FUN_FACTS = [
  { icon: Gamepad2, label: "Gamer",            detail: "MMORPGs, shooters & cozy games." },
  { icon: Palette,  label: "Artist",           detail: "Traditional & digital drawing, sculpture." },
  { icon: Music,    label: "Music lover",      detail: "Jazz hop & metal, behind the drums." },
  { icon: Sprout,   label: "Forever learning", detail: "Iterating on myself." },
  { icon: Plane,    label: "Japan lover",      detail: "Dreaming of visiting someday." },
  { icon: ChefHat,  label: "Home cook",        detail: "Fusing Asian & Spanish flavours." },
];

const PERSONAL = [
  { key: "Based in",    value: "Spain 🇪🇸" },
  { key: "Languages",   value: <span>Spanish · English ·<br />Japanese (learning)</span> },
  { key: "Background", value: "Hospitality → Web Dev" },
  { key: "Currently",  value: "Open to opportunities" },
];

// ── Live Clock ─────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");
  return (
    <div className="portrait-clock" aria-label="Local time" aria-live="off">
      <span className="portrait-clock__location">Granada, ES</span>
      <div className="portrait-clock__display">
        <span className="portrait-clock__digits">{hh}</span>
        <span className="portrait-clock__sep">:</span>
        <span className="portrait-clock__digits">{mm}</span>
        <span className="portrait-clock__sep portrait-clock__sep--dim">:</span>
        <span className="portrait-clock__digits portrait-clock__digits--sec">{ss}</span>
      </div>
    </div>
  );
}

// ── Vinyl Record ───────────────────────────────────────────────
function VinylRecord() {
  const discRef = useRef(null);
  useEffect(() => {
    const disc = discRef.current;
    if (!disc) return;
    const onVisibility = () => {
      disc.style.animationPlayState = document.hidden ? "paused" : "running";
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <a
      href="https://open.spotify.com/playlist/7DwFC1PeTjsiTofr4BPLi4"
      target="_blank"
      rel="noopener noreferrer"
      className="about-cell about-cell--vinyl"
      aria-label="Open coding playlist on Spotify"
    >
      <div className="vinyl__disc" ref={discRef} aria-hidden="true">
        <div className="vinyl__grooves">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={"vinyl__groove vinyl__groove--" + i} />
          ))}
        </div>
        <div className="vinyl__label">
          <div className="vinyl__label-inner">
            <span className="vinyl__label-title">Lo-fi</span>
            <span className="vinyl__label-sub">Chill Beats</span>
          </div>
        </div>
        <div className="vinyl__hole" />
        <div className="vinyl__shine" />
      </div>
      <div className="vinyl__caption">
        <span className="vinyl__caption-title">My coding playlist</span>
        <span className="vinyl__caption-sub">Open in Spotify ↗</span>
      </div>
    </a>
  );
}

// ── About ──────────────────────────────────────────────────────
function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">

      <div className="about__bg" aria-hidden="true">
        <Particles
          particleColors={["#ffffff", "#aaaaaa", "#666666"]}
          particleCount={800}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={50}
          alphaParticles
          disableRotation={false}
          pixelRatio={Math.min(window.devicePixelRatio, 2)}
        />
      </div>

      <div className="about__inner">

        {/* ─────────────────────────────────────────────────────
                              CELDA A
        ───────────────────────────────────────────────────── */}
        <div className="about-cell about-cell--portrait">

          <LiveClock />

          <div className="about-cell__portrait-wrap">
            <img
              src={portraitGif}
              alt="Pixel art self-portrait of Sofía Minaya"
              className="about-cell__portrait-img"
              draggable="false"
            />
          </div>

          <span className="about-cell__portrait-caption">
            self-portrait · pixel art
          </span>

          <div className="portrait-badge">
            <span className="portrait-badge__dot" aria-hidden="true" />
            <span className="portrait-badge__text">Available for work</span>
          </div>

          {/* Cita */}
          <div className="portrait-quote">
            <span className="portrait-quote__mark" aria-hidden="true">&ldquo;</span>
            <span className="portrait-quote__jp">花が咲いたよ</span>
            <span className="portrait-quote__en">The flower has bloomed.</span>
            <span className="portrait-quote__mark portrait-quote__mark--close" aria-hidden="true">&rdquo;</span>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────
                             CELDA B
        ───────────────────────────────────────────────────── */}
        <div className="about-cell about-cell--bio">
          <h2 className="about-cell__heading" id="about-title">
            <span className="about-cell__heading-dim">A little bit</span>
            <span className="about-cell__heading-bright">about me.</span>
          </h2>
          <p className="about-cell__bio-text">
            After a professional stage in the hospitality industry, I transitioned into web
            development — a field that truly sparked my passion and where I&apos;m motivated to keep growing.
            Analytical, organised, resilient, and always chasing the next creative challenge.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────
                             CELDA C
        ───────────────────────────────────────────────────── */}
        <VinylRecord />

        {/* ─────────────────────────────────────────────────────
                             CELDA D
        ───────────────────────────────────────────────────── */}
        <div className="about-cell about-cell--personal">
          <span className="about-cell__label">details</span>
          <dl className="about-cell__personal-list">
            {PERSONAL.map(({ key, value }) => (
              <div key={key} className="about-cell__personal-row">
                <dt className="about-cell__personal-key">{key}</dt>
                <dd className="about-cell__personal-val">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ─────────────────────────────────────────────────────
                            CELDA E:
        ───────────────────────────────────────────────────── */}
        <div className="about-cell about-cell--interests">
          <span className="about-cell__label">outside of code</span>
          <ul className="about-cell__facts">
            {FUN_FACTS.map(({ icon: Icon, label, detail }) => (
              <li key={label} className="about-cell__fact">
                <span className="about-cell__fact-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <span className="about-cell__fact-body">
                  <strong className="about-cell__fact-label">{label}</strong>
                  <span className="about-cell__fact-detail">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ─────────────────────────────────────────────────────
                             CELDA F
        ───────────────────────────────────────────────────── */}
        <AnimatedStats />

      </div>
    </section>
  );
}

export default About;