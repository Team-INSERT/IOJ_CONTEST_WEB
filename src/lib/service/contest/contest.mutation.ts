import { useMutation } from '@tanstack/react-query';
import contestApi from './contest.api';

export const usePostSubmitProblem = () => {
  return useMutation({
    mutationFn: contestApi.postSubmitProblem,
  });
};

export const usePostSubmitTestcase = () => {
  return useMutation({
    mutationFn: contestApi.postSubmitTestcase,
  });
};

export const usePostCreateTestcase = () => {
  return useMutation({
    mutationFn: contestApi.postCreateTestcase,
  });
};
