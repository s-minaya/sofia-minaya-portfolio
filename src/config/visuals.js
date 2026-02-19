// Centralized visual defaults for performant fallbacks and mobile tuning
export const DEFAULT_PARTICLE_COLORS = ["#ffffff", "#aaaaaa", "#666666"];
export const DEFAULT_PARTICLE_BASE_SIZE = 50;
export const DEFAULT_PARTICLE_COUNT_DESKTOP = 800;
export const DEFAULT_PARTICLE_COUNT_MOBILE = 200;

export function getDefaultParticleCount(isMobile) {
  return isMobile
    ? DEFAULT_PARTICLE_COUNT_MOBILE
    : DEFAULT_PARTICLE_COUNT_DESKTOP;
}

export function getDefaultPixelRatio() {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, 2);
}
