import { useQuery } from '@tanstack/react-query';
import authApi from './auth.api';
import { authKeys } from './auth.keys';

export const useGetLoginLink = () => {
  return useQuery({
    queryKey: [authKeys.loginLink],
    queryFn: authApi.getLoginLink,
  });
};
