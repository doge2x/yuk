export type Answer = {
  problem_id: number;
  result: Result;
};

export type UserAnswer = {
  username: string;
  problem_id: number;
  result?: Result;
  context?: AnswerContext;
};

export type Result = ChoiceResult | BlankResult | ShortResult;

export type ChoiceResult = string[];

export type BlankResult = { [k: string]: string };

export type AttachedFile = {
  fileName: string;
  fileSize: string;
  fileUrl: string;
  fileType: string;
};

export type ShortResult = {
  content?: string;
  attachments?: {
    filelist?: AttachedFile[];
  };
};

export type PostAnswer = {
  exam_id: string;
  results?: Answer[];
};

export type Paper = {
  data: {
    title: string;
    has_problem_dict: true;
    problems: Problem[] | ProblemDict[];
  };
};

export type ProblemDict = {
  id: number;
  order: number;
  problems: Problem[];
};

export type CacheResults = {
  data: {
    results: Answer[];
  };
};

export type Problem = {
  ProblemID: number;
  Options?: ChoiceOption[];
  ProblemType: ProblemType;
};

export enum ProblemType {
  SingleChoice = 1,
  MultipleChoice = 2,
  Polling = 3,
  FillBlank = 4,
  ShortAnswer = 5,
  Judgement = 6,
}

export type ChoiceOption = {
  key: string;
  value: string;
};

export type AnswerContext = {
  state?: AnswerState;
  msg?: string;
};

export enum AnswerState {
  WorkingOn = 0,
  Sure = 1,
  NotSure = 2,
}
