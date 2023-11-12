import { search } from "./search";

describe("semantic search", () => {
  it("should return a list of documents", async () => {
    const docs = await search("test");
    console.log(docs);
    expect(docs).toHaveLength(1);
  });
});
