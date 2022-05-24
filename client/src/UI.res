open Belt
open Webapi.Dom
open Detail

@module("./style.mod.less")
external styleCss: {..} = "default"

@module
external style: {..} = "./style.mod.less"

module React = Recks
module ReactDOMRe = Recks.DOMRe

let showConfirmUpload = (dataURL: string, cb: unit => unit) => {
  let (win, body) = Utils.openWin(~title=`上传图片`, ~width=300, ~height=200, ())
  body->Element.appendChild(
    ~child=<div className={[style["mainBody"], style["uploadImg"]]->Utils.joinStrings(" ")}>
      <div className={style["uploadImgConfirm"]}>
        <button
          onClick={_ => {
            cb()
            win->Window.close
          }}
          className={style["clickable"]}>
          {`确认上传`->React.string}
        </button>
        <span> <i> {`*关闭窗口以取消上传`->React.string} </i> </span>
      </div>
      <div className={style["uploadImgImage"]}> <img src=dataURL /> </div>
    </div>
    ->React.toNode
    ->Option.getExn,
  )
}
module Problem = {
  @deriving(jsConverter)
  type probelmType =
    | @as(1) SingleChoice
    | @as(2) MultipleChoice
    | @as(3) Polling
    | @as(4) FillBlank
    | @as(5) ShortAnswer
    | @as(6) Judgement

  type choiceOption = {key: string, value: string}

  type t = {
    @as("ProblemID") id: int,
    @as("ProblemType") ty: int,
    @as("Options") options: option<array<choiceOption>>,
  }
}

module UI = {
  type answer

  external unsafeConvertAnswer: answer => _ = "%identity"

  type detail<'a, 'b> = {
    updateUI: 'a => unit,
    updateAnswer: ('a, string, answerContext<'b>) => unit,
  }

  type updateDetail = {
    updateUI: unit => unit,
    updateAnswer: (string, answerContext<answer>) => unit,
  }

  let unsafeConvertUpdateDetail = (t: detail<'a, 'b>, d: 'a) => {
    updateUI: () => t.updateUI(d),
    updateAnswer: (username: string, data: answerContext<answer>) =>
      t.updateAnswer(
        d,
        username,
        {
          answer: data.answer->Option.map(unsafeConvertAnswer),
          context: data.context,
        },
      ),
  }

  type t = {details: Map.Int.t<updateDetail>}

  let make = (problems: array<Problem.t>) => {
    let (head, body) =
      document
      ->Document.asHtmlDocument
      ->Option.flatMap(doc =>
        doc->HtmlDocument.body->Option.map(body => (doc->HtmlDocument.head, body))
      )
      ->Option.getExn

    // Inject CSS rules.
    head->Element.appendChild(
      ~child=<style> {styleCss["toString"](.)->React.string} </style>->React.toNode->Option.getExn,
    )

    // Inject settings.
    let header =
      body
      ->Element.querySelector(".header-title")
      ->Option.flatMap(HtmlElement.ofElement)
      ->Option.getExn
    header->HtmlElement.classList->DomTokenList.add(style["clickable"])
    header->HtmlElement.addClickEventListener(_ => Settings.showSettings())

    // Inject answer details.
    let subjectItems =
      body
      ->Element.querySelectorAll(".exam-main--body .subject-item")
      ->NodeList.toArray
      ->Array.map(node => node->Element.ofNode->Option.getExn)
    if subjectItems->Array.size != problems->Array.size {
      Js.Exn.raiseError("wrong number of subject items")
    }
    let detials =
      problems
      ->Array.zip(subjectItems)
      ->Array.reduce(Map.Int.empty, (details, (prob, subjectItem)) => {
        let ty = Problem.probelmTypeFromJs(prob.ty)->Option.getExn
        let detail = switch ty {
        | Problem.SingleChoice
        | Problem.MultipleChoice
        | Problem.Judgement
        | Problem.Polling => {
            let choiceMap =
              prob.options
              ->Option.getExn
              ->Array.mapWithIndex((i, o) => (o.key, Js.String.fromCharCode(65 + i)))
              ->Map.String.fromArray
            {
              updateAnswer: Detail.Choice.updateAnswer,
              updateUI: Detail.Choice.updateUI,
            }->unsafeConvertUpdateDetail(
              Detail.Choice.make(prob.id, subjectItem, s => choiceMap->Map.String.getExn(s)),
            )
          }
        | Problem.FillBlank =>
          {
            updateAnswer: Detail.Blank.updateAnswer,
            updateUI: Detail.Blank.updateUI,
          }->unsafeConvertUpdateDetail(Detail.Blank.make(prob.id, subjectItem, ()))

        | Problem.ShortAnswer =>
          {
            updateAnswer: Detail.ShortAnswer.updateAnswer,
            updateUI: Detail.ShortAnswer.updateUI,
          }->unsafeConvertUpdateDetail(Detail.ShortAnswer.make(prob.id, subjectItem, ()))
        }
        details->Map.Int.set(prob.id, detail)
      })

    {details: detials}
  }

  let updateAnswer = (this: t, problemId: int, username: string, data: answerContext<answer>) =>
    this.details->Map.Int.get(problemId)->Option.forEach(d => d.updateAnswer(username, data))

  let updateUI = (this: t) => this.details->Map.Int.forEach((_, d) => d.updateUI())
}
