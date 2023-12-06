import { Embedding } from "./embeddings";
export declare function semanticSearch(query: string, embeddings: Embedding[]): Promise<{
    text: string;
    path: string;
    score: number;
}[]>;
