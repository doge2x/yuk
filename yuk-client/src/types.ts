export type Answer = {
  problem_id: number;
  result: Result;
};

export type Result = any;

export type UserAnswer = {
  username: string;
  answers: Answer[];
};

export type MsgSend = Answer[];

export type MsgReceive = UserAnswer[];

export type Exam = {
  id: number;
  paper: Paper;
};

export type Paper = {
  data: {
    title: string;
    problems: Problem[];
  };
};

export type CacheResults = {
  data: {
    results: Answer[];
  };
};

export type Problem = {
  problem_id: number;
  Options?: ChoiceOption[];
  ProblemType: ProblemType;
};

export enum ProblemType {
  // 单选题
  SingleChoice = 1,
  // 多选题
  MultipleChoice = 2,
  // 投票题
  Polling = 3,
  // 填空题
  FillBlack = 4,
  // 主观题
  ShortAnswer = 5,
  // 判断题
  Judgement = 6,
}

export type ChoiceOption = {
  key: string;
  value: string;
};

export function isChoice(ty: ProblemType): boolean {
  return (
    ty === ProblemType.SingleChoice ||
    ty === ProblemType.MultipleChoice ||
    ty === ProblemType.Polling
  );
}

export type PostAnswer = {
  results: Answer[];
};
