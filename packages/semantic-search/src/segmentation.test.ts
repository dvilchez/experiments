import { segmentByWords } from "./segmentation";

describe("segment", () => {
  it("should return a list of segments with a length inferior to provided value", async () => {
    const segments = segmentByWords(await randomListOfWords(), 100);
    expect(segments.length).toBe(2);
    expect(segments[0].split(" ").length).toBeGreaterThan(100);
    expect(segments[1].split(" ").length).toBeLessThan(100);
  });

  it("should generate overlapping segments", async () => {
    const segments = segmentByWords(await randomListOfWords(), 100);
    expect(segments.length).toBe(2);
    expect(segments[1].split(" ").length).toBeGreaterThan(50);
    expect(segments[1].split(" ").length).toBeLessThan(100);
  });
});

async function randomListOfWords() {
  return Promise.resolve(
    `urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget`
  );
}
