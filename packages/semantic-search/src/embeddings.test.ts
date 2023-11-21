import { expect } from "@esm-bundle/chai";
import { calculateSimilarities, embed } from "./embeddings";

it("should return a list of embeddings", (done) => {
  embed(chunk).then((embeddings) => {
    expect(embeddings.vector).to.have.lengthOf(384);
    done();
  });
});

it("should return the collection of vector similarities", async () => {
  const queryVector = {
    text: "food",
    vector: new Float32Array([1, 2, 3])
  };
  const vectors = [{ text: "content", vector: new Float32Array([4, 5, 6]) }];

  const similarities = calculateSimilarities(queryVector, vectors);

  expect(similarities).to.eql([{ text: "content", score: 0.9746318461970762 }]);
});

const chunk = `Near a great forest there lived a poor woodcutter and his wife, and his two children; the boy's name was Hansel and the girl's Grethel. They had very little to bite or to sup, and once, when there was great dearth in the land, the man could not even gain the daily bread.`;
