export class Pipe<T> {
  private readonly _t: T;

  private constructor(t: T) {
    this._t = t;
  }

  then<U>(f: (t: T) => U): Pipe<U> {
    return new Pipe(f(this._t));
  }

  static from<T>(t: T): Pipe<T> {
    return new Pipe(t);
  }

  unwrap(): T {
    return this._t;
  }
}
