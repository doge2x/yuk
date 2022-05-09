import GM from "./gm";
import { devLog } from "./utils";

class GMEntry {
  private name: string;
  private _value: Optional<string>;

  constructor(name: string, onupdate?: (val: string | null) => void) {
    this.name = name;
    this._value = new Optional(onupdate as any);
    GM.getValue(this.name)
      .then((val) => (this._value.value = val ?? null))
      .catch((e) => devLog(e));
  }

  get value(): string | null {
    return this._value.value;
  }

  async setValue(newVal: string | null) {
    await GM.setValue(this.name, newVal);
    this._value.value = newVal;
  }
}

class Optional<T> {
  private _value: T | null = null;
  private onupdate: (newVal: T | null) => void;

  constructor(onupdate?: (newVal: T | null) => void) {
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

export const USERNAME = new GMEntry("username", () => (TOKEN.value = null));

export const SERVER = new GMEntry("server", () => (TOKEN.value = null));

export const TOKEN = new Optional<string>();

export const EXAM_ID = new Optional<number>();
