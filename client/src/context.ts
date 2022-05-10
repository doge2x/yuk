import GM from "./gm";

class GMEntry<T> {
  private name: string;
  private _value: Optional<T>;

  constructor(name: string, init?: T, onupdate?: (val: T | null) => void) {
    this.name = name;
    let val = GM.getValue(name);
    if (val === undefined && init !== undefined) {
      GM.setValue(name, init);
      val = init;
    }
    this._value = new Optional(val, onupdate);
  }

  get value(): T | null {
    return this._value.value;
  }

  set value(newVal: T | null) {
    GM.setValue(this.name, newVal);
    this._value.value = newVal;
  }
}

class Optional<T> {
  private _value: T | null = null;
  private onupdate: (newVal: T | null) => void;

  constructor(init?: T, onupdate?: (newVal: T | null) => void) {
    this._value = init ?? null;
    this.onupdate = onupdate ?? (() => undefined);
  }

  get value(): T | null {
    return this._value;
  }

  set value(newVal: T | null) {
    this.onupdate(newVal);
    this._value = newVal;
  }
}

export const USERNAME = new GMEntry<string>(
  "username",
  undefined,
  () => (TOKEN.value = null)
);

export const SERVER = new GMEntry<string>(
  "server",
  undefined,
  () => (TOKEN.value = null)
);

export const TOKEN = new Optional<string>();

export const EXAM_ID = new Optional<number>();

export const SORT_PROBLEMS = new GMEntry<boolean>("sort_problems", true);

export const NO_LEAVE_CHECK = new GMEntry<boolean>("no_leave_check", true);
