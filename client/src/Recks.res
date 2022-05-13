module Props = ReactDOM.Props

type element

@val
external null: element = "null"
external float: float => element = "%identity"
external int: int => element = "%identity"
external string: string => element = "%identity"
external array: array<element> => element = "%identity"

module Children = {
  @module
  external _recks: {..} = "./recks"

  let toArray = _recks["Children"]["toArray"]
}

@variadic @module("./recks")
external createDOMElementVariadic: (string, ~props: Props.domProps=?, array<element>) => element =
  "createElement"
@variadic @module("./recks")
external createElementVariadic: ('props => element, 'props, array<element>) => element =
  "createElement"
@module("./recks")
external createElement: ('props => element, 'props) => element = "createElement"

module DOMRe = {
  include Props
  let createDOMElementVariadic = createDOMElementVariadic
}
