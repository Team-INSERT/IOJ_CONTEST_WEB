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
