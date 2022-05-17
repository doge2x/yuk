open Belt
open Webapi.Dom

@module("./style.mod.less")
external styleCss: {..} = "default"

@module
external style: {..} = "./style.mod.less"

module React = Recks
module ReactDOMRe = Recks.DOMRe

let showConfirmUpload = (dataURL: string, cb: unit => unit) =>
  Utils.openWin(~title=`上传图片`, ~width=300, ~height=200, ())->Option.map(((win, doc)) =>
    doc
    ->HtmlDocument.body
    ->Option.forEach(body =>
      <div className={[style["mainBody"], style["uploadImg"]]->Utils.joinStrings(" ")}>
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
      ->Option.forEach(Element.appendChild(body, ~child=_))
    )
  )

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
    @as("problem_id") problemId: int,
    @as("ProblemType") problemType: int,
    @as("Options") options: option<array<choiceOption>>,
  }
}

module UI = {
  type answer

  external answerToAny: answer => _ = "%identity"

  type detail = {updateUI: unit => unit, updateAnswer: (string, answer) => unit}

  type t = {details: Map.Int.t<detail>}

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
        let ty = Problem.probelmTypeFromJs(prob.problemType)->Option.getExn
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
            let detail = Detail.Choice.make(subjectItem, s => choiceMap->Map.String.getExn(s))
            {
              updateAnswer: (username, answer) =>
                detail->Detail.Choice.updateAnswer(username, answer->answerToAny),
              updateUI: () => detail->Detail.Choice.updateUI,
            }
          }
        | Problem.FillBlank => {
            let detail = Detail.Blank.make(subjectItem, ())
            {
              updateAnswer: (username, answer) =>
                detail->Detail.Blank.updateAnswer(username, answer->answerToAny),
              updateUI: () => detail->Detail.Blank.updateUI,
            }
          }
        | Problem.ShortAnswer => {
            let detail = Detail.ShortAnswer.make(subjectItem, ())
            {
              updateAnswer: (username, answer) =>
                detail->Detail.ShortAnswer.updateAnswer(username, answer->answerToAny),
              updateUI: () => detail->Detail.ShortAnswer.updateUI,
            }
          }
        }
        details->Map.Int.set(prob.problemId, detail)
      })

    {details: detials}
  }

  let updateAnswer = (this: t, problemId: int, username: string, answer: answer) =>
    this.details->Map.Int.get(problemId)->Option.forEach(d => d.updateAnswer(username, answer))

  let updateUI = (this: t) => this.details->Map.Int.forEach((_, d) => d.updateUI())
}
