import { customAxios } from '@/lib/api';

const getLoginLink = async () => {
  const { data } = await customAxios.get('/auth');
  return data;
};

const postCode = async (code: string) => {
  const { data } = await customAxios.post('/auth', { accessToken: code });
  return data;
};

const API = { getLoginLink, postCode };

export default API;
