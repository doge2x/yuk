open Webapi.Dom
open Belt
open Utils

@module
external style: {..} = "./style.module.less"

module React = Recks
module ReactDOMRe = Recks.DOMRe

module Answer = {
  type file = {
    fileName: string,
    fileSize: string,
    fileUrl: string,
    fileType: string,
  }

  type attachments = {filelist: option<array<file>>}

  type shortAnswer = {
    content: option<string>,
    attachments: option<attachments>,
  }

  type state =
    | WorkingOn
    | Sure
    | NotSure

  type context = {state: option<state>, msg: option<string>}
}

@module("./client") @scope("CLIENT")
external updateState: (int, Answer.state) => unit = "updateState"
@module("./client") @scope("CLIENT")
external updateMsg: (int, string) => unit = "updateMsg"

type answerContext<'a> = {
  context: option<Answer.context>,
  answer: option<'a>,
}

let percent = (a: int, b: int) => `${(a * 100 / b)->Int.toString}%`

let sortByKey = (arr: array<(string, _)>) =>
  arr->SortArray.stableSortBy(((a, _), (b, _)) => String.compare(a, b))

let stateClass = (state: option<Answer.state>) =>
  state->Option.map(state =>
    switch state {
    | Answer.WorkingOn => style["stateWorkingOn"]
    | Answer.Sure => style["stateSure"]
    | Answer.NotSure => style["stateNotSure"]
    }
  )

let answerState = (context: option<Answer.context>) =>
  context->Option.flatMap(c => c.state)->stateClass

let stateToPriv = (state: Answer.state) =>
  switch state {
  | Answer.Sure => 0
  | Answer.WorkingOn => 1
  | Answer.NotSure => 2
  }

let cmpWithState = (
  (aName, aState): (string, option<Answer.state>),
  (bName, bState): (string, option<Answer.state>),
) =>
  switch (aState, bState) {
  | (None, None) => String.compare(aName, bName)
  | (None, Some(_)) => 1
  | (Some(_), None) => -1
  | (Some(aState), Some(bState)) => stateToPriv(bState) - stateToPriv(aState)
  }

let sortByNameWithContext = (arr: array<(string, option<Answer.context>)>) =>
  arr->SortArray.stableSortBy(((a1, a2), (b1, b2)) =>
    cmpWithState(
      (a1, a2->Option.flatMap(ctx => ctx.state)),
      (b1, b2->Option.flatMap(ctx => ctx.state)),
    )
  )

