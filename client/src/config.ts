import GM from "./gm";
import { devLog } from "./utils";

class GMEntry {
  private name: string;
  value?: string;
  private validator: (val: string) => boolean;

  constructor(name: string, validator?: (val: string) => boolean) {
    this.name = name;
    this.validator = validator ?? (() => true);
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
      await GM.setValue(this.name, newVal);
      this.value = newVal;
    }
  }
}

export const USERNAME = new GMEntry("username", (val) =>
  /[_\w][_\w\d]*/.test(val)
);

export const SERVER = new GMEntry("server");
