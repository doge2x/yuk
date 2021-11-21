export type Answer = {
  // deno-lint-ignore camelcase
  problem_id: number;
  // deno-lint-ignore no-explicit-any
  result: any;
};

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
    problems: [
      {
        problem_id: number;
        // deno-lint-ignore no-explicit-any
        Options: [any];
      },
    ];
  };
};

export type PostAnswer = {
  results: Answer[];
};
