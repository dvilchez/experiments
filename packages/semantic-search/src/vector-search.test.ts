import { expect } from "@esm-bundle/chai";
import { calculateSimilarities } from "./vector-search";

it("should return the collection of vector similarities", async () => {
  const queryVector = {
    text: "food",
    vector: new Float32Array([1, 2, 3])
  };
  const vectors = [{ text: "content", vector: new Float32Array([4, 5, 6]) }];

  const similarities = calculateSimilarities(queryVector, vectors);

  expect(similarities).to.eql([{ text: "content", score: 0.9746318461970762 }]);
});
