export class RangeMap<T> {
  #ranges: { start: number; end: number; value: T }[] = [];

  #end = -1;

  set(start: number, end: number, value: T) {
    if (start > end) {
      throw new Error('Start must be less than or equal to end.');
    }

    this.#ranges.push({ start, end, value });

    this.#ranges.sort((a, b) => a.start - b.start);

    this.#end = Math.max(this.#end, end);
  }

  append(value: T, length: number) {
    const start = this.#end + 1;
    const end = start + length - 1;
    this.set(start, end, value);
  }

  get(number: number): { range: { start: number; end: number }; value: T; offset: number }  {
    let left = 0;
    let right = this.#ranges.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const range = this.#ranges[mid];

      if (number >= range.start && number <= range.end) {
        return {
          range: { start: range.start, end: range.end },
          value: range.value,
          offset: number - range.start
        };
      } else if (number < range.start) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    throw new Error('Number not found in any range.');
  }

  getAllRanges(): { start: number; end: number; value: T }[] {
    return [...this.#ranges];
  }

  clear() {
    this.#ranges = [];
    this.#end = 0;
  }
}
