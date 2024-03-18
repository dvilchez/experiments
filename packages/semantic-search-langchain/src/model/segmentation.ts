const SEPARATOR = " ";

export function segmentByWords(content: string, maxWords: number): string[] {
  const overlapping = 10;
  const words = content.split(SEPARATOR);
  const segmentsStartIndexesWithOverlapping = range(
    0,
    words.length - 1,
    maxWords
  ).map((n, i) => (i === 0 ? n : n - overlapping));
  const endIndexWithOverlapping = (startIndex: number) =>
    startIndex + maxWords + overlapping;

  return segmentsStartIndexesWithOverlapping.reduce((acc, startIndex) => {
    const segment = words
      .slice(startIndex, endIndexWithOverlapping(startIndex))
      .join(SEPARATOR);
    return [...acc, segment];
  }, []);
}

function range(start: number, stop: number, step: number): number[] {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}
