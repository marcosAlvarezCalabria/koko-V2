const HERO_LOGO_START_SECONDS = 7.25;

export function isHeroLogoVisible(currentTimeSeconds: number): boolean {
  return currentTimeSeconds >= HERO_LOGO_START_SECONDS;
}
