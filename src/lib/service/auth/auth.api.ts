import { customAxios } from '@/lib/api';

const getLoginLink = async () => {
  const { data } = await customAxios.get('/auth');
  return data;
};

const authApi = { getLoginLink };

export default authApi;
