import { Main } from "./ui/main-component";
import { createVectorsFromFiles } from "./behaviors/create-vectors-from-docs";
import { searchSimilarDocs } from "./behaviors/search-similar-documents";
import { Embedding } from "./model/embeddings";
import {
  retrieveEmbeddings,
  storeEmbeddings,
  retrieveFiles,
  storeFiles
} from "./db";

document.addEventListener("DOMContentLoaded", async () => {
  const data: { embeddings: Embedding[]; processedFiles: string[] } = {
    embeddings: (await retrieveEmbeddings()) ?? [],
    processedFiles: retrieveFiles("processedFiles") ?? []
  };
  const main: Main = document.querySelector("semantic-search");
  main.onFilesDropped = async (files: File[]) => {
    data.embeddings = await createVectorsFromFiles(files);
    storeEmbeddings(data.embeddings);
    storeFiles(
      "processedFiles",
      files.map((f) => f.name)
    );
  };
  main.onSearch = (query: string) => searchSimilarDocs(query, data.embeddings);
  main.numberOfFilesnDB = data.processedFiles.length;
});

window.customElements.define("semantic-search", Main);
