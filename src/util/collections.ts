export function* range(count: number): Iterable<number> {
    for (let i = 0; i < count; ++i) {
        yield i;
    }
}

export function create2D<T>(width: number, height: number, initial: T): T[][] {
    const array = new Array<T[]>();
    for (let y = 0; y < height; ++y) {
        array[y] = new Array<T>();
        for (let x = 0; x < width; ++x) {
            array[y][x] = initial;
        }
    }
    return array;
}

export function some<K, V>(collection: Iterable<V>, predicate: (value: V) => boolean): boolean {
    for (const value of collection) {
        if (predicate(value)) {
            return true;
        }
    }
    return false;
}

export function minBy<T>(items: Iterable<T>, selector: (item: T) => number): T {
    let current = null;
    let currentValue = Infinity;

    for (const item of items) {
        const value = selector(item);
        if (value < currentValue) {
            currentValue = value;
            current = item;
        }
    }

    return current;
}

export function maxBy<T>(items: Iterable<T>, selector: (item: T) => number): T {
    let current = null;
    let currentValue = -Infinity;

    for (const item of items) {
        const value = selector(item);
        if (value > currentValue) {
            currentValue = value;
            current = item;
        }
    }

    return current;
}

export function* map<T, V>(items: Iterable<T>, selector: (item: T) => V): Iterable<V> {
    for (const item of items) {
        yield selector(item);
    }
}

export function* filter<T>(items: Iterable<T>, selector: (item: T) => boolean): Iterable<T> {
    for (const item of items) {
        if (selector(item)) {
            yield item;
        }
    }
}

export function sum<T>(items: Iterable<T>, selector: (item: T) => number): number {
    let total = 0;
    for (const item of items) {
        total += selector(item);
    }
    return total;
}