import { Paper } from "./types.ts";

export function sortProblems(paper: Paper): Paper {
  paper.data.problems.sort((a, b) => a.problem_id - b.problem_id);
  return paper;
}
