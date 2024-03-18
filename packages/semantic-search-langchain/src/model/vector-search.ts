export const cosinSimilarity = (
  vecA: Float32Array,
  vecB: Float32Array
): number => {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must be of the same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) {
    throw new Error("Cannot calculate cosine similarity for a zero vector");
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};
