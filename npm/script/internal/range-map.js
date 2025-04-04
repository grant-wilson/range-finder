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
var _RangeMap_ranges, _RangeMap_end;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeMap = void 0;
class RangeMap {
    constructor() {
        _RangeMap_ranges.set(this, []);
        _RangeMap_end.set(this, -1);
    }
    set(start, end, value) {
        if (start > end) {
            throw new Error('Start must be less than or equal to end.');
        }
        __classPrivateFieldGet(this, _RangeMap_ranges, "f").push({ start, end, value });
        __classPrivateFieldGet(this, _RangeMap_ranges, "f").sort((a, b) => a.start - b.start);
        __classPrivateFieldSet(this, _RangeMap_end, Math.max(__classPrivateFieldGet(this, _RangeMap_end, "f"), end), "f");
    }
    append(value, length) {
        const start = __classPrivateFieldGet(this, _RangeMap_end, "f") + 1;
        const end = start + length - 1;
        this.set(start, end, value);
    }
    get(number) {
        let left = 0;
        let right = __classPrivateFieldGet(this, _RangeMap_ranges, "f").length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const range = __classPrivateFieldGet(this, _RangeMap_ranges, "f")[mid];
            if (number >= range.start && number <= range.end) {
                return {
                    range: { start: range.start, end: range.end },
                    value: range.value,
                    offset: number - range.start
                };
            }
            else if (number < range.start) {
                right = mid - 1;
            }
            else {
                left = mid + 1;
            }
        }
        throw new Error('Number not found in any range.');
    }
    getAllRanges() {
        return [...__classPrivateFieldGet(this, _RangeMap_ranges, "f")];
    }
    clear() {
        __classPrivateFieldSet(this, _RangeMap_ranges, [], "f");
        __classPrivateFieldSet(this, _RangeMap_end, 0, "f");
    }
}
exports.RangeMap = RangeMap;
_RangeMap_ranges = new WeakMap(), _RangeMap_end = new WeakMap();
