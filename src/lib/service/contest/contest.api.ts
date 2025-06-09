import { customAxios } from '@/lib/api';

const getContestList = async (params: { page?: number; size?: number }) => {
  const { data } = await customAxios.get(
    `/contest?page=${params.page}&size=${params.size}`
  );
  return data;
};

const getContestById = async (id: number) => {
  const { data } = await customAxios.get(`/contest/${id}`);
  return data;
};

const getContestProblem = async (id: number) => {
  const { data } = await customAxios.get(`/problem/${id}`);
  return data;
};

const contestApi = { getContestList, getContestById, getContestProblem };

export default contestApi;
