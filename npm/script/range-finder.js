"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RangeFinder_instances, _RangeFinder_textSegmentWalker, _RangeFinder_segmentPosition, _RangeFinder_searchString, _RangeFinder_findNextInCurrentSegment;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeFinder = void 0;
const text_segment_walker_js_1 = require("./internal/text-segment-walker.js");
class RangeFinder {
    constructor(node) {
        _RangeFinder_instances.add(this);
        Object.defineProperty(this, "node", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: node
        });
        _RangeFinder_textSegmentWalker.set(this, void 0);
        _RangeFinder_segmentPosition.set(this, 0);
        _RangeFinder_searchString.set(this, null);
        __classPrivateFieldSet(this, _RangeFinder_textSegmentWalker, new text_segment_walker_js_1.TextSegmentWalker(node), "f");
    }
    findNext(searchString) {
        if (searchString === "")
            return null;
        __classPrivateFieldSet(this, _RangeFinder_searchString, searchString, "f");
        while (__classPrivateFieldGet(this, _RangeFinder_textSegmentWalker, "f").currentSegment) {
            const range = __classPrivateFieldGet(this, _RangeFinder_instances, "m", _RangeFinder_findNextInCurrentSegment).call(this);
            if (range)
                return range;
            __classPrivateFieldGet(this, _RangeFinder_textSegmentWalker, "f").next();
            __classPrivateFieldSet(this, _RangeFinder_segmentPosition, 0, "f");
        }
        return null;
    }
    findAll(searchString) {
        const result = [];
        let range;
        while ((range = this.findNext(searchString))) {
            result.push(range);
        }
        return result;
    }
    reset() {
        __classPrivateFieldGet(this, _RangeFinder_textSegmentWalker, "f").reset();
        __classPrivateFieldSet(this, _RangeFinder_segmentPosition, 0, "f");
    }
}
exports.RangeFinder = RangeFinder;
_RangeFinder_textSegmentWalker = new WeakMap(), _RangeFinder_segmentPosition = new WeakMap(), _RangeFinder_searchString = new WeakMap(), _RangeFinder_instances = new WeakSet(), _RangeFinder_findNextInCurrentSegment = function _RangeFinder_findNextInCurrentSegment() {
    const segment = __classPrivateFieldGet(this, _RangeFinder_textSegmentWalker, "f").currentSegment;
    const text = __classPrivateFieldGet(this, _RangeFinder_searchString, "f");
    if (text == null) {
        throw new Error("Text is null");
    }
    if (segment == null) {
        throw new Error("Segment is null");
    }
    let range = null;
    let position = __classPrivateFieldGet(this, _RangeFinder_segmentPosition, "f");
    const concat = (a, b) => a == null || b == null ? null : a + b;
    for (let textContent = segment.charAt(position); textContent != null; textContent = concat(textContent, segment.charAt(++position))) {
        const index = textContent.indexOf(text);
        if (index > -1) {
            const { node: startNode, offset: startOffset } = segment.nodeAt(__classPrivateFieldGet(this, _RangeFinder_segmentPosition, "f") + index);
            const { node: endNode, offset: endOffset } = segment.nodeAt(__classPrivateFieldGet(this, _RangeFinder_segmentPosition, "f") + index + text.length - 1);
            range = new Range();
            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset + 1);
            position += text.length;
            break;
        }
    }
    return range;
};
