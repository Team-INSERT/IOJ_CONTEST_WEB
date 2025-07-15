import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import contestApi from './contest.api';

export interface ApiErrorResponse {
  code: string;
  message: string;
  status: number;
}

export interface SubmitProblemVariables {
  contestId: number;
  problemId: number;
  sourcecode: string;
  language: 'PYTHON' | 'JAVA' | 'C' | 'CPP';
}

export const usePostSubmitProblem = () => {
  return useMutation<
    string,
    AxiosError<ApiErrorResponse>,
    SubmitProblemVariables
  >({
    mutationFn: (vars) => contestApi.postSubmitProblem(vars),
  });
};

export const usePostCreateTestcase = () => {
  return useMutation({
    mutationFn: contestApi.postCreateTestcase,
  });
};
