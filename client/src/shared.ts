import { Lazy } from "./utils";
import * as gm from "./gm";

class GMEntry<T> {
  private readonly _name: string;
  private _t: Lazy<T | undefined>;

  constructor(name: string, init?: T) {
    this._name = name;
    this._t = Lazy.from(() => {
      const val = gm.getValue<T>(this._name);
      if (val === undefined && init !== undefined) {
        return gm.setValue<T>(this._name, init);
      }
      return val;
    });
  }

  get(): T | undefined {
    return this._t.force();
  }

  set(val: T | undefined) {
    if (val === undefined) {
      return;
    }
    gm.setValue<T>(this._name, val);
    this._t = Lazy.from(() => val);
  }
}

export const USERNAME = new GMEntry<string>("username");
export const SERVER = new GMEntry<string>("server");
export const SYNC_ANSWERS = new GMEntry<boolean>("sync_answers", true);
export const SORT_PROBLEMS = new GMEntry<boolean>("sort_problems", false);
export const NO_LEAVE_CHECK = new GMEntry<boolean>("no_leave_check", true);
