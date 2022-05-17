module Props = ReactDOM.Props

type element

@val
external null: element = "null"
external float: float => element = "%identity"
external int: int => element = "%identity"
external string: string => element = "%identity"
external array: array<element> => element = "%identity"
@module("./recks") @return(nullable)
external toNode: element => option<Dom.node> = "toNode"

module Children = {
  @module("./recks") @scope("Children")
  external toArray: element => array<element> = "toArray"
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
