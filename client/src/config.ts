import GM from "./gm";
import { devLog } from "./utils";

class GMEntry {
  private name: string;
  private validator: (val: string) => boolean;
  private onupdate: (val: string) => void;
  value?: string;

  constructor(
    name: string,
    validator?: (val: string) => boolean,
    onupdate?: (val: string) => void
  ) {
    this.name = name;
    this.validator = validator ?? (() => true);
    this.onupdate = onupdate ?? (() => undefined);
    GM.getValue(this.name)
      .then((val) => (this.value = val))
      .catch((e) => devLog(e));
  }

  async updateValue() {
    let val = await GM.getValue(this.name);
    let newVal: string | null;
    while (true) {
      if (val !== undefined) {
        newVal = prompt(`Value of "${this.name}" is "${val}"`);
      } else {
        newVal = prompt(`Input "${this.name}"`);
      }
      newVal = newVal === "" ? null : newVal;
      if (newVal === null || this.validator(newVal)) {
        break;
      }
    }
    if (newVal !== null) {
      this.onupdate(newVal);
      this.value = newVal;
      await GM.setValue(this.name, newVal);
    }
  }
}

class Token {
  value?: string;
}

export const USERNAME = new GMEntry(
  "username",
  (val) => /[_\w][_\w\d]*/.test(val),
  () => (TOKEN.value = undefined)
);

export const SERVER = new GMEntry(
  "server",
  undefined,
  () => (TOKEN.value = undefined)
);

export const TOKEN = new Token();
