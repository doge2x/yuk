import { openWin } from "./utils";
import Recks from "./recks";
import * as Settings from "./Settings.bs";
import * as STYLE from "./style.mod.less";

export function showSettings() {
  const win = openWin("设置", { height: 300, width: 400 });

  win.document.body.appendChild(
    <div className={[STYLE.mainBody, STYLE.settings].join(" ")}>
      {Settings.make()}
    </div>
  );
}
