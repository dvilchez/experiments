export type Embedding = {
    path?: string;
    text: string;
    vector: Float32Array;
};
export type Chunk = {
    path?: string;
    content: string;
};
export declare function toChunk(content: string, path: string): Chunk;
export declare const embed: (chunks: Chunk[]) => Promise<Embedding[]>, calculateSimilarities: (queryEmbeddings: Embedding, chunksEmbeddings: Embedding[]) => {
    text: string;
    path: string;
    score: number;
}[];
