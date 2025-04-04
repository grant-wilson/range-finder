export declare class RangeMap<T> {
    #private;
    set(start: number, end: number, value: T): void;
    append(value: T, length: number): void;
    get(number: number): {
        range: {
            start: number;
            end: number;
        };
        value: T;
        offset: number;
    };
    getAllRanges(): {
        start: number;
        end: number;
        value: T;
    }[];
    clear(): void;
}
//# sourceMappingURL=range-map.d.ts.map