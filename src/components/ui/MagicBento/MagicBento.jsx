
import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import '../../../styles/ui/MagicBento/MagicBento.css';

// ── Constants ──────────────────────────────────────────────────
const DEFAULT_PARTICLE_COUNT  = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
// Colour matched to Iridescence: color={[0.5, 0.6, 0.8]} → rgb(128,153,204)
const DEFAULT_GLOW_COLOR = '128, 153, 204';
const MOBILE_BREAKPOINT  = 768;

// ── Helpers ────────────────────────────────────────────────────
const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = radius => ({
  proximity:    radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect      = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width)  * 100;
  const relativeY = ((mouseY - rect.top)  / rect.height) * 100;

  card.style.setProperty('--glow-x',         `${relativeX}%`);
  card.style.setProperty('--glow-y',         `${relativeY}%`);
  card.style.setProperty('--glow-intensity',  glow.toString());
  card.style.setProperty('--glow-radius',    `${radius}px`);
};

// ── ParticleCard ───────────────────────────────────────────────
export const ParticleCard = ({
  children,
  className       = '',
  style,
  disableAnimations = false,
  particleCount   = DEFAULT_PARTICLE_COUNT,
  glowColor       = DEFAULT_GLOW_COLOR,
  enableTilt      = false,
  clickEffect     = true,
  enableMagnetism = false,
}) => {
  const cardRef                = useRef(null);
  const particlesRef           = useRef([]);
  const timeoutsRef            = useRef([]);
  const isHoveredRef           = useRef(false);
  const memoizedParticles      = useRef([]);
  const particlesInitialized   = useRef(false);
  const magnetismAnimationRef  = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
        onComplete: () => particle.parentNode?.removeChild(particle),
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      }
      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleMouseMove = e => {
      if (!enableTilt && !enableMagnetism) return;
      const rect    = element.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        gsap.to(element, {
          rotateX: ((y - centerY) / centerY) * -10,
          rotateY: ((x - centerX) / centerX) *  10,
          duration: 0.1, ease: 'power2.out', transformPerspective: 1000,
        });
      }
      if (enableMagnetism) {
        magnetismAnimationRef.current = gsap.to(element, {
          x: (x - centerX) * 0.05,
          y: (y - centerY) * 0.05,
          duration: 0.3, ease: 'power2.out',
        });
      }
    };

    const handleClick = e => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove',  handleMouseMove);
    element.addEventListener('click',      handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove',  handleMouseMove);
      element.removeEventListener('click',      handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card magic-bento-card--border-glow particle-container ${className}`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

// ── GlobalSpotlight ────────────────────────────────────────────
export const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled           = true,
  spotlightRadius   = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor         = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef     = useRef(null);
  const isInsideSection  = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.06) 0%,
        rgba(${glowColor}, 0.03) 15%,
        rgba(${glowColor}, 0.015) 25%,
        rgba(${glowColor}, 0.008) 40%,
        rgba(${glowColor}, 0.003) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section     = gridRef.current.closest('.about');
      const rect        = section?.getBoundingClientRect();
      const mouseInside = rect &&
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardRect    = card.getBoundingClientRect();
        const centerX     = cardRect.left + cardRect.width  / 2;
        const centerY     = cardRect.top  + cardRect.height / 2;
        const distance    = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDist = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDist);

        let glowIntensity = 0;
        if (effectiveDist <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDist <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDist) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });

      const targetOpacity = minDistance <= proximity
        ? 0.35
        : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.35
          : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      }
    };

    document.addEventListener('mousemove',  handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove',  handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// ── useMobileDetection ─────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};