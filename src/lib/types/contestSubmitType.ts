type JudgeStatus =
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'COMPILATION_ERROR'
  | 'OUT_OF_MEMORY'
  | 'TIME_LIMIT_EXCEEDED'
  | 'RUNTIME_ERROR';

export type SubmitState =
  | { id: number; status: 'loading' }
  | { id: number; status: 'done'; data: JudgeStatus | { error: string } };

export type ContestTestcaseType = {
  index?: number;
  input?: string;
  output?: string;
  expectOutput?: string;
  verdict?: string;
};
