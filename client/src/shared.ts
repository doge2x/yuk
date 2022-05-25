import * as Shared from "./Shared.bs.js";

class ReValue<T> {
  private _value: any;

  constructor(value: any) {
    this._value = value;
  }

  get value(): T | undefined {
    return this._value.get();
  }
}

export const USERNAME = new ReValue<string>(Shared.Username);
export const SERVER = new ReValue<string>(Shared.Server);
export const SYNC_ANSWERS = new ReValue<boolean>(Shared.SyncAnswers);
export const SORT_PROBLEMS = new ReValue<boolean>(Shared.SortProblems);
export const NO_LEAVE_CHECK = new ReValue<boolean>(Shared.NoLeaveCheck);
