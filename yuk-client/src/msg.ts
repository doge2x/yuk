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
