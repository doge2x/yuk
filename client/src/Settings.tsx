import { render } from "solid-js/web";
import { JSX } from "solid-js";
import style from "./style.module.less";
import { KeyOfType, openWin } from "./utils";
import {
  USERNAME,
  SERVER,
  SYNC_ANSWERS,
  NO_LEAVE_CHECK,
  SORT_PROBLEMS,
} from "./shared";

function Entry(props: {
  name: string;
  title: string;
  extra: JSX.IntrinsicElements["input"];
}) {
  const extra = {
    ...props.extra,
    name: props.name,
  };
  return (
    <div class={style.settingsEntry}>
      <label for={props.name}>{props.title}</label>
      <input {...extra}></input>
    </div>
  );
}

function Settings(props: { onSubmit: () => void }) {
  type Form = {
    username?: string;
    server?: string;
    syncAnswers?: boolean;
    sortProblems?: boolean;
    noLeaveCheck?: boolean;
  };
  const form: Form = {};

  type Ev = { currentTarget: HTMLInputElement };

  function setFormValue<K extends KeyOfType<Form, string | undefined>>(k: K) {
    return (ev: Ev) => (form[k] = ev.currentTarget.value);
  }

  function setFormChecked<K extends KeyOfType<Form, boolean | undefined>>(
    k: K
  ) {
    return (ev: Ev) => (form[k] = ev.currentTarget.checked);
  }

  return (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          USERNAME.set(form.username);
          SERVER.set(form.server);
          SYNC_ANSWERS.set(form.syncAnswers);
          SORT_PROBLEMS.set(form.sortProblems);
          NO_LEAVE_CHECK.set(form.noLeaveCheck);
          props.onSubmit();
        }}
      >
        <Entry
          name="username"
          title="用户名"
          extra={{
            type: "text",
            pattern: "^[a-z][a-z0-9_]*$",
            title: "小写字母、数字、下划线",
            required: true,
            value: USERNAME.get(),
            onChange: setFormValue("username"),
          }}
        />
        <Entry
          name="server"
          title="服务器"
          extra={{
            type: "url",
            required: true,
            value: SERVER.get(),
            onChange: setFormValue("server"),
          }}
        />
        <Entry
          name="sync_answers"
          title="同步答案"
          extra={{
            type: "checkbox",
            checked: SYNC_ANSWERS.get(),
            onChange: setFormChecked("syncAnswers"),
          }}
        />
        <Entry
          name="sort_problems"
          title="排序题目"
          extra={{
            type: "checkbox",
            checked: SORT_PROBLEMS.get(),
            onChange: setFormChecked("sortProblems"),
          }}
        />
        <Entry
          name="no_leave_check"
          title="拦截切屏检测"
          extra={{
            type: "checkbox",
            checked: NO_LEAVE_CHECK.get(),
            onChange: setFormChecked("noLeaveCheck"),
          }}
        />
        <div class={style.settingsSubmit}>
          <p class={style.settingsSubmitTip}>
            <i> *更改设置后请刷新页面 </i>
          </p>
          <button type="submit"> 提交 </button>
        </div>
      </form>
      <div class={style.about}>
        <p>
          <strong> 功能特性： </strong>
        </p>
        <ul>
          {[
            [
              "同步答案：",
              "点击题目显示详细答案，在选项/填空处悬停显示简略答案",
            ],
            ["排序题目：", "根据 ID 对题目和选项进行重新排序"],
            ["拦截切屏检测：", "随意切换页面、窗口不会被发现"],
            ["拦截上传截图：", "仅当用户确认后，才会上传截图"],
            ["拦截异常状态：", "即使本地显示异常也不会推送到服务器"],
          ].map(([title, content]) => (
            <li>
              <strong>{title}</strong>
              {content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function showSettings() {
  const win = openWin({ title: "设置", width: 350, height: 300 });
  render(
    () => (
      <div class={style.mainBody}>
        <Settings onSubmit={() => win.close()} />
      </div>
    ),
    win.document.body
  );
}
