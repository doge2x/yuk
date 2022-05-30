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
    return t ?? or();
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
    return a === undefined ? undefined : f(a);
  };
}

export function and<T>(b: T | undefined): (a: T | undefined) => T | undefined {
  return function (a) {
    return a ?? b;
  };
}

export function or<T>(b: T | undefined): (a: T | undefined) => T | undefined {
  return function (a) {
    return a === undefined ? b : a;
  };
}
