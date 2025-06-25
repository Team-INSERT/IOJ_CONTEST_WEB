import { useQuery } from '@tanstack/react-query';
import { authKeys } from './auth.keys';
import API from './auth.api';

export const useGetLoginLink = () => {
  return useQuery({
    queryKey: [authKeys.useGetLoginLink],
    queryFn: API.getLoginLink,
  });
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [authKeys.useGetUserInfo],
    queryFn: API.getUserInfo,
  });
};
