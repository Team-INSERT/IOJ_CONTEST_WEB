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

const getContestDetailById = async (id: number) => {
  const { data } = await customAxios.get(`/contest/${id}/detail`);
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

const getSubmitTestcase = async (testcaseId: string) => {
  const { data } = await customAxios.get(
    `/submissions/${testcaseId}/status/testcase`
  );
  return data;
};

const postCreateTestcase = async (form: {
  problemId: number;
  sourcecode: string;
  language: 'C' | 'CPP' | 'JAVA' | 'PYTHON';
  testcaseResultDto: {
    input: string;
    expectedOutput: string;
  }[];
}) => {
  const { data } = await customAxios.post(`/submissions/testcases`, form);
  return data;
};

const getRankingById = async (contestId: number) => {
  const { data } = await customAxios.get(`/ranking/${contestId}`);
  return data;
};

const getSubmissionError = async (submissionId: string) => {
  const { data } = await customAxios.get(`/errors/${submissionId}`);
  return data;
};

const contestApi = {
  getContestList,
  getContestById,
  getContestProblem,
  getContestDetailById,
  postSubmitProblem,
  getSubmitProblemStatus,
  getSubmitTestcase,
  postCreateTestcase,
  getRankingById,
  getSubmissionError,
};

export default contestApi;
