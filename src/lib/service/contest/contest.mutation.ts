import { useMutation } from '@tanstack/react-query';
import contestApi from './contest.api';

export const usePostSubmitProblem = () => {
  return useMutation({
    mutationFn: contestApi.postSubmitProblem,
  });
};

export const usePostCreateTestcase = () => {
  return useMutation({
    mutationFn: contestApi.postCreateTestcase,
  });
};
