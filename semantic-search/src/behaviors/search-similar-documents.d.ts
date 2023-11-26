import { Embedding } from "../model/embeddings";
export declare function searchSimilarDocs(query: string, vectors: Embedding[]): Promise<{
    text: string;
    score: number;
}[]>;
