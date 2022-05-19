open Utils
open Belt
open Shared
open Webapi.Dom

@module
external style: {..} = "./style.mod.less"

module React = Recks
module ReactDOMRe = Recks.DOMRe

external unsafeToObj: 'a => {..} = "%identity"
external unsafeObjTo: {..} => 'a = "%identity"

module Settings = {
  @deriving(abstract)
  type form = {
    @optional
    mutable username: string,
    @optional
    mutable server: string,
    @optional
    mutable syncAnswers: bool,
    @optional
    mutable sortProblems: bool,
    @optional
    mutable noLeaveCheck: bool,
  }

  @react.component
  let make = (~onSubmit: unit => unit) => {
    module Entry = {
      @react.component
      let make = (~name: string, ~title: string, ~props: ReactDOMRe.domProps) => {
        let props = props->unsafeToObj->Js.Obj.assign({"name": name})->unsafeObjTo
        <div className={style["settingsEntry"]}>
          <label htmlFor={name}> {React.string(title)} </label>
          {ReactDOMRe.createDOMElementVariadic("input", ~props, [])}
        </div>
      }
    }

    module TitleText = {
      @react.component
      let make = (~title: string, ~content: string) =>
        <p> <strong> {React.string(title)} </strong> {content->React.string} </p>
    }

    let form = form()

    let formValue = (cb: string => unit, ev: ReactEvent.Form.t) =>
      (ev->ReactEvent.Form.target)["value"]->cb

    let formChecked = (cb: bool => unit, ev: ReactEvent.Form.t) =>
      (ev->ReactEvent.Form.target)["checked"]->cb

    <div>
      <form
        onSubmit={ev => {
          ev->ReactEvent.Form.preventDefault
          form->usernameGet->Option.forEach(Username.set)
          form->serverGet->Option.forEach(Server.set)
          form->syncAnswersGet->Option.forEach(SyncAnswers.set)
          form->noLeaveCheckGet->Option.forEach(NoLeaveCheck.set)
          form->sortProblemsGet->Option.forEach(SortProblems.set)
          onSubmit()
        }}
        className={style["settings"]}>
        {
          let pattern = "^[a-z][a-z0-9_]*$"
          <Entry
            name="username"
            title=`用户名`
            props={ReactDOMRe.domProps(
              ~type_="text",
              ~pattern,
              ~title=`小写字母、数字、下划线`,
              ~required=true,
              ~value=?{Username.get()},
              ~onChange=formValue(usernameSet(form)),
              (),
            )}
          />
        }
        <Entry
          name="server"
          title=`服务器`
          props={ReactDOMRe.domProps(
            ~type_="url",
            ~required=true,
            ~value=?{Server.get()},
            ~onChange=formValue(serverSet(form)),
            (),
          )}
        />
        <Entry
          name="sync_answers"
          title=`同步答案`
          props={ReactDOMRe.domProps(
            ~type_="checkbox",
            ~checked=?{SyncAnswers.get()},
            ~onChange=formChecked(syncAnswersSet(form)),
            (),
          )}
        />
        <Entry
          name="sort_problems"
          title=`排序题目`
          props={ReactDOMRe.domProps(
            ~type_="checkbox",
            ~checked=?{SortProblems.get()},
            ~onChange=formChecked(sortProblemsSet(form)),
            (),
          )}
        />
        <Entry
          name="no_leave_check"
          title=`拦截切屏检测`
          props={ReactDOMRe.domProps(
            ~type_="checkbox",
            ~checked=?{NoLeaveCheck.get()},
            ~onChange=formChecked(noLeaveCheckSet(form)),
            (),
          )}
        />
        <div className={style["settingsSubmit"]}>
          <p className={style["settingsSubmitTip"]}>
            <i> {React.string(`*更改设置后请刷新页面`)} </i>
          </p>
          <button type_="submit"> {`提交`->React.string} </button>
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
    ~child=<div className={style["mainBody"]}>
      <Settings onSubmit={() => win->Window.close} />
    </div>
    ->React.toNode
    ->Option.getExn,
  )
}
