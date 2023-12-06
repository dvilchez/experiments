import { Pipeline, pipeline } from "@xenova/transformers";
import { cosinSimilarity } from "./vector-search";

const modelName = "Xenova/all-MiniLM-L6-v2";

export type Embedding = {
  path?: string;
  text: string;
  vector: Float32Array;
};

export type Chunk = {
  path?: string;
  content: string;
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

  async function embed(chunks: Chunk[]): Promise<Embedding[]> {
    const extractor = await getExtractor();
    const embeddings = await extractor(
      chunks.map((chunk) => chunk.content),
      {
        pooling: "mean",
        normalize: true
      }
    );
    return embeddings.tolist().map((vector: Float32Array, index: number) => {
      return { path: chunks[index].path, text: chunks[index].content, vector };
    });
  }

  function calculateSimilarities(
    queryEmbeddings: Embedding,
    chunksEmbeddings: Embedding[]
  ): { text: string; path: string; score: number }[] {
    return chunksEmbeddings.map((chunkEmbeddings) => {
      return {
        text: chunkEmbeddings.text,
        path: chunkEmbeddings.path,
        score: cosinSimilarity(queryEmbeddings.vector, chunkEmbeddings.vector)
      };
    });
  }

  return { embed, calculateSimilarities };
})();
