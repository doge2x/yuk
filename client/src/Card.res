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

  type t =
    | Choice(array<string>)
    | Blank(array<(string, string)>)
    | Text(text)

  let makeChoice = (v: array<string>) => v->Choice
  let makeBlank = (v: Js.Dict.t<string>) => v->Js.Dict.entries->Blank
  let makeText = (v: text) => v->Text
}

module Problem = {
  type ty =
    | Choice
    | Blank
    | Text

  type t = {
    id: int,
    ty: ty,
  }

  let makeChoice = (id: int) => {
    id: id,
    ty: Choice,
  }

  let makeBlank = (id: int) => {
    id: id,
    ty: Blank,
  }

  let makeText = (id: int) => {
    id: id,
    ty: Text,
  }
}

module Tooltip = {
  type t = {_ele: Dom.element}
  let make = (ele: Dom.element) => {_ele: ele}
  let setContent = (this: t, text: string) => this._ele->Element.setAttribute("title", text)
}

module Card = {
  type _choiceDetail = Map.String.t<array<string>>

  type _blankDetail = Map.String.t<array<(string, string)>>

  type _textDetail = Map.String.t<Answer.text>

  type _detail =
    | Choice(_choiceDetail)
    | Blank(_blankDetail)
    | Text(_textDetail)

  type t = {
    mutable _details: _detail,
    mutable _detailsHtml: React.element,
    _tooltips: Map.String.t<Tooltip.t>,
    _choiceMap: string => string,
  }

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
          this._detailsHtml
        </div>
      }
      ->React.toNode
      ->Option.forEach(node =>
        doc->HtmlDocument.body->Option.forEach(body => body->Element.appendChild(~child=node))
      )
    )
  }

  let updateAnswer = (this: t, username: string, answer: Answer.t) => {
    this._details = switch (this._details, answer) {
    | (Choice(d), Answer.Choice(a)) => d->Map.String.set(username, a)->Choice
    | (Blank(d), Answer.Blank(a)) => d->Map.String.set(username, a)->Blank
    | (Text(d), Answer.Text(a)) => d->Map.String.set(username, a)->Text
    | _ => this._details
    }
  }

  let updateUI = (this: t) => {
    let _percent = (a: int, b: int) => `${(a * 100 / b)->Int.toString}%`

    let _sortByKey = (arr: array<(string, _)>) =>
      arr->SortArray.stableSortBy(((a, _), (b, _)) => String.compare(a, b))

    let _mapSetAdd = (t: Map.String.t<Set.String.t>, k: string, v: string) =>
      t->Map.String.update(k, s =>
        s->Option.mapWithDefault(Set.String.empty, u => u->Set.String.add(v))->Some
      )

    this._detailsHtml = switch this._details {
    | Choice(chiceDetails) =>
      chiceDetails
      ->Map.String.reduce(Map.String.empty, (choiceToUsers, user, choices) =>
        choices->Array.reduce(choiceToUsers, (choiceToUsers, choice) =>
          choiceToUsers->Map.String.update(choice, users =>
            users->Option.getWithDefault([])->Array.concat([user])->Some
          )
        )
      )
      ->Map.String.toArray
      ->Array.map(((choice, users)) => (choice->this._choiceMap, users))
      ->_sortByKey
      ->Array.map(((choice, users)) => {
        // Update tooltips to show how many users have selected the option.
        this._tooltips
        ->Map.String.get(choice)
        ->Option.forEach(u =>
          u->Tooltip.setContent(_percent(users->Array.size, chiceDetails->Map.String.size))
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
    | Blank(blankDetails) =>
      blankDetails
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
      ->_sortByKey
      ->Array.map(((blank, fillToUsers)) => {
        let fillToUsers = fillToUsers->Map.String.toArray->_sortByKey
        // Update tooltips to show the most popular answers.
        this._tooltips
        ->Map.String.get(blank)
        ->Option.forEach(most =>
          fillToUsers
          ->Array.map(((fill, users)) => (fill, users->Array.size))
          ->SortArray.stableSortBy(((_, a), (_, b)) => b - a)
          ->Array.get(0)
          ->Option.forEach(((text, count)) =>
            most->Tooltip.setContent(`(${_percent(count, blankDetails->Map.String.size)}) ${text}`)
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
    | Text(textDetails) =>
      textDetails
      ->Map.String.toArray
      ->_sortByKey
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
    }
  }

  let make = (prob: Problem.t, subjectItem: Dom.element, choiceMap: string => string): t => {
    let (tooltips, details) = switch prob.ty {
    | Problem.Choice => (
        subjectItem
        ->Utils.querySelectorAllElements(".item-body .checkboxInput, .item-body .radioInput")
        ->Array.reduceWithIndex(Map.String.empty, (tooltips, ele, idx) => {
          tooltips->Map.String.set(Js.String.fromCharCode(idx + 65), ele->Tooltip.make)
        }),
        Map.String.empty->Choice,
      )
    | Problem.Blank => (
        subjectItem
        ->Utils.querySelectorAllElements(".item-body .blank-item-dynamic")
        ->Array.reduceWithIndex(Map.String.empty, (tooltips, ele, idx) =>
          tooltips->Map.String.set((idx + 1)->Int.toString, ele->Tooltip.make)
        ),
        Map.String.empty->Blank,
      )
    | Problem.Text => (Map.String.empty, Map.String.empty->Text)
    }

    let this = {
      _tooltips: tooltips,
      _details: details,
      _detailsHtml: React.null,
      _choiceMap: choiceMap,
    }

    subjectItem
    ->Element.querySelector(".item-type")
    ->Option.forEach(el => {
      el->Element.classList->DomTokenList.add(style["clickable"])
      let rect = el->Element.getBoundingClientRect
      el->Element.addClickEventListener(_ =>
        this->showDetail(~top=rect->DomRect.top->Float.toInt, ~left=rect->DomRect.left->Float.toInt)
      )
    })

    this
  }
}
