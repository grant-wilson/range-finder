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
var _SharedTreeWalker_currentNode, _SharedTreeWalker_walker;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedTreeWalker = void 0;
class SharedTreeWalker {
    get currentNode() {
        return __classPrivateFieldGet(this, _SharedTreeWalker_currentNode, "f");
    }
    set currentNode(v) {
        if (v == null)
            throw new Error('Node is null');
        __classPrivateFieldGet(this, _SharedTreeWalker_walker, "f").currentNode = v;
    }
    constructor(node) {
        Object.defineProperty(this, "node", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: node
        });
        _SharedTreeWalker_currentNode.set(this, null);
        _SharedTreeWalker_walker.set(this, void 0);
        __classPrivateFieldSet(this, _SharedTreeWalker_walker, document.createTreeWalker(node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT), "f");
        __classPrivateFieldSet(this, _SharedTreeWalker_currentNode, __classPrivateFieldGet(this, _SharedTreeWalker_walker, "f").currentNode, "f");
    }
    nextNode() {
        __classPrivateFieldSet(this, _SharedTreeWalker_currentNode, __classPrivateFieldGet(this, _SharedTreeWalker_walker, "f").nextNode(), "f");
        return __classPrivateFieldGet(this, _SharedTreeWalker_currentNode, "f");
    }
}
exports.SharedTreeWalker = SharedTreeWalker;
_SharedTreeWalker_currentNode = new WeakMap(), _SharedTreeWalker_walker = new WeakMap();
