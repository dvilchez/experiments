const SEPARATOR = " ";

export function segmentByWords(content: string, maxWords: number): string[] {
  const words = content.split(SEPARATOR);
  const segmentsStartIndexes = range(0, words.length - 1, maxWords);
  console.log(segmentsStartIndexes);
  return segmentsStartIndexes.reduce((acc, startIndex) => {
    const segment = words
      .slice(startIndex, startIndex + maxWords)
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
