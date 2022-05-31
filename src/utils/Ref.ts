export class Ref<T> {
  readonly t: T;

  private constructor(t: T) {
    this.t = t;
  }

  static from<T>(t: T): Ref<T> {
    return new Ref(t);
  }

  static unwrap<T>(t: Ref<T>): T {
    return t.t;
  }
}
