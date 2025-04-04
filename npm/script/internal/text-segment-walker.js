"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _TextSegmentWalker_walker, _TextSegmentWalker_current;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSegmentWalker = void 0;
const text_segment_js_1 = require("./text-segment.js");
const shared_tree_walker_js_1 = require("./shared-tree-walker.js");
class TextSegmentWalker {
    get currentSegment() {
        return __classPrivateFieldGet(this, _TextSegmentWalker_current, "f");
    }
    constructor(node) {
        Object.defineProperty(this, "node", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: node
        });
        _TextSegmentWalker_walker.set(this, void 0);
        _TextSegmentWalker_current.set(this, null);
        __classPrivateFieldSet(this, _TextSegmentWalker_walker, new shared_tree_walker_js_1.SharedTreeWalker(node), "f");
    }
    next() {
        let node;
        if (__classPrivateFieldGet(this, _TextSegmentWalker_current, "f") == null) {
            node = __classPrivateFieldGet(this, _TextSegmentWalker_walker, "f").nextNode();
        }
        else {
            __classPrivateFieldGet(this, _TextSegmentWalker_current, "f").complete();
            node = __classPrivateFieldGet(this, _TextSegmentWalker_walker, "f").currentNode;
        }
        if (!node) {
            return null;
        }
        __classPrivateFieldSet(this, _TextSegmentWalker_current, new text_segment_js_1.TextSegment(node, __classPrivateFieldGet(this, _TextSegmentWalker_walker, "f")), "f");
        return __classPrivateFieldGet(this, _TextSegmentWalker_current, "f");
    }
    reset() {
        __classPrivateFieldSet(this, _TextSegmentWalker_walker, new shared_tree_walker_js_1.SharedTreeWalker(this.node), "f");
        __classPrivateFieldSet(this, _TextSegmentWalker_current, null, "f");
    }
}
exports.TextSegmentWalker = TextSegmentWalker;
_TextSegmentWalker_walker = new WeakMap(), _TextSegmentWalker_current = new WeakMap();
