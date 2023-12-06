import { expect } from "@esm-bundle/chai";
import { calculateSimilarities, embed, toChunk } from "./embeddings";

describe("embeddings", () => {
  it("should return a list of embeddings", (done) => {
    embed([{ content: chunk }]).then((embeddings) => {
      expect(embeddings[0].vector).to.have.lengthOf(384);
      done();
    });
  });

  it("should return the collection of vector similarities", async () => {
    const queryVector = {
      path: "path",
      text: "food",
      vector: new Float32Array([1, 2, 3])
    };
    const vectors = [
      { path: "path", text: "content", vector: new Float32Array([4, 5, 6]) }
    ];

    const similarities = calculateSimilarities(queryVector, vectors);

    expect(similarities).to.eql([
      { path: "path", text: "content", score: 0.9746318461970762 }
    ]);
  });
});

describe("chunking", () => {
  it("should return a chunk", () => {
    const chunk = toChunk("chunk", "path");

    expect(chunk).to.eql({
      content: "chunk",
      path: "path"
    });
  });
});

const chunk = `Near a great forest there lived a poor woodcutter and his wife, and his two children; the boy's name was Hansel and the girl's Grethel. They had very little to bite or to sup, and once, when there was great dearth in the land, the man could not even gain the daily bread.`;
