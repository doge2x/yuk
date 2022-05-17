open Webapi.Dom
open Belt

@module("./style.mod.less")
external styleCss: {..} = "default"

module React = Recks
module ReactDOMRe = Recks.DOMRe

let joinStrings = (s: array<string>, sep: string) => s->Array.joinWith(sep, s => s)

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
) => {
  let win =
    window
    ->Window.open_(
      ~url="",
      ~name="",
      ~features=[
        ("location", "no"),
        ("height", height->Int.toString),
        ("width", width->Int.toString),
        ("left", left->Option.mapWithDefault("0", Int.toString)),
        ("top", top->Option.mapWithDefault("0", Int.toString)),
      ]->Array.joinWith(",", ((k, v)) => `${k}=${v}`),
      (),
    )
    ->Option.getExn
  let html = win->Window.document->Document.asHtmlDocument->Option.getExn
  html
  ->HtmlDocument.head
  ->Element.appendChild(~child=<title> {title->React.string} </title>->React.toNode->Option.getExn)
  html
  ->HtmlDocument.head
  ->Element.appendChild(
    ~child=<style> {styleCss["toString"](.)->Recks.string} </style>->React.toNode->Option.getExn,
  )
  (win, html->HtmlDocument.body->Option.getExn)
}
