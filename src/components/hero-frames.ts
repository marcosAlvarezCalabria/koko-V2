export const HERO_FRAME_COUNT = 80;
export const HERO_FRAME_WINDOW_RADIUS = 4;
export const HERO_FRAME_MAX_RETRIES = 2;
const heroFrameDirectory = "/images/hero-frames";

export function getHeroFrameFileName(index: number) {
  return `frame-${String(index + 1).padStart(3, "0")}.webp`;
}

export function getHeroFrameSource(index: number) {
  return `${heroFrameDirectory}/${getHeroFrameFileName(index)}`;
}

export function shouldRetryFrameLoad(
  failedAttemptCount: number,
  maxRetries = HERO_FRAME_MAX_RETRIES
) {
  return failedAttemptCount <= maxRetries;
}
export function getFrameIndex(progress: number, frameCount: number) {
  if (frameCount <= 1) {
    return 0;
  }

  const safeProgress = Number.isFinite(progress) ? progress : 0;
  const clampedProgress = Math.min(1, Math.max(0, safeProgress));

  return Math.round(clampedProgress * (frameCount - 1));
}

export function getNearestLoadedFrameIndex(
  targetIndex: number,
  loadedIndexes: ReadonlySet<number>
) {
  let nearestIndex: number | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const index of loadedIndexes) {
    const distance = Math.abs(index - targetIndex);

    if (
      distance < nearestDistance ||
      (distance === nearestDistance &&
        (nearestIndex === null || index < nearestIndex))
    ) {
      nearestIndex = index;
      nearestDistance = distance;
    }
  }

  return nearestIndex;
}

export function getFrameWindowIndexes(
  targetIndex: number,
  frameCount: number,
  windowRadius: number
) {
  if (frameCount <= 0) {
    return [];
  }

  const clampedTarget = Math.min(
    frameCount - 1,
    Math.max(0, Math.trunc(targetIndex))
  );
  const safeRadius = Math.max(0, Math.trunc(windowRadius));
  const firstIndex = Math.max(0, clampedTarget - safeRadius);
  const lastIndex = Math.min(frameCount - 1, clampedTarget + safeRadius);
  const indexes = new Set<number>([0]);

  for (let index = firstIndex; index <= lastIndex; index += 1) {
    indexes.add(index);
  }

  return Array.from(indexes).sort((left, right) => left - right);
}
export function getFrameLoadOrder(
  targetIndex: number,
  frameCount: number,
  loadedIndexes: ReadonlySet<number>,
  loadingIndexes: ReadonlySet<number>,
  windowRadius = 4
) {
  if (frameCount <= 0) {
    return [];
  }

  const clampedTarget = Math.min(
    frameCount - 1,
    Math.max(0, Math.trunc(targetIndex))
  );
  const order: number[] = [];

  const safeRadius = Math.max(0, Math.trunc(windowRadius));

  for (let distance = 0; distance <= safeRadius; distance += 1) {
    const candidates =
      distance === 0
        ? [clampedTarget]
        : [clampedTarget - distance, clampedTarget + distance];

    for (const index of candidates) {
      if (
        index >= 0 &&
        index < frameCount &&
        !loadedIndexes.has(index) &&
        !loadingIndexes.has(index)
      ) {
        order.push(index);
      }
    }
  }

  return order;
}
