import { expect } from "@esm-bundle/chai";
import { createVectorsFromFiles } from "./create-vectors-from-docs";

describe("createVectorsFromDocs", () => {
  it("should return a list of embeddings", async () => {
    const vectors = await createVectorsFromFiles([
      new File(["content"], "path", { type: "text/plain" })
    ]);

    expect(vectors).to.have.lengthOf(1);
    expect(vectors[0].vector).to.have.lengthOf(384);
    expect(vectors[0].path).to.equal("path");
    expect(vectors[0].text).to.equal("content");
  });
});
