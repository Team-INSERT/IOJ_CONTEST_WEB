/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import API from './contest.api';
import { contestKeys } from './contest.keys';

export const useGetContestList = (params: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: [contestKeys.getContestList, params.page, params.size],
    queryFn: () => API.getContestList(params),
  });
};

export const useGetContestById = (id: number) => {
  return useQuery({
    queryKey: [contestKeys.getContestById, id],
    queryFn: () => API.getContestById(id),
  });
};

export const useGetContestDetail = (id: number) => {
  return useQuery({
    queryKey: [contestKeys.getContestById, id],
    queryFn: () => API.getContestDetailById(id),
  });
};

export const useGetContestProblemById = (id: number) => {
  return useQuery({
    queryKey: [contestKeys.getContestProblem, id],
    queryFn: () => API.getContestProblem(id),
  });
};

export const useGetSubmitTestcase = (
  testcaseId: string,
  p0: { enabled: boolean }
) => {
  return useQuery({
    queryKey: [contestKeys.getCreateTestcase, testcaseId],
    queryFn: () => API.getSubmitTestcase(testcaseId),
    enabled: !!testcaseId,
  });
};

export const useGetSubmitProblemStatus = (
  submissionId: string,
  p0: { enabled: boolean }
) => {
  return useQuery({
    queryKey: [contestKeys.getSubmitProblemStatus, submissionId],
    queryFn: () => API.getSubmitProblemStatus(submissionId),
    enabled: !!submissionId,
  });
};
