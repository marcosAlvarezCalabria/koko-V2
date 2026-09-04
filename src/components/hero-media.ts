export function getAdjacentSegmentIndexes(
  activeIndex: number,
  segmentCount: number
) {
  if (segmentCount <= 0) {
    return [];
  }

  const clampedIndex = Math.min(
    segmentCount - 1,
    Math.max(0, Math.trunc(activeIndex))
  );
  const firstIndex = Math.max(0, clampedIndex - 1);
  const lastIndex = Math.min(segmentCount - 1, clampedIndex + 1);

  return Array.from(
    { length: lastIndex - firstIndex + 1 },
    (_, offset) => firstIndex + offset
  );
}

export function getRenderedSegmentIndexes(
  requestedIndex: number,
  visibleIndex: number,
  segmentCount: number
) {
  return Array.from(
    new Set([
      ...getAdjacentSegmentIndexes(requestedIndex, segmentCount),
      visibleIndex
    ])
  )
    .filter((index) => index >= 0 && index < segmentCount)
    .sort((left, right) => left - right);
}

export function canPromoteVideoSegment(
  requestedIndex: number,
  candidateIndex: number,
  readyState: number,
  seeking: boolean
) {
  const haveCurrentData = 2;

  return (
    candidateIndex === requestedIndex &&
    readyState >= haveCurrentData &&
    !seeking
  );
}

export function getVideoSeekTime(
  requestedTime: number,
  firstDecodableTime: number
) {
  return Math.max(requestedTime, firstDecodableTime);
}
