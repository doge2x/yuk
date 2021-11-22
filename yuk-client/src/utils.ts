import * as GM from "./gm";

type CheckFn = (val: string) => boolean;

export class GMOpt {
  name: string;
  show: string;
  hint: string;
  check?: CheckFn;

  constructor(name: string, show: string, hint: string, check?: CheckFn) {
    this.name = name;
    this.show = show;
    this.hint = hint;
    this.check = check;
  }

  getOrSet(): string {
    let val = GM.getValue(this.name);
    if (val === null) {
      val = requirePrompt(this.show, this.hint, this.check);
      GM.setValue(this.name, val);
    }
    return val;
  }
}

function requirePrompt(
  show: string,
  hint: string,
  check?: (val: string) => boolean
): string {
  let val = self.prompt(`请输入${show}（${hint}）`);
  while (true) {
    if (val !== null && (check === undefined || check(val))) {
      return val;
    }
    val = self.prompt(`无效的${show}，请重新输入`);
  }
}
