import { pipeline } from "@xenova/transformers";

const modelName = "TaylorAI/gte-tiny";

export async function embed(chunk: string): Promise<string> {
  const extractor = await pipeline("feature-extraction", modelName, {
    quantized: true
  });
  const embedding = await extractor(chunk, {
    pooling: "mean",
    normalize: true
  });

  return embedding.data;
}
