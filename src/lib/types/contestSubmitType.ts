export type JudgeStatus =
  | 'ACCEPTED'
  | 'PARTIAL'
  | 'WRONG_ANSWER'
  | 'COMPILATION_ERROR'
  | 'OUT_OF_MEMORY'
  | 'TIME_LIMIT_EXCEEDED'
  | 'RUNTIME_ERROR';

export type SubtaskInfo = {
  score: number;
  perfectScore: number;
  passedTestcases: number;
  totalTestcases: number;
  maxExecutionTime: number;
  maxMemoryUsed: number;
  verdict: JudgeStatus;
};

export type SubmissionResult = {
  verdict: JudgeStatus;
  subtaskInfos: SubtaskInfo[];
};

export type SubmitState =
  | { id: number; status: 'loading' }
  | { id: number; status: 'done'; data: SubmissionResult | { error: string } };

export type ContestTestcaseType = {
  index?: number;
  input?: string;
  output?: string;
  expectedOutput?: string;
  verdict?: string;
};

export type ProblemOrder = {
  problemId: number;
  orderId: number;
};

export type RankingUser = {
  userId: number;
  userName: string;
  totalScore: number;
  achievedAt: string;
  penalty: number;
};

export type SubmissionProblem = {
  problemId: number;
  score: number;
  verdict: JudgeStatus;
};

export type UserSubmission = {
  problems: SubmissionProblem[];
  userId: number;
};

export type RankingResponse = {
  problemOrders: ProblemOrder[];
  rankings: RankingUser[];
  submissions: UserSubmission[];
};
