import { customAxios } from '@/lib/api';

const getLoginLink = async () => {
  const { data } = await customAxios.get('/auth');
  return data;
};

const API = { getLoginLink };

export default API;
