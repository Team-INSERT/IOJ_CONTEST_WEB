import { customAxios } from '@/lib/api';

const getContestList = async (params: { page?: number; size?: number }) => {
  const { data } = await customAxios.get(
    `/contest?page=${params.page}&size=${params.size}`
  );
  return data;
};

const contestApi = { getContestList };

export default contestApi;
