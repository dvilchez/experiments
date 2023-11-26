import { Pipeline, pipeline } from "@xenova/transformers";
import { cosinSimilarity } from "./vector-search";

const modelName = "Xenova/all-MiniLM-L6-v2";

export type Embedding = {
  text: string;
  vector: Float32Array;
};

export const { embed, embedCollection, calculateSimilarities } = (function () {
  let extractor: Pipeline;
  async function getExtractor() {
    if (!extractor) {
      extractor = await pipeline("feature-extraction", modelName, {
        quantized: true
      });
    }

    return extractor;
  }

  async function embed(chunk: string): Promise<Embedding> {
    const extractor = await getExtractor();
    const embedding = await extractor(chunk, {
      pooling: "mean",
      normalize: true
    });

    return { text: chunk, vector: embedding.data };
  }

  async function embedCollection(chunk: string[]): Promise<Embedding[]> {
    return Promise.all(chunk.map((chunk) => embed(chunk)));
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

  return { embed, embedCollection, calculateSimilarities };
})();
