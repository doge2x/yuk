import { throws } from "assert";
import {
  ChoiceDetail,
  BlankDetail,
  TextDetail,
  Answer as Answer_,
} from "./Detail.bs";
import { Problem, ProblemType } from "./types";

export class Card {
  updateUI: () => void;
  updateAnswer: (username: string, answer: any) => void;

  constructor(
    problem: Problem,
    subjectItem: Element,
    choiceMap: (s: string) => string
  ) {
    interface Proto {
      updateUI(detail: any): void;
      updateAnswer(detail: any, username: string, answer: any): void;
    }

    let detail: any;
    let detailProto: Proto;

    switch (problem.ProblemType) {
      case ProblemType.SingleChoice:
      case ProblemType.MultipleChoice:
      case ProblemType.Judgement:
      case ProblemType.Polling: {
        detail = ChoiceDetail.make(subjectItem, choiceMap);
        detailProto = ChoiceDetail;
        break;
      }
      case ProblemType.FillBlank: {
        detail = BlankDetail.make(subjectItem, undefined);
        detailProto = BlankDetail;
        break;
      }
      case ProblemType.ShortAnswer: {
        detail = TextDetail.make(subjectItem, undefined);
        detailProto = TextDetail;
        break;
      }
    }

    this.updateUI = () => detailProto.updateUI(detail);
    this.updateAnswer = (username, answer) =>
      detailProto.updateAnswer(detail, username, answer);
  }
}
