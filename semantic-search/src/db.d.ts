type Embedding = {
    text: string;
    path?: string;
    vector: Float32Array;
};
export declare function retrieveFiles(): any;
export declare function storeFiles(data: unknown): void;
export declare function storeEmbeddings(data: Embedding[]): void;
export declare function retrieveEmbeddings(): import("dexie").PromiseExtended<Embedding[]>;
export declare function resetDB(): void;
export {};
