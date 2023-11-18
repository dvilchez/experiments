import { expect } from "@esm-bundle/chai";
import { embed } from "./embeddings";

it("should return a list of embeddings", (done) => {
  embed(chunk).then((embeddings) => {
    expect(embeddings).to.have.lengthOf(384);
    done();
  });
});

const chunk = `Near a great forest there lived a poor woodcutter and his wife, and his two children; the boy's name was Hansel and the girl's Grethel. They had very little to bite or to sup, and once, when there was great dearth in the land, the man could not even gain the daily bread.`;
