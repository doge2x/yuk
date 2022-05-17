open Utils
open Belt
open Config
open Webapi.Dom

@module
external style: {..} = "./style.mod.less"

module React = Recks
module ReactDOMRe = Recks.DOMRe

module Entries = {
  type text = {
    value: option<string>,
    pattern: option<string>,
    onSubmit: string => unit,
  }

  type checkbox = {checked: option<bool>, onSubmit: bool => unit}

  type entryType =
    | Text(text)
    | Checkbox(checkbox)

  type entrySchema = {
    name: string,
    title: string,
    ty: entryType,
  }

  module type T = {
    let v: array<entrySchema>
  }

  let make = (v: array<entrySchema>) => {
    let (ele, doSubmits) = v->Array.reduce(([], []), ((ele, doSubmits), {name, title, ty}) => {
      let (ty, value, checked, pattern, required, submit) = switch ty {
      | Text({value, pattern, onSubmit}) => (
          "text",
          value,
          None,
          pattern,
          true,
          ele => onSubmit(ele->Webapi.Dom.HtmlElement.value),
        )
      | Checkbox({checked, onSubmit}) => (
          "checkbox",
          None,
          checked,
          None,
          false,
          ele => onSubmit(ele->Webapi.Dom.HtmlElement.checked),
        )
      }
      let input = <input name title type_=ty ?value ?checked ?pattern required />
      (
        ele->Array.concat([
          <div className={style["settingsEntry"]}>
            <label htmlFor={name}> {React.string(title)} </label> input
          </div>,
        ]),
        doSubmits->Array.concat([
          () =>
            input
            ->React.toNode
            ->Option.flatMap(Webapi.Dom.HtmlElement.ofNode)
            ->Option.getExn
            ->submit,
        ]),
      )
    })
    (ele, () => doSubmits->Array.forEach(f => f()))
  }
}

module Settings = {
  @react.component
  let make = (~onSubmit: unit => unit) => {
    let (entries, doSubmit) = Entries.make([
      {
        name: "username",
        title: `用户名`,
        ty: Entries.Text({
          value: Username.get(),
          pattern: Some("[a-z][_a-z0-9]*"),
          onSubmit: s => Username.set(Some(s)),
        }),
      },
      {
        name: "server",
        title: `服务器`,
        ty: Entries.Text({
          value: Server.get(),
          pattern: Some("https?://.+"),
          onSubmit: s => Server.set(Some(s)),
        }),
      },
      {
        name: "sync_answers",
        title: `同步答案`,
        ty: Entries.Checkbox({checked: SyncAnswers.get(), onSubmit: c => SyncAnswers.set(c->Some)}),
      },
      {
        name: "sort_problems",
        title: `排序答案`,
        ty: Entries.Checkbox({
          checked: SortProblems.get(),
          onSubmit: c => SortProblems.set(c->Some),
        }),
      },
      {
        name: "no_leave_check",
        title: `拦截切屏检测`,
        ty: Entries.Checkbox({
          checked: NoLeaveCheck.get(),
          onSubmit: c => NoLeaveCheck.set(c->Some),
        }),
      },
    ])

    module TitleText = {
      @react.component
      let make = (~title: string, ~content: string) =>
        <p> <strong> {React.string(title)} </strong> {content->React.string} </p>
    }

    <div>
      <form
        onSubmit={ev => {
          ReactEvent.Form.preventDefault(ev)
          onSubmit()
          doSubmit()
        }}>
        <div> {entries->React.array} </div>
        <div className={style["settingsSubmit"]}>
          <div className={style["settingsSubmitTip"]}>
            <i> {React.string(`*更改设置后请刷新页面`)} </i>
          </div>
          <div> <button> {React.string(`提交`)} </button> </div>
        </div>
      </form>
      <div className={style["about"]}>
        <p> <strong> {`功能特性：`->React.string} </strong> </p>
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
}

let showSettings = () => {
  let (win, body) = Utils.openWin(~title=`设置`, ~height=300, ~width=400, ())
  body->Element.appendChild(
    ~child=<div className={[style["mainBody"], style["settings"]]->Utils.joinStrings(" ")}>
      <Settings onSubmit={() => win->Window.close} />
    </div>
    ->React.toNode
    ->Option.getExn,
  )
}
