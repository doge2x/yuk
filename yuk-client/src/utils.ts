import GM from "./gm.js";

export function getOpt(
  name: string,
  show: string,
  hint: string,
  check: (val: string) => boolean,
): string {
  let val: string | null = GM.getValue(name, null);
  if (val === null) {
    val = self.prompt(`请输入${show}（${hint}）`);
    while (true) {
      if (val !== null && check(val)) {
        break;
      }
      val = self.prompt(`无效的${show}，请重新输入`);
    }
    GM.setValue(name, val);
  }
  return val;
}
