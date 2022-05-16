import {
  Card as Card_,
  Problem as Problem_,
  Answer as Answer_,
} from "./Card.bs";
import { Problem, ProblemType } from "./types";

export class Card {
  private card: any;
  private type_: ProblemType;

  constructor(
    problem: Problem,
    subjectItem: Element,
    choiceMap: (s: string) => string
  ) {
    let prob;
    switch (problem.ProblemType) {
      case ProblemType.SingleChoice:
      case ProblemType.MultipleChoice:
      case ProblemType.Judgement:
      case ProblemType.Polling:
        prob = Problem_.makeChoice(problem.problem_id);
        break;
      case ProblemType.FillBlank:
        prob = Problem_.makeBlank(problem.problem_id);
        break;
      case ProblemType.ShortAnswer:
        prob = Problem_.makeText(problem.problem_id);
        break;
    }
    this.card = Card_.make(prob, subjectItem, choiceMap);
    this.type_ = problem.ProblemType;
  }

  updateAnswer(username: string, result: any) {
    let ans;
    switch (this.type_) {
      case ProblemType.SingleChoice:
      case ProblemType.MultipleChoice:
      case ProblemType.Judgement:
      case ProblemType.Polling:
        ans = Answer_.makeChoice(result);
        break;
      case ProblemType.FillBlank:
        ans = Answer_.makeBlank(result);
        break;
      case ProblemType.ShortAnswer:
        ans = Answer_.makeText(result);
        break;
    }
    Card_.updateAnswer(this.card, username, ans);
  }

  updateUI() {
    Card_.updateUI(this.card);
  }
}
