import { RangeMap } from './range-map.js';
import { SharedTreeWalker } from './shared-tree-walker.js';

export class TextSegment {
  #nodeRangeMap = new RangeMap<Node>();

  #text: string | null = null;

  public get text(): string | null {
    return this.#text;
  }

  #isComplete = false;

  public get isComplete(): boolean {
    return this.#isComplete;
  }

  #walker: SharedTreeWalker;

  constructor(readonly node: Node, readonly walker: SharedTreeWalker) {
    this.#walker = walker;
  }

  charAt(position: number): string | null {
    if (position < 0) throw new Error('Index is negative');

    // if index not within text then process nodes until complete or index within text
    while (
      !this.isComplete &&
      (this.#text == null || position > this.#text.length - 1)
    ) {
      this.#processCurrentNode();
    }

    if (this.#text == null) {
      return null;
    }

    if (position > this.#text.length - 1) {
      return null;
    }

    return this.#text.charAt(position);
  }

  nodeAt(position: number): { node: Node; offset: number } {
    const { value: node, offset } = this.#nodeRangeMap.get(position);
    return { node, offset };
  }

  complete() {
    this.charAt(Number.MAX_SAFE_INTEGER);
  }

  #processCurrentNode() {
    if (this.#isComplete) throw new Error('NodeTextSegment is complete');

    const node = this.#walker.currentNode;

    if (node == null) {
      this.#isComplete = true;
      return;
    }

    if (this.#shouldSkipNode(node)) {
      this.#nextNode();
      return;
    }

    const isTextSegmentBreak = this.#isTextSegmentBreak(node);

    if (isTextSegmentBreak) {
      this.#nextNode();
      this.#isComplete = true;
      return;
    }

    if (node?.nodeType !== Node.TEXT_NODE) {
      this.#nextNode();
      return;
    }

    const textNode = node as Text;

    const textContent = textNode.textContent;

    if (textContent == null) {
      this.#nextNode();
      return;
    }

    this.#nodeRangeMap.append(node, textContent.length);

    if (this.#text == null) {
      this.#text = textContent;
    } else {
      this.#text += textContent;
    }

    this.#nextNode();
  }

  #shouldSkipNode(node: Node): boolean {
    return node.nodeName === 'SCRIPT';
  }

  #isTextSegmentBreak(node: Node): boolean {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }
    const element = node as Element;
    const computedStyle = globalThis.getComputedStyle(element);
    return (
      computedStyle.display !== 'inline' || computedStyle.position !== 'static'
    );
  }

  #nextNode() {
    this.#isComplete = this.#walker.nextNode() == null;
  }
}
