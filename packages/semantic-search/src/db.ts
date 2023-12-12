import Dexie, { Table } from "dexie";
type Embedding = { text: string; path?: string; vector: Float32Array };

export function retrieveFiles(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function storeFiles(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function storeEmbeddings(data: Embedding[]) {
  const db = new Embeddings();

  db.embeddings.bulkPut(data);
}

export function retrieveEmbeddings() {
  const db = new Embeddings();

  return db.embeddings.toArray();
}

class Embeddings extends Dexie {
  embeddings!: Table<Embedding>;

  constructor() {
    super("embeddings");
    this.version(1).stores({
      embeddings: "++id"
    });
  }
}
