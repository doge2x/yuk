import { openWin } from "./utils";
import {
  NO_LEAVE_CHECK,
  SERVER,
  SORT_PROBLEMS,
  SYNC_ANSWERS,
  USERNAME,
} from "./config";
import { locals as style } from "./style.mod.css";
import Recks from "./recks";

export function showSettings() {
  const win = openWin("设置", { height: 300, width: 400 });

  function SettingsEntry(props: {
    name: string;
    title: string;
    size?: number;
    type?: string;
    required?: boolean;
    pattern?: string;
    value?: string;
    checked?: boolean;
  }) {
    return (
      <div classList={[style.settingsEntry]}>
        <label htmlFor={props.name}>{props.title}</label>
        <input
          name={props.name}
          title={props.title}
          size={props.size}
          type={props.type ?? "text"}
          required={props.required === true}
          pattern={props.pattern}
          value={props.value}
          checked={props.checked}
        />
      </div>
    );
  }

  win.document.body.append(
    <div classList={[style.mainBody, style.settings]}>
      <form
        onsubmit={() => false}
        on-submit={function () {
          const form = new FormData(this);
          USERNAME.value = form.get("username") as any;
          SERVER.value = form.get("server") as any;
          NO_LEAVE_CHECK.value = form.get("no_leave_check") === "on";
          SORT_PROBLEMS.value = form.get("sort_problems") === "on";
          SYNC_ANSWERS.value = form.get("sync_answers") === "on";
          win.close();
        }}
      >
        <SettingsEntry
          name="username"
          title="用户名"
          pattern={"[_a-z][_a-z0-9]*"}
          size={10}
          value={USERNAME.value ?? undefined}
        />
        <SettingsEntry
          name="server"
          title="服务器地址"
          pattern={"https?://.+"}
          size={20}
          value={SERVER.value ?? undefined}
        />
        <SettingsEntry
          name="sync_answers"
          title="同步答案"
          checked={SYNC_ANSWERS.value === true}
          type="checkbox"
        />
        <SettingsEntry
          name="sort_problems"
          title="排序题目"
          checked={SORT_PROBLEMS.value === true}
          type="checkbox"
        />
        <SettingsEntry
          name="no_leave_check"
          title="拦截切屏检测"
          checked={NO_LEAVE_CHECK.value === true}
          type="checkbox"
        />
        <div classList={[style.submitTip]}>
          <i>{"*更改设置后请刷新页面"}</i>
        </div>
        <div classList={[style.settingsSubmit]}>
          <input type="submit" value="提交" size={10} />
        </div>
      </form>
      <div classList={[style.about]}>
        <p>
          <strong>{"功能特性："}</strong>
        </p>
        <ul>
          <li>
            <strong>{"同步答案："}</strong>
            {"点击题目显示详细答案，在选项/填空处悬停鼠标显示简略答案"}
          </li>
          <li>
            <strong>{"排序题目："}</strong>
            {"根据 ID 对题目和选项进行重新排序"}
          </li>
          <li>
            <strong>{"拦截切屏检测："}</strong>
            {"随意切换页面、窗口不会被发现"}
          </li>
          <li>
            <strong>{"拦截上传截图："}</strong>
            {"仅当用户确认时，才会上传截图"}
          </li>
          <li>
            <strong>{"拦截异常状态："}</strong>
            {"即使页面显示异常状态也不会被提交到服务器"}
          </li>
        </ul>
      </div>
    </div>
  );
}
