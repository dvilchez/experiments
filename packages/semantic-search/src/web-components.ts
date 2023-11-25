import { Main } from "./main-component";
import { segmentByWords } from "./segmentation";
import { embedCollection, Embedding } from "./embeddings";
import { semanticSearch } from "./semantic-search";

const data: { embeddings: Embedding[]; processedFiles: string[] } = {
  embeddings: [],
  processedFiles: []
};

document.addEventListener("DOMContentLoaded", () => {
  const main: Main = document.querySelector("semantic-search");
  main.onFilesDropped = async (files: File[]) => {
    const chunks = await files.reduce(
      async (acc: Promise<string[]>, file: File) => {
        const chunks = await acc;
        const text = await file.text();

        return [...chunks, ...segmentByWords(text, 10)];
      },
      Promise.resolve([])
    );
    data.embeddings = await embedCollection(chunks);
  };

  main.onSearch = async (query: string) =>
    (await semanticSearch(query, data.embeddings)).sort(
      (a, b) => b.score - a.score
    );
});

window.customElements.define("semantic-search", Main);
