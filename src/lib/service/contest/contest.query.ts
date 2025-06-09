import { useQuery } from '@tanstack/react-query';
import API from './contest.api';
import { contestKeys } from './contest.keys';

export const useGetContestList = (params: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: [contestKeys.getContestList],
    queryFn: () => API.getContestList(params),
  });
};
