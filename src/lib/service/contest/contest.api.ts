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

const postSubmitProblem = async (form: {
  contestId: number;
  problemId: number;
  sourcecode: string;
  language: 'C' | 'CPP' | 'JAVA' | 'PYTHON';
}) => {
  const { data } = await customAxios.post(`/submissions`, form);
  return data;
};

const getSubmitProblemStatus = async (submissionId: string) => {
  const { data } = await customAxios.get(`/submissions/${submissionId}/status`);
  return data;
};

const postSubmitTestcase = async (form: {
  id: number;
  sourcecode: string;
  language: 'C' | 'CPP' | 'JAVA' | 'PYTHON';
}) => {
  const { data } = await customAxios.post(`/problem/submit/testcases`, form);
  return data;
};

const contestApi = {
  getContestList,
  getContestById,
  getContestProblem,
  postSubmitProblem,
  getSubmitProblemStatus,
  postSubmitTestcase,
};

export default contestApi;
