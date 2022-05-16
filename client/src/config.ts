import {
  ExamId,
  NoLeaveCheck,
  Server,
  SortProblems,
  SyncAnswers,
  Token,
  Username,
} from "./Config.bs";

class ReValue<T> {
  private _value: any;

  constructor(value: any) {
    this._value = value;
  }

  get value(): T | undefined {
    return this._value.get();
  }

  set value(newVal: T | undefined) {
    this._value.set(newVal);
  }
}

export const USERNAME = new ReValue<string>(Username);
export const SERVER = new ReValue<string>(Server);
export const SYNC_ANSWERS = new ReValue<boolean>(SyncAnswers);
export const SORT_PROBLEMS = new ReValue<boolean>(SortProblems);
export const NO_LEAVE_CHECK = new ReValue<boolean>(NoLeaveCheck);
export const TOKEN = new ReValue<string>(Token);
export const EXAM_ID = new ReValue<number>(ExamId);
