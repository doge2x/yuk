import { Ref } from "./Ref";

export class Lazy<T> {
  private readonly _init: () => T;
  private _t?: Ref<T>;

  protected constructor(init: () => T) {
    this._init = init;
  }

  static from<T>(init: () => T): Lazy<T> {
    return new Lazy(init);
  }

  force(): T {
    if (this._t === undefined) {
      this._t = Ref.from(this._init());
    }
    return this._t.t;
  }
}
