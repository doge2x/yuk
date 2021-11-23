import $ from "jquery";
import { Answer, Paper, Result, UserAnswer } from "./types";

const YUK_INJECT = "__yuk_inject";
const VOID_LINK = `<a
  href="javascript:void(0);"
/>`;
const PROBLEM_CARD = `<div
  style="
    position: absolute;
    top: 0;
    left: 100%;
    margin-left: 3.5rem;

    height: 95%;
    width: 20rem; 
    padding: .5rem;
    overflow: scroll;

    opacity: .5;
    border-style: dashed;
  "
/>`;

function toggleVis() {
  $(`.${YUK_INJECT}`).toggle();
}

function headerSpan(name: string): JQuery {
  return $(`<span />`)
    .text(`${name}: `)
    .addClass(YUK_INJECT)
    .css("margin-left", ".5rem");
}

export class MainUI {
  problemCards: Map<number, JQuery>;
  answers: Map<number, Map<string, Result>>;

  constructor(paper: Paper) {
    const examMainBody = $(".exam-main--body");
    // Move exam main body left.
    examMainBody.css("transform", "translateX(-5rem)");
    // Inject answers.
    const problems = new Map<number, JQuery>();
    examMainBody.children(".subject-item").each(function (index) {
      // Remove scroll bar.
      $(this).css("overflow", "visible");
      const problemCard = $(PROBLEM_CARD).addClass(YUK_INJECT).appendTo(this);
      problems.set(paper.data.problems[index].problem_id, problemCard);
    });
    this.problemCards = problems;
    this.answers = new Map();
  }

  updateAnswer(answers: UserAnswer[]) {
    // Merge answers.
    answers.forEach((userAns) => {
      userAns.answers.forEach((ans) => {
        let userResult = this.answers.get(ans.problem_id);
        if (userResult === undefined) {
          userResult = new Map();
          this.answers.set(ans.problem_id, userResult);
        }
        userResult.set(userAns.username, ans.result);
      });
    });
    // Show answers.
    this.answers.forEach((userResult, problemId) => {
      const card = this.problemCards.get(problemId);
      if (card !== undefined) {
        card.empty();
        userResult.forEach((result, username) => {
          // TODO: improve showing texts
          card.append(`<p>${username}: ${result}</p>`);
        });
      }
    });
  }
}

export function initUI(args: {
  login(this: JQuery): JQuery;
  username(this: JQuery): JQuery;
  server(this: JQuery): JQuery;
}) {
  const headerTitle = $(".header-title");
  // Visibility toggler.
  headerTitle.wrapInner($(VOID_LINK).on("click", toggleVis));
  // Login button.
  headerTitle.append(
    headerSpan("登陆状态").append(args.login.call($(VOID_LINK)))
  );
  // Username button.
  headerTitle.append(
    headerSpan("用户名").append(args.username.call($(VOID_LINK)))
  );
  // Server button.
  headerTitle.append(
    headerSpan("服务器").append(args.server.call($(VOID_LINK)))
  );
  // Hide all injected elements.
  toggleVis();
}
