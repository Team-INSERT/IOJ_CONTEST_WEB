export type QuestionStatus = 'ACCEPTED' | 'PARTIAL' | 'WRONG_ANSWER' | null;

export interface ContestProblem {
  id: number;
  title: string;
  verdict: QuestionStatus;
  score: number;
  level: number;
}

export interface ContestResponse {
  endTime: string;
  problems: ContestProblem[];
  title: string;
}

export interface ContestDetailResponse {
  endtime: string;
  problemIds: { id: number; orderId: number }[];
}
