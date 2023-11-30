import { Main } from "./ui/main-component";
import { createVectorsFromFiles } from "./behaviors/create-vectors-from-docs";
import { searchSimilarDocs } from "./behaviors/search-similar-documents";
import { Embedding } from "./model/embeddings";

const data: { embeddings: Embedding[]; processedFiles: string[] } = {
  embeddings: [],
  processedFiles: []
};

document.addEventListener("DOMContentLoaded", () => {
  const main: Main = document.querySelector("semantic-search");
  main.onFilesDropped = async (files: File[]) => {
    data.embeddings = await createVectorsFromFiles(files);
  };
  main.onSearch = (query: string) => searchSimilarDocs(query, data.embeddings);
});

window.customElements.define("semantic-search", Main);
