open Webapi.Dom
open Belt
open Utils

@module
external style: {..} = "./style.mod.less"

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
}

module Tooltip = {
  type t = {ele: Dom.element}
  let make = (ele: Dom.element) => {ele: ele}
  let setContent = (this: t, text: string) => this.ele->Element.setAttribute("title", text)
}

module Detail = {
  module type T = {
    type extra
    type context
    type answer
    type detail = Map.String.t<answer>
    let updateUI: (detail, context) => React.element
    let make: (Dom.element, extra) => context
  }

  module Make = (T: T) => {
    type t = {
      mutable detail: T.detail,
      mutable detailHtml: React.element,
      context: T.context,
    }

    let showDetail = (this: t, ~top: int, ~left: int) => {
      let (_, body) = Utils.openWin(~title=`详细答案`, ~height=200, ~width=300, ~left, ~top, ())
      body->Element.appendChild(
        ~child=<div className={[style["mainBody"], style["answerDetail"]]->Utils.joinStrings(" ")}>
          this.detailHtml
        </div>
        ->React.toNode
        ->Option.getExn,
      )
    }

    let make = (subjectItem: Dom.element, extra: T.extra) => {
      let this = {
        detail: Map.String.empty,
        detailHtml: React.null,
        context: T.make(subjectItem, extra),
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

    let updateAnswer = (this: t, username: string, answer: T.answer) =>
      this.detail = this.detail->Map.String.set(username, answer)

    let updateUI = (this: t) => this.detailHtml = this.detail->T.updateUI(this.context)
  }
}

let percent = (a: int, b: int) => `${(a * 100 / b)->Int.toString}%`

let sortByKey = (arr: array<(string, _)>) =>
  arr->SortArray.stableSortBy(((a, _), (b, _)) => String.compare(a, b))

module Choice = Detail.Make({
  type extra = string => string
  type context = {
    tooltips: Map.String.t<Tooltip.t>,
    choiceMap: extra,
  }
  type answer = array<string>
  type detail = Map.String.t<answer>

  let make = (subjectItem: Dom.element, extra: extra) => {
    tooltips: subjectItem
    ->Utils.querySelectorAllElements(".item-body .checkboxInput, .item-body .radioInput")
    ->Array.reduceWithIndex(Map.String.empty, (tooltips, ele, idx) => {
      tooltips->Map.String.set(Js.String.fromCharCode(idx + 65), ele->Tooltip.make)
    }),
    choiceMap: extra,
  }

  let updateUI = (detail: detail, context: context) =>
    detail
    // Choice => Users
    ->Map.String.reduce(Map.String.empty, (choiceToUsers, user, choices) =>
      choices->Array.reduce(choiceToUsers, (choiceToUsers, choice) =>
        choiceToUsers->Map.String.update(choice, users =>
          users->Option.getWithDefault([])->Array.concat([user])->Some
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
          // Sort by username.
          ->SortArray.String.stableSort
          ->Array.map(user => <p> {user->React.string} </p>)
          ->React.array}
        </UList>
      </div>
    })
    ->React.array
})

module Blank = Detail.Make({
  type extra = unit
  type context = {tooltips: Map.String.t<Tooltip.t>}
  type answer = Js.Dict.t<string>
  type detail = Map.String.t<answer>

  let make = (subjectItem: Dom.element, _: extra) => {
    tooltips: subjectItem
    ->Utils.querySelectorAllElements(".item-body .blank-item-dynamic")
    ->Array.reduceWithIndex(Map.String.empty, (tooltips, ele, idx) =>
      tooltips->Map.String.set(Js.String.fromCharCode(49 + idx), ele->Tooltip.make)
    ),
  }

  let updateUI = (detail: detail, context: context) =>
    detail
    // Blank => FillText => Users
    ->Map.String.reduce(Map.String.empty, (blankToFillToUsers, user, blankToFill) =>
      blankToFill
      ->Js.Dict.entries
      ->sortByKey
      ->Array.reduce(blankToFillToUsers, (blankToFillToUsers, (blank, fill)) =>
        blankToFillToUsers->Map.String.update(blank, fillToUsers =>
          fillToUsers
          ->Option.getWithDefault(Map.String.empty)
          ->Map.String.update(fill, users =>
            users->Option.getWithDefault([])->Array.concat([user])->Some
          )
          ->Some
        )
      )
    )
    ->Map.String.toArray
    // Sort by blank ID.
    ->sortByKey
    ->Array.map(((blank, fillToUsers)) => {
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
                ->SortArray.String.stableSort
                ->Array.map(user => <p> {user->React.string} </p>)
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

module ShortAnswer = Detail.Make({
  type extra = unit
  type context = unit
  type answer = Answer.shortAnswer
  type detail = Map.String.t<answer>

  let make = (_: Dom.element, _: extra) => ()

  let updateUI = (detail: detail, _: context) =>
    detail
    ->Map.String.toArray
    ->sortByKey
    ->Array.map(((user, text)) =>
      // User
      //   <content>
      //   - File1
      //   - File2
      <div>
        <p> <strong> {user->React.string} </strong> </p>
        {text.content->Option.mapWithDefault(React.null, htm =>
          <div
            className={style["answerDetailShortAnswer"]} dangerouslySetInnerHTML={"__html": htm}
          />
        )}
        {text.attachments
        ->Option.flatMap(attachments => attachments.filelist)
        ->Option.mapWithDefault(React.null, attachments =>
          <UList>
            {attachments
            ->Array.map(atta => <a href={atta.fileUrl}> {atta.fileName->React.string} </a>)
            ->React.array}
          </UList>
        )}
        <div />
      </div>
    )
    ->React.array
})
