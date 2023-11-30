export type Embedding = {
    text: string;
    vector: Float32Array;
};
export declare const embed: (chunk: string[]) => Promise<Embedding[]>, calculateSimilarities: (queryEmbeddings: Embedding, chunksEmbeddings: Embedding[]) => {
    text: string;
    score: number;
}[];
