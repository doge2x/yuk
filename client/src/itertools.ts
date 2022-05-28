class Pipe<T> {
  private readonly _lazy: () => T;

  constructor(lazy: () => T) {
    this._lazy = lazy;
  }

  static from<T>(t: T) {
    return new Pipe(() => t);
  }

  then<U>(f: (t: T) => U): Pipe<U> {
    return new Pipe(() => f(this.exec()));
  }

  exec(): T {
    return this._lazy();
  }
}

export function pipe<T>(t: T): Pipe<T> {
  return Pipe.from(t);
}

export function iter<T>(it: Iterator<T>): IterableIterator<T> {
  const iter = {
    [Symbol.iterator]: () => iter,
    next: () => it.next(),
  };
  return iter;
}

export function map<A, B>(op: (a: A) => B): (it: Iterable<A>) => Iterable<B> {
  return function* (it) {
    for (const a of it) {
      yield op(a);
    }
  };
}

export function* enumerate<T>(it: Iterable<T>): Iterable<[number, T]> {
  let i = 0;
  for (const a of it) {
    yield [i++, a];
  }
}

export function filter<T>(
  p: (a: T) => boolean
): (it: Iterable<T>) => Iterable<T> {
  return function* (it) {
    for (const a of it) {
      if (p(a)) {
        yield a;
      }
    }
  };
}

export function filterMap<A, B>(
  f: (a: A) => B | undefined
): (it: Iterable<A>) => Iterable<B> {
  return function* (it) {
    for (const a of it) {
      const t = f(a);
      if (t !== undefined) {
        yield t;
      }
    }
  };
}

export function zip<B>(
  b: Iterable<B>
): <A>(a: Iterable<A>) => Iterable<[A, B]> {
  return function* (a) {
    const it1 = a[Symbol.iterator]();
    const it2 = b[Symbol.iterator]();
    while (true) {
      const t1 = it1.next();
      const t2 = it2.next();
      if (t1.done !== true && t2.done !== true) {
        yield [t1.value, t2.value];
      } else {
        return;
      }
    }
  };
}

export function sort<T>(
  by?: (a: T, b: T) => number
): (it: Iterable<T>) => Iterable<T> {
  return function (it) {
    return Array.from(it).sort(by);
  };
}

export function first<T>(it: Iterable<T>): T | undefined {
  for (const t of it) {
    return t;
  }
  return;
}

export function fold<A, B>(
  init: B,
  f: (b: B, a: A) => B
): (it: Iterable<A>) => B {
  return function (it) {
    let b = init;
    for (const a of it) {
      b = f(b, a);
    }
    return b;
  };
}

export function collect<A, B>(
  f: (iter: Iterable<A>) => B
): (it: Iterable<A>) => B {
  return function (it) {
    return f(it);
  };
}

export function collectArray<T>(it: Iterable<T>): T[] {
  return Array.from(it);
}

export function forEach<T>(f: (t: T) => void): (it: Iterable<T>) => void {
  return function (it) {
    for (const t of it) {
      f(t);
    }
  };
}
