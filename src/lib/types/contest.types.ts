export type QuestionStatus = 'ACCEPTED' | 'PARTIAL' | null;

export interface ContestProblem {
  id: number;
  title: string;
  verdict: QuestionStatus;
  level: number;
}
