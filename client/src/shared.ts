import * as gm from "./gm";

class GMEntry<T extends NonNullable<any>> {
  private readonly _name: string;
  private readonly _init?: T;
  private inited: boolean = false;
  private _cached?: T;

  constructor(name: string, init?: T) {
    this._name = name;
    this._init = init;
  }

  get(): T | undefined {
    if (!this.inited) {
      const val = gm.getValue(this._name);
      if (val === undefined && this._init !== undefined) {
        gm.setValue(this._name, this._init);
      }
      this._cached = val ?? this._init;
      this.inited = true;
    }
    return this._cached;
  }

  set(val: T | undefined) {
    if (val === undefined) {
      return;
    }
    gm.setValue(this._name, val);
    this._cached = val;
  }
}

export const USERNAME = new GMEntry<string>("username");
export const SERVER = new GMEntry<string>("server");
export const SYNC_ANSWERS = new GMEntry<boolean>("sync_answers", true);
export const SORT_PROBLEMS = new GMEntry<boolean>("sort_problems", false);
export const NO_LEAVE_CHECK = new GMEntry<boolean>("no_leave_check", true);
