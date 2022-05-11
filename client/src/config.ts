import GM from "./gm";

class Optional<T> {
  private _value: T | null = null;

  constructor(init?: T) {
    this._value = init ?? null;
  }

  get value(): T | null {
    return this._value;
  }

  set value(newVal: T | null) {
    this._value = newVal;
  }
}

class GMEntry<T> extends Optional<T> {
  private name: string;

  constructor(name: string, init?: T) {
    super();
    this.name = name;

    let val = GM.getValue(name);
    if (val === undefined) {
      val = init;
    }
    this.value = val ?? null;
  }

  get value(): T | null {
    return super.value;
  }

  set value(newVal: T | null) {
    GM.setValue(this.name, newVal);
    super.value = newVal;
  }
}

export const USERNAME = new GMEntry<string>("username");

export const SERVER = new GMEntry<string>("server");

export const SYNC_ANSWERS = new GMEntry<boolean>("sync_answers", true);

export const SORT_PROBLEMS = new GMEntry<boolean>("sort_problems", true);

export const NO_LEAVE_CHECK = new GMEntry<boolean>("no_leave_check", true);

export const TOKEN = new Optional<string>();

export const EXAM_ID = new Optional<number>();
