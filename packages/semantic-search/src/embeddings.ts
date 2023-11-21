import { pipeline } from "@xenova/transformers";
import { cosinSimilarity } from "./vector-search";

const modelName = "TaylorAI/gte-tiny";

export type Embedding = {
  text: string;
  vector: Float32Array;
};

export async function embed(chunk: string): Promise<Embedding> {
  const extractor = await pipeline("feature-extraction", modelName, {
    quantized: true
  });
  const embedding = await extractor(chunk, {
    pooling: "mean",
    normalize: true
  });

  return { text: chunk, vector: embedding.data };
}

export async function embedCollection(chunk: string[]): Promise<Embedding[]> {
  return Promise.all(chunk.map((chunk) => embed(chunk)));
}

export function calculateSimilarities(
  queryEmbeddings: Embedding,
  chunksEmbeddings: Embedding[]
): { text: string; score: number }[] {
  return chunksEmbeddings.map((chunkEmbeddings) => {
    return {
      text: chunkEmbeddings.text,
      score: cosinSimilarity(queryEmbeddings.vector, chunkEmbeddings.vector)
    };
  });
}
