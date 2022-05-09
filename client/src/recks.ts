type HTMLEventProp<K extends keyof HTMLElementTagNameMap> = {
  [E in keyof HTMLElementEventMap as `on-${E}`]?: (
    this: HTMLElementTagNameMap[K],
    ev: HTMLElementEventMap[E]
  ) => void;
};
type ExcludeHTMLProp = "children" | "style" | "classList";
type ExtendHTMLProp = {
  classList?: string[];
  style?: StyleProp;
  dangerouslySetInnerHTML?: { __html: string };
};
type HTMLProp<K extends keyof HTMLElementTagNameMap> = {
  [A in keyof HTMLElementTagNameMap[K] as Exclude<
    A,
    ExcludeHTMLProp
  >]?: HTMLElementTagNameMap[K][A];
} & HTMLEventProp<K> &
  ExtendHTMLProp;
type StyleProp = {
  [S in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[S];
};

declare namespace Recks {
  type Child = Recks.Element | string | number;
  type Children = Child | Child[];
  type Element = HTMLElement | DocumentFragment;
  type PropWithChildren<T> = T & { children?: Children };

  namespace JSX {
    type Element = Recks.Element;
    interface ElementChildrenAttribute {
      children: any;
    }
    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: PropWithChildren<HTMLProp<K>>;
    };
  }
}

function addChildren(parent: Node, children: Recks.Child[]): void {
  for (const child of children) {
    if (child instanceof Node) {
      parent.appendChild(child);
    } else {
      parent.appendChild(document.createTextNode(String(child)));
    }
  }
}

function setCSSProps(ele: HTMLElement, style: StyleProp): void {
  for (const [name, value] of Object.entries(style)) {
    if (name.startsWith("-")) {
      ele.style.setProperty(name, value as any);
    } else {
      (ele.style as any)[name] = value as any;
    }
  }
}

function flattenChildren(children: Recks.Children[]): Recks.Child[] {
  let flatten: Recks.Child[] = [];
  for (const ele of children) {
    if (Array.isArray(ele)) {
      flatten = flatten.concat(ele);
    } else {
      flatten.push(ele);
    }
  }
  return flatten;
}

type Props = { [k: string]: any };

const Recks = {
  createElement<K extends keyof HTMLElementTagNameMap>(
    t: K | ((props: Props) => Recks.Element),
    props: Props | null,
    ...children: Recks.Children[]
  ): Recks.Element {
    let flatten = flattenChildren(children);
    if (typeof t === "function") {
      return t({ ...props, children: flatten });
    } else {
      const ele = document.createElement(t);
      addChildren(ele, flatten);
      for (const [name, value] of Object.entries(props ?? {})) {
        switch (name) {
          case "classList":
            ele.classList.add(...value);
            break;
          case "style":
            setCSSProps(ele, value);
            break;
          case "dangerouslySetInnerHTML":
            ele.innerHTML = value.__html;
            break;
          default:
            if (name.startsWith("on-")) {
              ele.addEventListener(name.slice(3), value);
            } else if (name in ele) {
              (ele as any)[name] = value;
            }
        }
      }
      return ele;
    }
  },

  Fragment(props: { children: any }): DocumentFragment {
    let frag = document.createDocumentFragment();
    if (Array.isArray(props.children)) {
      addChildren(frag, props.children);
    }
    return frag;
  },
};

export default Recks;
