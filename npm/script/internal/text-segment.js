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
var _TextSegment_instances, _TextSegment_nodeRangeMap, _TextSegment_text, _TextSegment_isComplete, _TextSegment_walker, _TextSegment_processCurrentNode, _TextSegment_shouldSkipNode, _TextSegment_isTextSegmentBreak, _TextSegment_nextNode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSegment = void 0;
const range_map_js_1 = require("./range-map.js");
class TextSegment {
    get text() {
        return __classPrivateFieldGet(this, _TextSegment_text, "f");
    }
    get isComplete() {
        return __classPrivateFieldGet(this, _TextSegment_isComplete, "f");
    }
    constructor(node, walker) {
        _TextSegment_instances.add(this);
        Object.defineProperty(this, "node", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: node
        });
        Object.defineProperty(this, "walker", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: walker
        });
        _TextSegment_nodeRangeMap.set(this, new range_map_js_1.RangeMap());
        _TextSegment_text.set(this, null);
        _TextSegment_isComplete.set(this, false);
        _TextSegment_walker.set(this, void 0);
        __classPrivateFieldSet(this, _TextSegment_walker, walker, "f");
    }
    charAt(position) {
        if (position < 0)
            throw new Error('Index is negative');
        // if index not within text then process nodes until complete or index within text
        while (!this.isComplete &&
            (__classPrivateFieldGet(this, _TextSegment_text, "f") == null || position > __classPrivateFieldGet(this, _TextSegment_text, "f").length - 1)) {
            __classPrivateFieldGet(this, _TextSegment_instances, "m", _TextSegment_processCurrentNode).call(this);
        }
        if (__classPrivateFieldGet(this, _TextSegment_text, "f") == null) {
            return null;
        }
        if (position > __classPrivateFieldGet(this, _TextSegment_text, "f").length - 1) {
            return null;
        }
        return __classPrivateFieldGet(this, _TextSegment_text, "f").charAt(position);
    }
    nodeAt(position) {
        const { value: node, offset } = __classPrivateFieldGet(this, _TextSegment_nodeRangeMap, "f").get(position);
        return { node, offset };
    }
    complete() {
        this.charAt(Number.MAX_SAFE_INTEGER);
    }
}
exports.TextSegment = TextSegment;
_TextSegment_nodeRangeMap = new WeakMap(), _TextSegment_text = new WeakMap(), _TextSegment_isComplete = new WeakMap(), _TextSegment_walker = new WeakMap(), _TextSegment_instances = new WeakSet(), _TextSegment_processCurrentNode = function _TextSegment_processCurrentNode() {
    if (__classPrivateFieldGet(this, _TextSegment_isComplete, "f"))
        throw new Error('NodeTextSegment is complete');
    const node = __classPrivateFieldGet(this, _TextSegment_walker, "f").currentNode;
    if (node == null) {
        __classPrivateFieldSet(this, _TextSegment_isComplete, true, "f");
        return;
    }
    if (__classPrivateFieldGet(this, _TextSegment_instances, "m", _TextSegment_shouldSkipNode).call(this, node)) {
        __classPrivateFieldGet(this, _TextSegment_instances, "m", _TextSegment_nextNode).call(this);
        return;
    }
    const isTextSegmentBreak = __classPrivateFieldGet(this, _TextSegment_instances, "m", _TextSegment_isTextSegmentBreak).call(this, node);
    if (isTextSegmentBreak) {
        __classPrivateFieldGet(this, _TextSegment_instances, "m", _TextSegment_nextNode).call(this);
        __classPrivateFieldSet(this, _TextSegment_isComplete, true, "f");
        return;
    }
    if (node?.nodeType !== Node.TEXT_NODE) {
        __classPrivateFieldGet(this, _TextSegment_instances, "m", _TextSegment_nextNode).call(this);
        return;
    }
    const textNode = node;
    const textContent = textNode.textContent;
    if (textContent == null) {
        __classPrivateFieldGet(this, _TextSegment_instances, "m", _TextSegment_nextNode).call(this);
        return;
    }
    __classPrivateFieldGet(this, _TextSegment_nodeRangeMap, "f").append(node, textContent.length);
    if (__classPrivateFieldGet(this, _TextSegment_text, "f") == null) {
        __classPrivateFieldSet(this, _TextSegment_text, textContent, "f");
    }
    else {
        __classPrivateFieldSet(this, _TextSegment_text, __classPrivateFieldGet(this, _TextSegment_text, "f") + textContent, "f");
    }
    __classPrivateFieldGet(this, _TextSegment_instances, "m", _TextSegment_nextNode).call(this);
}, _TextSegment_shouldSkipNode = function _TextSegment_shouldSkipNode(node) {
    return node.nodeName === 'SCRIPT';
}, _TextSegment_isTextSegmentBreak = function _TextSegment_isTextSegmentBreak(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
        return false;
    }
    const element = node;
    const computedStyle = globalThis.getComputedStyle(element);
    return (computedStyle.display !== 'inline' || computedStyle.position !== 'static');
}, _TextSegment_nextNode = function _TextSegment_nextNode() {
    __classPrivateFieldSet(this, _TextSegment_isComplete, __classPrivateFieldGet(this, _TextSegment_walker, "f").nextNode() == null, "f");
};
