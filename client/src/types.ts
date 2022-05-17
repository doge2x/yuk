export type Answer = {
  problem_id: number;
  result: any;
};

export type UserAnswer = {
  username: string;
  problem_id: number;
  result: any;
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
  ProblemType: ProblemType;
};

export enum ProblemType {
  /**
   * 单选题
   */
  SingleChoice = 1,
  /**
   * 多选题
   */
  MultipleChoice = 2,
  /**
   * 投票题
   */
  Polling = 3,
  /**
   * 填空题
   */
  FillBlank = 4,
  /**
   * 主观题
   */
  ShortAnswer = 5,
  /**
   * 判断题
   */
  Judgement = 6,
}

export type ChoiceOption = {
  key: string;
  value: string;
};
