open Webapi.Dom
open Belt

@module("./style.mod.less")
external styleCss: {..} = "default"

module React = Recks
module ReactDOMRe = Recks.DOMRe

let querySelectorAllElements = (t: Dom.element, q: string) =>
  t->Element.querySelectorAll(q)->NodeList.toArray->Array.keepMap(Element.ofNode)

module UList = {
  @react.component
  let make = (~children: React.element) =>
    <ul>
      {React.Children.toArray(children)
      ->Js.Array2.map(item => {
        <li> item </li>
      })
      ->React.array}
    </ul>
}

let openWin = (
  ~title: string,
  ~height: int,
  ~width: int,
  ~left: option<int>=?,
  ~top: option<int>=?,
  (),
) =>
  window
  ->Window.open_(
    ~url="",
    ~name="",
    ~features=[
      ("location", "no"),
      ("height", height->Int.toString),
      ("width", width->Int.toString),
      ("left", left->Option.getWithDefault(0)->Int.toString),
      ("top", top->Option.getWithDefault(0)->Int.toString),
    ]->Array.joinWith(",", ((k, v)) => `${k}=${v}`),
    (),
  )
  ->Option.flatMap(win =>
    win
    ->Window.document
    ->Document.asHtmlDocument
    ->Option.map(html => {
      <React.Fragment>
        <title> {title->React.string} </title>
        <style> {styleCss["toString"](.)->Recks.string} </style>
      </React.Fragment>
      ->React.toNode
      ->Option.forEach(node => html->HtmlDocument.head->Element.appendChild(~child=node))
      (win, html)
    })
  )
