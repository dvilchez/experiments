import { Embedding } from "../model/embeddings";
import { semanticSearch } from "../model/semantic-search";

export async function searchSimilarDocs(query: string, vectors: Embedding[]) {
  return (await semanticSearch(query, vectors)).sort(
    (a, b) => b.score - a.score
  );
}
