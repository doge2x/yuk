export function from<T>(t: T | undefined | null): T | undefined {
  if (t === null) {
    return;
  }
  return t;
}

export function expect<T>(msg?: string): (t: T | undefined) => T {
  return function (t) {
    if (t === undefined) {
      throw new Error(msg ?? "expect some value");
    }
    return t;
  };
}

export function unwrap<T>(or: () => T): (t: T | undefined) => T {
  return function (t) {
    return t !== undefined ? t : or();
  };
}

export function* iter<T>(t: T | undefined): Iterable<T> {
  if (t !== undefined) {
    yield t;
  }
}

export function map<A, B = A>(
  f: (a: A) => B
): (a: A | undefined) => B | undefined {
  return function (a) {
    return a !== undefined ? f(a) : undefined;
  };
}

export function filter<T>(
  f: (t: T) => boolean
): (t: T | undefined) => T | undefined {
  return function (t) {
    return t !== undefined && f(t) ? t : undefined;
  };
}

export function and<T>(b: T | undefined): (a: T | undefined) => T | undefined {
  return function (a) {
    return a !== undefined ? b : undefined;
  };
}

export function and2<B>(
  b: B | undefined
): <A>(a: A | undefined) => [A, B] | undefined {
  return function (a) {
    return a !== undefined && b !== undefined ? [a, b] : undefined;
  };
}

export function or<T>(b: T | undefined): (a: T | undefined) => T | undefined {
  return function (a) {
    return a !== undefined ? a : b;
  };
}

export function or2<B>(
  b: B | undefined
): <A>(a: A | undefined) => [A | undefined, B | undefined] | undefined {
  return function (a) {
    return a !== undefined || b !== undefined ? [a, b] : undefined;
  };
}
