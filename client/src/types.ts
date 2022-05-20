export type Answer = {
  problem_id: number;
  result: any;
};

export type UserAnswer = {
  username: string;
  problem_id: number;
  result?: ChoiceAnswer | BlankAnswer | ShortAnswerResult;
  context?: AnswerContext;
};

export type ChoiceAnswer = string[];

export type BlankAnswer = { [k: string]: string };

export type AttachedFile = {
  fileName: string;
  fileSize: string;
  fileUrl: string;
  fileType: string;
};

export type ShortAnswerResult = {
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
  problem_id: number;
  Options?: ChoiceOption[];
  problem_type: ProblemType;
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
  state?: number;
  msg?: string;
};
