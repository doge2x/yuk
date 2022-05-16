module Props = ReactDOM.Props

type element

@module
external recks: {..} = "./recks"

@val
external null: element = "null"
external float: float => element = "%identity"
external int: int => element = "%identity"
external string: string => element = "%identity"
external array: array<element> => element = "%identity"
let toNode: element => option<Dom.node> = element =>
  recks["toNode"](. element)->Js.Nullable.toOption

module Children = {
  let toArray: element => array<element> = ele => recks["Children"]["toArray"](. ele)
}

@variadic @module("./recks")
external createElementVariadic: ('props => element, 'props, array<element>) => element =
  "createElement"
@module("./recks")
external createElement: ('props => element, 'props) => element = "createElement"

module DOMRe = {
  include Props

  @variadic @module("./recks")
  external createDOMElementVariadic: (string, ~props: Props.domProps=?, array<element>) => element =
    "createElement"

  @variadic @module("./recks")
  external createElement: (string, ~props: props=?, array<element>) => element = "createElement"
}

module Fragment = {
  @react.component
  let make = (~children) => recks["Fragment"](. {"children": children})
}
