import { SharedTreeWalker } from './shared-tree-walker.js';
export declare class TextSegment {
    #private;
    readonly node: Node;
    readonly walker: SharedTreeWalker;
    get text(): string | null;
    get isComplete(): boolean;
    constructor(node: Node, walker: SharedTreeWalker);
    charAt(position: number): string | null;
    nodeAt(position: number): {
        node: Node;
        offset: number;
    };
    complete(): void;
}
//# sourceMappingURL=text-segment.d.ts.map