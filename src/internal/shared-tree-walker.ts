export class SharedTreeWalker {
  #currentNode: Node | null = null;

  #walker: TreeWalker;

  public get currentNode(): Node | null {
    return this.#currentNode;
  }

  public set currentNode(v: Node | null) {
    if (v == null) throw new Error('Node is null');
    this.#walker.currentNode = v;
  }

  constructor(readonly node: Node) {
    this.#walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT
    );
    this.#currentNode = this.#walker.currentNode;
  }

  nextNode(): Node | null {
    this.#currentNode = this.#walker.nextNode();
    return this.#currentNode;
  }
}
