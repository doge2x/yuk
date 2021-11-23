import * as GM from "./gm";

type CheckFn = (val: string) => boolean;

export class GMOpt {
  name: string;
  show: string;
  hint?: string;
  check?: CheckFn;

  constructor(args: {
    name: string;
    show: string;
    hint?: string;
    check?: CheckFn;
  }) {
    this.name = args.name;
    this.show = args.show;
    this.hint = args.hint;
    this.check = args.check;
  }

  async get(): Promise<string | undefined> {
    return await GM.getValue(this.name);
  }

  async getOrSet(): Promise<string> {
    return (await this.get()) || (await this.reset());
  }

  async reset(): Promise<string> {
    let val = await GM.getValue(this.name);
    val = this.requirePrompt(val);
    await GM.setValue(this.name, val);
    return val;
  }

  private requirePrompt(defaultVal?: string): string {
    const hintShow = this.hint === undefined ? "" : `(${this.hint})`;
    const defaultValShow =
      defaultVal === undefined ? "" : `[默认值: ${defaultVal}]`;
    let val = self.prompt(`请输入${this.show}${hintShow}${defaultValShow}`);
    while (true) {
      if (val === null && defaultVal !== undefined) {
        return defaultVal;
      } else if (
        val !== null &&
        (this.check === undefined || this.check(val))
      ) {
        return val;
      }
      val = self.prompt(`无效的${this.show}，请重新输入`);
    }
  }
}
