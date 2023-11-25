export type Embedding = {
    text: string;
    vector: Float32Array;
};
export declare function embed(chunk: string): Promise<Embedding>;
export declare function embedCollection(chunk: string[]): Promise<Embedding[]>;
export declare function calculateSimilarities(queryEmbeddings: Embedding, chunksEmbeddings: Embedding[]): {
    text: string;
    score: number;
}[];
