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

async function restoreState(): Promise<{
  embeddings: Embedding[];
  processedFiles: string[];
}> {
  return {
    embeddings: (await retrieveEmbeddings()) ?? [],
    processedFiles: retrieveFiles() ?? []
  };
}

async function setState(embeddings: Embedding[], processedFiles: string[]) {
  const data = { embeddings, processedFiles };
  storeEmbeddings(data.embeddings);
  storeFiles(data.processedFiles);

  return data;
}

document.addEventListener("DOMContentLoaded", async () => {
  let data = await restoreState();
  const main: Main = document.querySelector("semantic-search");
  main.onFilesDropped = async (files: File[]) => {
    data = await setState(
      await createVectorsFromFiles(files),
      files.map((f) => f.name)
    );
  };
  main.onClear = async () => {
    data = await setState([], []);
    main.numberOfFilesnDB = data.processedFiles.length;
  };
  main.onSearch = (query: string) => searchSimilarDocs(query, data.embeddings);
  main.numberOfFilesnDB = data.processedFiles.length;
});

window.customElements.define("semantic-search", Main);
