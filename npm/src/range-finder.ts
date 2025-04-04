import { TextSegmentWalker } from "./internal/text-segment-walker.js";

export class RangeFinder {
  #textSegmentWalker: TextSegmentWalker;

  #segmentPosition = 0;

  #searchString: string | null = null;

  constructor(readonly node: Node) {
    this.#textSegmentWalker = new TextSegmentWalker(node);
  }

  findNext(
    searchString: string,
  ): Range | null {
    if (searchString === "") return null;

    this.#searchString = searchString;

    while (this.#textSegmentWalker.currentSegment) {
      const range = this.#findNextInCurrentSegment();
      if (range) return range;
      this.#textSegmentWalker.next();
      this.#segmentPosition = 0;
    }

    return null;
  }

  findAll(
    searchString: string,
  ): Range[] {
    const result = [];

    let range: Range | null;

    while ((range = this.findNext(searchString))) {
      result.push(range);
    }

    return result;
  }

  reset() {
    this.#textSegmentWalker.reset();
    this.#segmentPosition = 0;
  }

  #findNextInCurrentSegment(): Range | null {
    const segment = this.#textSegmentWalker.currentSegment;
    const text = this.#searchString;

    if (text == null) {
      throw new Error("Text is null");
    }

    if (segment == null) {
      throw new Error("Segment is null");
    }

    let range: Range | null = null;
    let position = this.#segmentPosition;

    const concat = (a: string | null, b: string | null) =>
      a == null || b == null ? null : a + b;

    for (
      let textContent = segment.charAt(position);
      textContent != null;
      textContent = concat(textContent, segment.charAt(++position))
    ) {
      const index = textContent.indexOf(text);
      if (index > -1) {
        const { node: startNode, offset: startOffset } = segment.nodeAt(
          this.#segmentPosition + index,
        );
        const { node: endNode, offset: endOffset } = segment.nodeAt(
          this.#segmentPosition + index + text.length - 1,
        );
        range = new Range();
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset + 1);
        position += text.length;
        break;
      }
    }

    return range;
  }
}
