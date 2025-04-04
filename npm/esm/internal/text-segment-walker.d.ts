import { TextSegment } from './text-segment.js';
export declare class TextSegmentWalker {
    #private;
    readonly node: Node;
    get currentSegment(): TextSegment | null;
    constructor(node: Node);
    next(): TextSegment | null;
    reset(): void;
}
//# sourceMappingURL=text-segment-walker.d.ts.map