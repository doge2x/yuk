open Utils

@module
external style: {..} = "./style.mod.less"

module TitleText = {
  @react.component
  let make = (~title: string, ~content: option<string>=?) =>
    <p>
      <strong> {React.string(title)} </strong>
      {content->Belt.Option.map(React.string)->Belt.Option.getWithDefault(React.null)}
    </p>
}

module React = Recks
module ReactDOMRe = Recks.DOMRe

type entryType =
  | Text(option<string>)
  | Checkbox(option<bool>)

module Entry = {
  @react.component
  let make = (
    ~name: string,
    ~title: string,
    ~ty: entryType,
    ~required: option<bool>=?,
    ~pattern: option<string>=?,
  ) =>
    <div className={style["settingsEntry"]}>
      <label htmlFor={name}> {React.string(title)} </label>
      {
        let (ty, value, checked) = switch ty {
        | Text(value) => ("text", value, None)
        | Checkbox(checked) => ("checkbox", None, checked)
        }
        <input name title type_=ty ?value ?checked ?required ?pattern />
      }
    </div>
}

// TODO: use pure rescript?
%%raw(`
  import {
    NO_LEAVE_CHECK,
    SERVER,
    SORT_PROBLEMS,
    SYNC_ANSWERS,
    USERNAME,
  } from "./config";
`)

let make = () => {
  <div>
    <form
      onSubmit={ev =>
        // TODO: use pure rescript?
        %raw(`
          (ev) => {
            ev.preventDefault();
            const form = new FormData(this);
            USERNAME.value = form.get("username");
            SERVER.value = form.get("server");
            NO_LEAVE_CHECK.value = form.get("no_leave_check") === "on";
            SORT_PROBLEMS.value = form.get("sort_problems") === "on";
            SYNC_ANSWERS.value = form.get("sync_answers") === "on";
          }
        `)(ev)}>
      <Entry name="username" title=`用户名` ty=Text(Some(%raw(`USERNAME.value`))) />
      <Entry name="server" title=`服务器` ty=Text(Some(%raw(`SERVER.value`))) />
      <Entry
        name="sync_answers" title=`同步答案` ty=Checkbox(Some(%raw(`SYNC_ANSWERS.value`)))
      />
      <Entry
        name="sort_problems" title=`排序答案` ty=Checkbox(Some(%raw(`SORT_PROBLEMS.value`)))
      />
      <Entry
        name="no_leave_check"
        title=`拦截切屏检测`
        ty=Checkbox(Some(%raw(`NO_LEAVE_CHECK.value`)))
      />
      <div className={style["settingsSubmit"]}>
        <div className={style["settingsSubmitTip"]}>
          <i> {React.string(`*更改设置后请刷新页面`)} </i>
        </div>
        <div> <button> {React.string(`提交`)} </button> </div>
      </div>
    </form>
    <div className={style["about"]}>
      <TitleText title=`功能特性：` />
      <UList>
        <TitleText
          title=`同步答案：`
          content=`点击题目显示详细答案，在选项/填空处悬停显示简略答案`
        />
        <TitleText
          title=`排序题目：` content=`根据 ID 对题目和选项进行重新排序`
        />
        <TitleText
          title=`拦截切屏检测：` content=`随意切换页面、窗口不会被发现`
        />
        <TitleText
          title=`拦截上传截图：` content=`仅当用户确认后，才会上传截图`
        />
        <TitleText
          title=`拦截异常状态：`
          content=`即使本地显示异常也不会推送到服务器`
        />
      </UList>
    </div>
  </div>
}
