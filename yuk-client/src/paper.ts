import { Paper, isChoice, ChoiceOption } from "./types";

export function sortProblems(paper: Paper): Paper {
  paper.data.problems.sort((a, b) => a.problem_id - b.problem_id);
  paper.data.problems.forEach((problem) => {
    if (isChoice(problem.ProblemType)) {
      (problem.Options as ChoiceOption[]).sort((a, b) => {
        return a.key < b.key ? -1 : 1;
      });
    }
  });
  return paper;
}
