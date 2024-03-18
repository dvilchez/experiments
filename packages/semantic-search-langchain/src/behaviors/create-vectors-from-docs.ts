import { segmentByWords } from "../model/segmentation";
import { Chunk, embed, Embedding, toChunk } from "../model/embeddings";

export async function createVectorsFromFiles(
  files: File[]
): Promise<Embedding[]> {
  const chunks: Chunk[] = await files.reduce(
    async (acc: Promise<string[]>, file: File) => {
      const chunks = await acc;
      const text = await file.text();

      return [
        ...chunks,
        ...segmentByWords(text, 100).map((chunk) => toChunk(chunk, file.name))
      ];
    },
    Promise.resolve([])
  );

  return await embed(chunks);
}
