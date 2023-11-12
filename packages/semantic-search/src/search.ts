import { AutoTokenizer } from "@xenova/transformers";

export async function search(content: string) {
  const tokenizer = await AutoTokenizer.from_pretrained(
    "sentence-transformers/all-mpnet-base-v2"
  );
  // const model = await AutoModel.from_pretrained(
  //   "sentence-transformers/all-mpnet-base-v2"
  // );

  const inputs_ids = tokenizer(content);
  console.log(inputs_ids);
  return inputs_ids;
}
