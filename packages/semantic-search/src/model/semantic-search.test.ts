import { expect } from "@esm-bundle/chai";
import { segmentByWords } from "./segmentation";
import { embed, Embedding } from "./embeddings";
import { semanticSearch } from "./semantic-search";

describe("semanticSearch", () => {
  let embeddings: Embedding[];
  beforeEach(async () => {
    const chunks = segmentByWords(text, 100).map((chunk) => ({
      content: chunk
    }));
    embeddings = await embed(chunks);
  });

  it("should return a list of documents related with the query text", async () => {
    const query = "food";

    const similarities = await semanticSearch(query, embeddings);

    const coincidence = similarities.sort((a, b) => b.score - a.score)[0];
    expect(coincidence.score).to.eql(0.7772451468725787);
    expect(coincidence.text).to.eql(highScoreChunk);
  });
});

const highScoreChunk = `children, saying, "Get up, you lazy bones; we are going into the forest to cut wood." Then she gave each of them a piece of bread, and said, "That is for dinner, and you must not eat it before then, for you will get no more." Grethel carried the bread under her apron, for Hansel had his pockets full of the flints. Then they set off all together on their way to the forest. When they had gone a little way Hansel stood still and looked back towards the house, and this he did again and again, till his father said to him, "Hansel, what are you looking at? take`;
const text = `Near a great forest there lived a poor woodcutter and his wife, and his two children; the boy's name was Hansel and the girl's Grethel. They had very little to bite or to sup, and once, when there was great dearth in the land, the man could not even gain the daily bread. As he lay in bed one night thinking of this, and turning and tossing, he sighed heavily, and said to his wife, "What will become of us? we cannot even feed our children; there is nothing left for ourselves."
"I will tell you what, husband," answered the wife; "we will take the children early in the morning into the forest, where it is thickest; we will make them a fire, and we will give each of them a piece of bread, then we will go to our work and leave them alone; they will never find the way home again, and we shall be quit of them."
"No, wife," said the man, "I cannot do that; I cannot find in my heart to take my children into the forest and to leave them there alone; the wild animals would soon come and devour them." - "O you fool," said she, "then we will all four starve; you had better get the coffins ready," and she left him no peace until he consented. "But I really pity the poor children," said the man.
The two children had not been able to sleep for hunger, and had heard what their step-mother had said to their father. Grethel wept bitterly, and said to Hansel, "It is all over with us."
"Do be quiet, Grethel," said Hansel, "and do not fret; 1 will manage something." And when the parents had gone to sleep he got up, put on his little coat, opened the back door, and slipped out. The moon was shining brightly, and the white flints that lay in front of the house glistened like pieces of silver. Hansel stooped and filled the little pocket of his coat as full as it would hold. Then he went back again, and said to Grethel, "Be easy, dear little sister, and go to sleep quietly; God will not forsake us," and laid himself down again in his bed. When the day was breaking, and before the sun had risen, the wife came and awakened the two children, saying, "Get up, you lazy bones; we are going into the forest to cut wood." Then she gave each of them a piece of bread, and said, "That is for dinner, and you must not eat it before then, for you will get no more." Grethel carried the bread under her apron, for Hansel had his pockets full of the flints. Then they set off all together on their way to the forest. When they had gone a little way Hansel stood still and looked back towards the house, and this he did again and again, till his father said to him, "Hansel, what are you looking at? take care not to forget your legs."
"O father," said Hansel, "lam looking at my little white kitten, who is sitting up on the roof to bid me good-bye." - "You young fool," said the woman, "that is not your kitten, but the sunshine on the chimney-pot." Of course Hansel had not been looking at his kitten, but had been taking every now and then a flint from his pocket and dropping it on the road. When they reached the middle of the forest the father told the children to collect wood to make a fire to keep them, warm; and Hansel and Grethel gathered brushwood enough for a little mountain; and it was set on fire, and when the flame was burning quite high the wife said, "Now lie down by the fire and rest yourselves, you children, and we will go and cut wood; and when we are ready we will come and fetch you."
So Hansel and Grethel sat by the fire, and at noon they each ate their pieces of bread. They thought their father was in the wood all the time, as they seemed to hear the strokes of the axe: but really it was only a dry branch hanging to a withered tree that the wind moved to and fro. So when they had stayed there a long time their eyelids closed with weariness, and they fell fast asleep.
When at last they woke it was night, and Grethel began to cry, and said, "How shall we ever get out of this wood? "But Hansel comforted her, saying, "Wait a little while longer, until the moon rises, and then we can easily find the way home." And when the full moon got up Hansel took his little sister by the hand, and followed the way where the flint stones shone like silver, and showed them the road. They walked on the whole night through, and at the break of day they came to their father's house. They knocked at the door, and when the wife opened it and saw that it was Hansel and Grethel she said, "You naughty children, why did you sleep so long in the wood? we thought you were never coming home again!" But the father was glad, for it had gone to his heart to leave them both in the woods alone.
Not very long after that there was again great scarcity in those parts, and the children heard their mother say at night in bed to their father, "Everything is finished up; we have only half a loaf, and after that the tale comes to an end. The children must be off; we will take them farther into the wood this time, so that they shall not be able to find the way back again; there is no other way to manage." The man felt sad at heart, and he thought, "It would better to share one's last morsel with one's children." But the wife would listen to nothing that he said, but scolded and reproached him. He who says A must say B too, and when a man has given in once he has to do it a second time.`;