let sortByNameWithAnswerContext = (arr: array<(string, answerContext<'a>)>) =>
  arr->SortArray.stableSortBy(((a1, a2), (b1, b2)) =>
    cmpWithState(
      (a1, a2.context->Option.flatMap(ctx => ctx.state)),
      (b1, b2.context->Option.flatMap(ctx => ctx.state)),
    )
  )

module Tooltip = {
  type t = {ele: Dom.element}
  let make = (ele: Dom.element) => {ele: ele}
  let setContent = (this: t, text: string) => this.ele->Element.setAttribute("title", text)
}

module T = {
  module type U = {
    type extra
    type context
    type answer
    type details = Map.String.t<answerContext<answer>>
    let updateUI: (details, context) => React.element
    let make: (Dom.element, extra) => context
  }

  module Make = (U: U) => {
    type t = {
      mutable details: U.details,
      mutable detailHtml: React.element,
      context: U.context,
      id: int,
    }

    let showDetail = (this: t, ~top: int, ~left: int) => {
      let (_, body) = Utils.openWin(~title=`详细答案`, ~height=200, ~width=300, ~left, ~top, ())
      body->Element.appendChild(
        ~child=<div className={style["mainBody"]}>
          // Marks.
          <fieldset className={style["answerMark"]}>
            <legend> {`标记`->React.string} </legend>
            <input
              type_="text"
              placeholder=`输入留言`
              onChange={ev => updateMsg(this.id, (ev->ReactEvent.Form.target)["value"])}
            />
            <button
              type_="button"
              className={style["stateWorkingOn"]}
              onClick={_ => updateState(this.id, Answer.WorkingOn)}>
              {`我正在做`->React.string}
            </button>
            <button
              type_="button"
              className={style["stateSure"]}
              onClick={_ => updateState(this.id, Answer.Sure)}>
              {`我很确定`->React.string}
            </button>
            <button
              type_="button"
              className={style["stateNotSure"]}
              onClick={_ => updateState(this.id, Answer.NotSure)}>
              {`我不确定`->React.string}
            </button>
          </fieldset>
          {this.detailHtml}
        </div>
        ->React.toNode
        ->Option.getExn,
      )
    }

    let make = (id: int, subjectItem: Dom.element, extra: U.extra) => {
      let this = {
        details: Map.String.empty,
        detailHtml: React.null,
        context: U.make(subjectItem, extra),
        id: id,
      }

      // Click problem title to show detail of answers.
      let itemType = subjectItem->Element.querySelector(".item-type")->Option.getExn
      itemType->Element.classList->DomTokenList.add(style["clickable"])
      itemType->Element.addClickEventListener(_ => {
        let rect = itemType->Element.getBoundingClientRect
        this->showDetail(~top=rect->DomRect.top->Float.toInt, ~left=rect->DomRect.left->Float.toInt)
      })

      this
    }

    let updateAnswer = (this: t, username: string, data: answerContext<U.answer>) =>
      this.details = this.details->Map.String.set(username, data)

    let updateUI = (this: t) =>
      this.detailHtml = <div>
        // Message board.
        <fieldset className={style["answerMsg"]}>
          <legend> {`留言`->React.string} </legend>
          <UList>
            {this.details
            ->Map.String.toArray
            // Sort by username with state.
            ->sortByNameWithAnswerContext
            ->Array.keepMap(((user, data)) =>
              data.context->Option.flatMap(ctx => {
                let msg = switch ctx.state {
                | Some(Answer.WorkingOn) => ctx.msg->Option.getWithDefault(`我正在做`)->Some
                | _ => ctx.msg
                }
                msg->Option.map(msg => (user, ctx.state, msg))
              })
            )
            ->Array.map(((user, state, msg)) => {
              <p className=?{state->stateClass}>
                <span className={style["answerMsgName"]}> {`${user}: `->React.string} </span>
                {msg->React.string}
              </p>
            })
            ->React.array}
          </UList>
        </fieldset>
        // Answer details.
        <div className={style["answerDetail"]}> {this.details->U.updateUI(this.context)} </div>
      </div>
  }
}

module Choice = T.Make({
  type extra = string => string
  type context = {
    tooltips: Map.String.t<Tooltip.t>,
    choiceMap: extra,
  }
  type answer = array<string>
  type details = Map.String.t<answerContext<answer>>

  let make = (subjectItem: Dom.element, extra: extra) => {
    tooltips: subjectItem
    ->Utils.querySelectorAllElements(".item-body .checkboxInput, .item-body .radioInput")
    ->Array.reduceWithIndex(Map.String.empty, (tooltips, ele, idx) => {
      tooltips->Map.String.set(Js.String.fromCharCode(idx + 65), ele->Tooltip.make)
    }),
    choiceMap: extra,
  }

  let updateUI = (detail: details, context: context) =>
    detail
    // Choice => Users
    ->Map.String.reduce(Map.String.empty, (choiceToUsers, user, {answer: choices, context}) =>
      choices->Option.mapWithDefault(choiceToUsers, choices =>
        choices->Array.reduce(choiceToUsers, (choiceToUsers, choice) =>
          choiceToUsers->Map.String.update(choice, users =>
            users->Option.getWithDefault([])->Array.concat([(user, context)])->Some
          )
        )
      )
    )
    ->Map.String.toArray
    // Map choices to the one users see.
    ->Array.map(((choice, users)) => (choice->context.choiceMap, users))
    // Sort by choices.
    ->sortByKey
    ->Array.map(((choice, users)) => {
      // Update tooltips to show how many users have selected the option.
      context.tooltips
      ->Map.String.get(choice)
      ->Option.forEach(Tooltip.setContent(_, percent(users->Array.size, detail->Map.String.size)))
      // Choice
      //   - User1
      //   - User2
      <div>
        <p> <strong> {choice->React.string} </strong> </p>
        <UList>
          {users
          // Sort by username with context.
          ->sortByNameWithContext
          ->Array.map(((user, context)) =>
            <p className=?{context->answerState}> {user->React.string} </p>
          )
          ->React.array}
        </UList>
      </div>
    })
    ->React.array
})

module Blank = T.Make({
  type extra = unit
  type context = {tooltips: Map.String.t<Tooltip.t>}
  type answer = Js.Dict.t<string>
  type details = Map.String.t<answerContext<answer>>

  let make = (subjectItem: Dom.element, _: extra) => {
    tooltips: subjectItem
    ->Utils.querySelectorAllElements(".item-body .blank-item-dynamic")
    ->Array.reduceWithIndex(Map.String.empty, (tooltips, ele, idx) =>
      tooltips->Map.String.set(Js.String.fromCharCode(49 + idx), ele->Tooltip.make)
    ),
  }

  let updateUI = (detail: details, context: context) =>
    detail
    // Blank => FillText => Users
    ->Map.String.reduce(Map.String.empty, (
      blankToFillToUsers,
      user,
      {answer: blankToFill, context},
    ) =>
      blankToFill->Option.mapWithDefault(blankToFillToUsers, blankToFill =>
        blankToFill
        ->Js.Dict.entries
        ->Array.reduce(blankToFillToUsers, (blankToFillToUsers, (blank, fill)) =>
          blankToFillToUsers->Map.String.update(blank, fillToUsers =>
            fillToUsers
            ->Option.getWithDefault(Map.String.empty)
            ->Map.String.update(fill, users =>
              users->Option.getWithDefault([])->Array.concat([(user, context)])->Some
            )
            ->Some
          )
        )
      )
    )
    ->Map.String.toArray
    // Sort by blank ID.
    ->sortByKey
    ->Array.map(((blank, fillToUsers)) => {
      // Sort by filled text.
      let fillToUsers = fillToUsers->Map.String.toArray->sortByKey
      // Update tooltips to show the most popular answers.
      context.tooltips
      ->Map.String.get(blank)
      ->Option.forEach(
        Tooltip.setContent(
          _,
          fillToUsers
          ->Array.map(((fill, users)) => (fill, users->Array.size))
          ->SortArray.stableSortBy(((_, a), (_, b)) => b - a)
          ->Array.get(0)
          ->Option.mapWithDefault("", ((text, count)) =>
            `(${percent(count, detail->Map.String.size)}) ${text}`
          ),
        ),
      )
      // #Blank
      //   - result1
      //     - user1
      //     - user2
      <div>
        <p> <strong> {`#${blank}`->React.string} </strong> </p>
        <UList>
          {fillToUsers
          ->Array.map(((text, users)) =>
            <div>
              <p> {text->React.string} </p>
              <UList>
                {users
                ->sortByNameWithContext
                ->Array.map(((user, context)) =>
                  <p className=?{context->answerState}> {user->React.string} </p>
                )
                ->React.array}
              </UList>
            </div>
          )
          ->React.array}
        </UList>
      </div>
    })
    ->React.array
})

module ShortAnswer = T.Make({
  type extra = unit
  type context = unit
  type answer = Answer.shortAnswer
  type details = Map.String.t<answerContext<answer>>

  let make = (_: Dom.element, _: extra) => ()

  let updateUI = (detail: details, _: context) =>
    detail
    ->Map.String.toArray
    ->sortByNameWithAnswerContext
    ->Array.map(((user, {answer: text, context})) =>
      // User
      //   <content>
      //   - File1
      //   - File2
      <div>
        <p className=?{context->answerState}> <strong> {user->React.string} </strong> </p>
        {<div
          className={style["answerDetailShortAnswer"]}
          dangerouslySetInnerHTML={
            "__html": text->Option.flatMap(text => text.content)->Option.getWithDefault(""),
          }
        />}
        {<UList>
          {text
          ->Option.flatMap(text => text.attachments)
          ->Option.flatMap(atta => atta.filelist)
          ->Option.getWithDefault([])
          ->Array.map(atta => <a href={atta.fileUrl}> {atta.fileName->React.string} </a>)
          ->React.array}
        </UList>}
        <div />
      </div>
    )
    ->React.array
})
