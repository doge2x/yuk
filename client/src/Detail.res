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

  type text = {
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

    let updateAnswer = (this: t, username: string, answer: T.answer) =>
      this.detail = this.detail->Map.String.set(username, answer)

    let updateUI = (this: t) => this.detailHtml = this.detail->T.updateUI(this.context)

    let showDetail = (this: t, ~top: int, ~left: int) => {
      Utils.openWin(
        ~title=`详细答案`,
        ~height=200,
        ~width=300,
        ~left,
        ~top,
        (),
      )->Option.forEach(((_, doc)) =>
        {
          <div className={[style["mainBody"], style["answerDetail"]]->Array.joinWith(" ", s => s)}>
            this.detailHtml
          </div>
        }
        ->React.toNode
        ->Option.forEach(node =>
          doc->HtmlDocument.body->Option.forEach(body => body->Element.appendChild(~child=node))
        )
      )
    }

    let make = (subjectItem: Dom.element, extra: T.extra) => {
      let context = T.make(subjectItem, extra)
      let this = {
        detail: Map.String.empty,
        detailHtml: React.null,
        context: context,
      }

      subjectItem
      ->Element.querySelector(".item-type")
      ->Option.forEach(el => {
        el->Element.classList->DomTokenList.add(style["clickable"])
        let rect = el->Element.getBoundingClientRect
        el->Element.addClickEventListener(_ =>
          this->showDetail(
            ~top=rect->DomRect.top->Float.toInt,
            ~left=rect->DomRect.left->Float.toInt,
          )
        )
      })

      this
    }
  }
}

let percent = (a: int, b: int) => `${(a * 100 / b)->Int.toString}%`

let sortByKey = (arr: array<(string, _)>) =>
  arr->SortArray.stableSortBy(((a, _), (b, _)) => String.compare(a, b))

module ChoiceDetail = Detail.Make({
  type extra = string => string
  type context = {
    tooltips: Map.String.t<Tooltip.t>,
    choiceMap: extra,
  }
  type answer = array<string>
  type detail = Map.String.t<answer>

  let updateUI = (detail: detail, context: context) =>
    detail
    ->Map.String.reduce(Map.String.empty, (choiceToUsers, user, choices) =>
      choices->Array.reduce(choiceToUsers, (choiceToUsers, choice) =>
        choiceToUsers->Map.String.update(choice, users =>
          users->Option.getWithDefault([])->Array.concat([user])->Some
        )
      )
    )
    ->Map.String.toArray
    ->Array.map(((choice, users)) => (choice->context.choiceMap, users))
    ->sortByKey
    ->Array.map(((choice, users)) => {
      // Update tooltips to show how many users have selected the option.
      context.tooltips
      ->Map.String.get(choice)
      ->Option.forEach(u =>
        u->Tooltip.setContent(percent(users->Array.size, detail->Map.String.size))
      )
      // Choice
      //   - User1
      //   - User2
      <div>
        <p> <strong> {choice->React.string} </strong> </p>
        <UList>
          {users
          ->SortArray.String.stableSort
          ->Array.map(user => <p> {user->React.string} </p>)
          ->React.array}
        </UList>
      </div>
    })
    ->React.array

  let make = (subjectItem: Dom.element, extra: extra) => {
    tooltips: subjectItem
    ->Utils.querySelectorAllElements(".item-body .checkboxInput, .item-body .radioInput")
    ->Array.reduceWithIndex(Map.String.empty, (tooltips, ele, idx) => {
      tooltips->Map.String.set(Js.String.fromCharCode(idx + 65), ele->Tooltip.make)
    }),
    choiceMap: extra,
  }
})

module BlankDetail = Detail.Make({
  type extra = unit
  type context = {tooltips: Map.String.t<Tooltip.t>}
  type answer = array<(string, string)>
  type detail = Map.String.t<answer>

  let updateUI = (detail: detail, context: context) =>
    detail
    ->Map.String.reduce(Map.String.empty, (blankToFillToUsers, user, blankAndFill) =>
      blankAndFill->Array.reduce(blankToFillToUsers, (blankToFillToUsers, (blank, fill)) =>
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
    ->sortByKey
    ->Array.map(((blank, fillToUsers)) => {
      let fillToUsers = fillToUsers->Map.String.toArray->sortByKey
      // Update tooltips to show the most popular answers.
      context.tooltips
      ->Map.String.get(blank)
      ->Option.forEach(most =>
        fillToUsers
        ->Array.map(((fill, users)) => (fill, users->Array.size))
        ->SortArray.stableSortBy(((_, a), (_, b)) => b - a)
        ->Array.get(0)
        ->Option.forEach(((text, count)) =>
          most->Tooltip.setContent(`(${percent(count, detail->Map.String.size)}) ${text}`)
        )
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
            <React.Fragment>
              <p> {text->React.string} </p>
              <UList>
                {users
                ->SortArray.String.stableSort
                ->Array.map(user => <p> {user->React.string} </p>)
                ->React.array}
              </UList>
            </React.Fragment>
          )
          ->React.array}
        </UList>
      </div>
    })
    ->React.array

  let make = (subjectItem: Dom.element, _: extra) => {
    tooltips: subjectItem
    ->Utils.querySelectorAllElements(".item-body .checkboxInput, .item-body .radioInput")
    ->Array.reduceWithIndex(Map.String.empty, (tooltips, ele, idx) => {
      tooltips->Map.String.set(Js.String.fromCharCode(idx + 65), ele->Tooltip.make)
    }),
  }
})

module TextDetail = Detail.Make({
  type extra = unit
  type context = unit
  type answer = Answer.text
  type detail = Map.String.t<answer>

  let updateUI = (detail: detail, _: context) =>
    detail
    ->Map.String.toArray
    ->sortByKey
    ->Array.map(((user, text)) =>
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

  let make = (_: Dom.element, _: extra) => ()
})
