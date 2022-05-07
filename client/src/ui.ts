import {
  Paper,
  Problem,
  ProblemType,
  ChoiceResult,
  BlankResult,
  UserAnswer,
} from "./types";
import style from "./style.module.css";
import { SERVER, USERNAME } from "./config";

class Map2<K, V> extends Map<K, V> {
  private def: () => V;

  constructor(def: () => V) {
    super();
    this.def = def;
  }

  setWith(key: K, op: (val: V) => V) {
    super.set(key, op(super.get(key) ?? this.def()));
  }
}

function percent(n: number): string {
  return `${Math.floor(n * 100)}%`;
}

class Tooltip {
  private tooltip: HTMLElement;

  constructor(ele: HTMLElement) {
    const tooltip = document.createElement("div");
    tooltip.classList.add(style.tooltip);
    ele.after(tooltip);

    this.tooltip = tooltip;

    const show = () => this.tooltip.setAttribute("data-show", "");
    const hide = () => this.tooltip.removeAttribute("data-show");
    ele.addEventListener("mouseover", show);
    ele.addEventListener("mouseout", hide);

    this.toggle(true);
  }

  toggle(enabled: boolean) {
    this.tooltip.style.visibility = enabled ? "" : "hidden";
  }

  set content(val: string) {
    this.tooltip.textContent = val;
  }
}

class ProblemCard {
  private type: ProblemType;
  /**
   * Username => Result
   */
  private results: Map<string, any> = new Map();
  /**
   * Option key => Option Card
   */
  private options: Map<string, Tooltip>;

  constructor(problem: Problem, subjectItem: Element) {
    const type = problem.ProblemType;
    const options = new Map();
    switch (type) {
      case ProblemType.SingleChoice:
      case ProblemType.MultipleChoice:
      case ProblemType.Polling:
      case ProblemType.Judgement:
        subjectItem
          .querySelectorAll(".item-body div ul li")
          .forEach((li, idx) => {
            options.set(
              problem.Options![idx].key,
              new Tooltip(li as HTMLElement)
            );
          });
        break;
      case ProblemType.FillBlank:
        subjectItem
          .querySelectorAll(".item-body div span input")
          .forEach((span, idx) => {
            options.set(`${idx + 1}`, new Tooltip(span as HTMLElement));
          });
        break;
    }

    this.type = type;
    this.options = options;
  }

  updateResult(username: string, result: any) {
    this.results.set(username, result);
  }

  updateUI() {
    // Reset tooltip of options.
    this.options.forEach((opt) => (opt.content = ""));
    switch (this.type) {
      // Tooltip show how many users have selected the option.
      case ProblemType.SingleChoice:
      case ProblemType.MultipleChoice:
      case ProblemType.Polling:
      case ProblemType.Judgement:
        const optCounter = new Map2<string, number>(() => 0);
        this.results.forEach((res: ChoiceResult) => {
          res.forEach((key) => {
            optCounter.setWith(key, (n) => n + 1);
          });
        });
        optCounter.forEach((num, key) => {
          this.options.get(key)!.content = `[${percent(
            num / this.results.size
          )}]`;
        });
        break;
      // Tooltip show the most popular answers.
      case ProblemType.FillBlank:
        const ansCounter = new Map2<string, Map2<string, number>>(
          () => new Map2(() => 0)
        );
        this.results.forEach((res: BlankResult) => {
          Object.entries(res).forEach(([key, text]) => {
            ansCounter.setWith(key, (counter) => {
              counter.setWith(text, (n) => n + 1);
              return counter;
            });
          });
        });
        ansCounter.forEach((counter, key) => {
          const [text, num] = [...counter.entries()]
            .sort(([_1, a], [_2, b]) => a - b)
            .pop()!;
          this.options.get(key)!.content = `[${percent(
            num / this.results.size
          )}] ${text}`;
        });
        break;
    }
  }
}

function createButtonText(text: string, onClick: () => void): Element {
  const ele = document.createElement("span");
  ele.classList.add(style.buttonText);
  ele.textContent = text;
  ele.addEventListener("click", onClick);
  return ele;
}

export class UI {
  private problems: Map<number, ProblemCard>;

  constructor(paper: Paper) {
    // Header.
    const header = document.querySelector(".header-title")!;
    header.appendChild(createButtonText("U", () => USERNAME.updateValue()));
    header.appendChild(createButtonText("S", () => SERVER.updateValue()));
    // Problem cards.
    const problems = new Map();
    document
      .querySelectorAll(".exam-main--body div .subject-item")
      .forEach((subjectItem, idx) => {
        const prob = paper.data.problems[idx];
        problems.set(prob.problem_id, new ProblemCard(prob, subjectItem));
      });
    this.problems = problems;
  }

  updateAnswer({ username, problem_id, result }: UserAnswer) {
    this.problems.get(problem_id)?.updateResult(username, result);
  }

  updateUI() {
    this.problems.forEach((card) => card.updateUI());
  }
}
