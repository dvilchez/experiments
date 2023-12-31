import { calculateSimilarities, embed, Embedding } from "./embeddings";

export async function semanticSearch(query: string, embeddings: Embedding[]) {
  const queryEmbeddings = await embed([{ content: query }]);

  return calculateSimilarities(queryEmbeddings[0], embeddings);
}
