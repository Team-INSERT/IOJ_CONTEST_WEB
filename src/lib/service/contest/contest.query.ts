import { useQuery } from '@tanstack/react-query';
import API from './contest.api';
import { contestKeys } from './contest.keys';
import { ContestResponse } from '@/lib/types/contest.types';

export const useGetContestList = (params: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: [contestKeys.getContestList, params.page, params.size],
    queryFn: () => API.getContestList(params),
  });
};

export const useGetContestById = (id: number) => {
  return useQuery<ContestResponse>({
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
    refetchOnMount: false,
  });
};

export const useGetSubmitTestcase = (testcaseId: string) => {
  return useQuery({
    queryKey: [contestKeys.getCreateTestcase, testcaseId],
    queryFn: () => API.getSubmitTestcase(testcaseId),
    enabled: !!testcaseId,
  });
};

export const useGetSubmitProblemStatus = (submissionId: string) => {
  return useQuery({
    queryKey: [contestKeys.getSubmitProblemStatus, submissionId],
    queryFn: () => API.getSubmitProblemStatus(submissionId),
    enabled: !!submissionId,
  });
};

export const useGetRankingById = (contestId: number) => {
  return useQuery({
    queryKey: [contestKeys.getRankingById, contestId],
    queryFn: () => API.getRankingById(contestId),
  });
};
