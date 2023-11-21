import { pipeline } from "@xenova/transformers";

const modelName = "TaylorAI/gte-tiny";

export async function embed(
  chunk: string
): Promise<{ text: string; vector: Float32Array }> {
  const extractor = await pipeline("feature-extraction", modelName, {
    quantized: true
  });
  const embedding = await extractor(chunk, {
    pooling: "mean",
    normalize: true
  });

  return { text: chunk, vector: embedding.data };
}

export async function embedCollection(
  chunk: string[]
): Promise<{ text: string; vector: Float32Array }[]> {
  return Promise.all(chunk.map((chunk) => embed(chunk)));
}
