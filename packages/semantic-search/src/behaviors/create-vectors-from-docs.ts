import { segmentByWords } from "../model/segmentation";
import { embed } from "../model/embeddings";

export async function createVectorsFromFiles(files: File[]) {
  const chunks = await files.reduce(
    async (acc: Promise<string[]>, file: File) => {
      const chunks = await acc;
      const text = await file.text();

      return [...chunks, ...segmentByWords(text, 100)];
    },
    Promise.resolve([])
  );

  return await embed(chunks);
}
