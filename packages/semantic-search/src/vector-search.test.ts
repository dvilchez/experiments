import { expect } from "@esm-bundle/chai";
import { cosinSimilarity } from "./vector-search";

it("should return score for two passed vectors", async () => {
  const vectorA = new Float32Array([1, 2, 3]);
  const vectorB = new Float32Array([4, 5, 6]);

  const score = cosinSimilarity(vectorA, vectorB);

  expect(score).to.eql(0.9746318461970762);
});
