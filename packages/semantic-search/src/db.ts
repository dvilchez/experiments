import Dexie, { Table } from "dexie";
type Embedding = { text: string; path?: string; vector: Float32Array };

const processedFilesKey = "processedFiles";

export function retrieveFiles() {
  const data = localStorage.getItem(processedFilesKey);
  return data ? JSON.parse(data) : null;
}

export function storeFiles(data: unknown) {
  localStorage.setItem(processedFilesKey, JSON.stringify(data));
}

export function storeEmbeddings(data: Embedding[]) {
  const db = new Embeddings();

  db.embeddings.bulkPut(data);
}

export function retrieveEmbeddings() {
  const db = new Embeddings();

  return db.embeddings.toArray();
}

export function resetDB() {
  const db = new Embeddings();
  db.delete();
  localStorage.removeItem(processedFilesKey);
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
