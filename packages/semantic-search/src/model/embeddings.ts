import { Pipeline, pipeline } from "@xenova/transformers";
import { cosinSimilarity } from "./vector-search";

const modelName = "Xenova/all-MiniLM-L6-v2";

export type Embedding = {
  text: string;
  vector: Float32Array;
};

export const { embed, calculateSimilarities } = (function () {
  let extractor: Pipeline;
  async function getExtractor() {
    if (!extractor) {
      extractor = await pipeline("feature-extraction", modelName, {
        quantized: true
      });
    }

    return extractor;
  }

  async function embed(chunk: string[]): Promise<Embedding[]> {
    const extractor = await getExtractor();
    const embeddings = await extractor(chunk, {
      pooling: "mean",
      normalize: true
    });
    return embeddings.tolist().map((vector: Float32Array, index: number) => {
      return { text: chunk[index], vector };
    });
  }

  function calculateSimilarities(
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

  return { embed, calculateSimilarities };
})();
