declare global {
  namespace Recks {
    export type PropWithChildren<T> = T & { children?: any };

    namespace JSX {
      type Element = Node;

      interface ElementChildrenAttribute {
        children?: any;
      }

      type IntrinsicElements = {
        [K in keyof globalThis.JSX.IntrinsicElements]: PropWithChildren<{
          [P in keyof globalThis.JSX.IntrinsicElements[K] as Exclude<
            P,
            "children"
          >]: globalThis.JSX.IntrinsicElements[K][P];
        }>;
      };
    }
  }
}

function childrenToArray(children: any): Recks.JSX.Element[] {
  if (Array.isArray(children)) {
    return new Array<Node>().concat(...children.map(childrenToArray));
  } else if (children instanceof Node) {
    return [children];
  } else if (children === null || children === undefined) {
    return [];
  } else {
    return [document.createTextNode(String(children))];
  }
}

type Props = { [k: string]: any };

function addChildren(parent: Node, children: Recks.JSX.Element[]) {
  for (const child of children) {
    parent.appendChild(child);
  }
}

function setCSSProps(ele: HTMLElement, style: CSSStyleDeclaration) {
  for (const [name, value] of Object.entries(style)) {
    if (name.startsWith("-")) {
      ele.style.setProperty(name, value as any);
    } else {
      (ele.style as any)[name] = value as any;
    }
  }
}

function setDOMProps(ele: HTMLElement, props: Props) {
  for (const [name, value] of Object.entries(props)) {
    if (value === undefined) {
      continue;
    }
    switch (name) {
      case "class":
      case "className":
        ele.setAttribute("class", value);
        break;
      case "style":
        setCSSProps(ele, value);
        break;
      case "dangerouslySetInnerHTML":
        ele.innerHTML = value.__html;
        break;
      default:
        if (name.startsWith("on")) {
          ele.addEventListener(name.slice(2).toLowerCase(), value);
        } else {
          ele.setAttribute(name, value);
        }
    }
  }
}

export function createElement(
  t: string | ((props: Props) => Recks.JSX.Element),
  props: Props | null | undefined,
  ...children: any[]
): Recks.JSX.Element {
  props = props ?? {};
  let nodeArray = childrenToArray(children).concat(
    childrenToArray(props.children)
  );
  if (typeof t === "function") {
    return t({ ...props, children: nodeArray });
  } else {
    const ele = document.createElement(t);
    addChildren(ele, nodeArray);
    setDOMProps(ele, props ?? {});
    return ele;
  }
}

export function Fragment(props: Recks.PropWithChildren<{}>): DocumentFragment {
  let frag = document.createDocumentFragment();
  addChildren(frag, childrenToArray(props.children));
  return frag;
}

export function toNode(element: Recks.JSX.Element): Node | null {
  if (element instanceof Node) {
    return element;
  } else {
    return null;
  }
}

export const Children = {
  toArray: childrenToArray,
};

const Recks = {
  createElement: createElement,
  Fragment: Fragment,
};

export default Recks;
