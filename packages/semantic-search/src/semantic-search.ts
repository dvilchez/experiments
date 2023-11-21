import { calculateSimilarities, embed, Embedding } from "./embeddings";

export async function semanticSearch(query: string, embeddings: Embedding[]) {
  const queryEmbeddings = await embed(query);

  return calculateSimilarities(queryEmbeddings, embeddings);
}
