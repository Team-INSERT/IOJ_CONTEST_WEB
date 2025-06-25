import { useMutation } from '@tanstack/react-query';
import contestApi from './auth.api';

export const usePostCode = () => {
  return useMutation({
    mutationFn: contestApi.postCode,
  });
};
