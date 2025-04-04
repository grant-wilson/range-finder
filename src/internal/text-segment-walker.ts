import { TextSegment } from './text-segment.ts';
import { SharedTreeWalker } from './shared-tree-walker.ts';

export class TextSegmentWalker {
  #walker: SharedTreeWalker;

  #current: TextSegment | null = null;

  public get currentSegment(): TextSegment | null {
    return this.#current;
  }

  constructor(readonly node: Node) {
    this.#walker = new SharedTreeWalker(node);
  }

  next(): TextSegment | null {
    let node: Node | null;

    if (this.#current == null) {
      node = this.#walker.nextNode();
    } else {
      this.#current.complete();
      node = this.#walker.currentNode;
    }

    if (!node) {
      return null;
    }

    this.#current = new TextSegment(node, this.#walker);

    return this.#current;
  }

  reset() {
    this.#walker = new SharedTreeWalker(this.node);
    this.#current = null;
  }
}
