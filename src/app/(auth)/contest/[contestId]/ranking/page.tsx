'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import GradingModal from '@/components/GradingModal';
import { useGetRankingById } from '@/lib/service/contest/contest.query';
import {
  UserSubmission,
  SubmissionProblem,
  ProblemOrder,
  RankingUser,
} from '@/lib/types/contestSubmitType';
import Loading from '@/components/Loading';

const getColumnHeaders = (count: number): string[] =>
  Array.from({ length: count }, (_: undefined, i: number) =>
    String.fromCharCode('A'.charCodeAt(0) + i)
  );

const Ranking = () => {
  const navigate = useRouter();
  const params = useParams();
  const contestId = Number(params.contestId);
  const [gradingModal, setGradingModal] = useState(false);

  const { data: rankingData, isLoading } = useGetRankingById(contestId);

  if (isLoading) return <Loading />;

  if (!rankingData) return <div>데이터를 불러올 수 없습니다.</div>;

  const columns = getColumnHeaders(rankingData.problemOrders.length);

  const getUserSubmissions = (userId: number): SubmissionProblem[] => {
    const userSubmission = rankingData.submissions.find(
      (sub: UserSubmission) => sub.userId === userId
    );
    return userSubmission?.problems || [];
  };

  const getProblemStatus = (
    userId: number,
    problemId: number
  ): 'accepted' | 'partial' | 'failed' | 'unsolved' => {
    const submissions = getUserSubmissions(userId);
    const problemSubmission = submissions.find(
      (sub: SubmissionProblem) => sub.problemId === problemId
    );

    if (!problemSubmission) return 'unsolved';
    if (problemSubmission.verdict === 'ACCEPTED') return 'accepted';
    if (problemSubmission.verdict === 'PARTIAL' && problemSubmission.score > 0)
      return 'partial';
    return 'failed';
  };

  const getProblemScore = (userId: number, problemId: number): number => {
    const submissions = getUserSubmissions(userId);
    const problemSubmission = submissions.find(
      (sub: SubmissionProblem) => sub.problemId === problemId
    );
    return problemSubmission?.score || 0;
  };

  return (
    <>
      {gradingModal && <GradingModal onClose={() => setGradingModal(false)} />}
      <div className="px-40 py-20 space-y-6 font-pretendard">
        <div className="flex items-center justify-between px-6 py-4 bg-gray-100 rounded-xl">
          <h1 className="text-xl font-bold">랭킹</h1>
          <div className="flex gap-2">
            <button
              className="h-8 px-4 text-white bg-gray-700 rounded text-stext font-pBold"
              onClick={() => setGradingModal(true)}
            >
              채점기준
            </button>
            <button
              className="h-8 px-4 text-white rounded text-stext font-pBold bg-ut-warningRed"
              onClick={() => navigate.back()}
            >
              나가기
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-separate table-fixed border-spacing-y-5">
            <thead>
              <tr className="border-b-[2px] border-blue-500 text-gray-800">
                <th className="w-[3rem] text-Nbt font-nGothic">순위</th>
                <th className="w-[12rem] text-Nbt font-nGothic">이름</th>
                <th className="w-[6rem] text-Nbt font-nGothic">점수</th>
                <th className="w-[6rem] text-Nbt font-nGothic">패널티</th>
                {columns.map((col: string) => (
                  <th key={col} className="w-[4rem] font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rankingData.rankings.map((user: RankingUser, idx: number) => (
                <tr key={user.userId} className="h-10 text-sm">
                  <td className="font-bold text-blue-normal text-Ntext font-nGothic">
                    {idx + 1}
                  </td>
                  <td className="text-lg text-Nbt font-nGothic">
                    {user.userName}
                  </td>
                  <td className="text-Ntext font-nGothic">{user.totalScore}</td>
                  <td className="text-Ntext font-nGothic">{user.penalty}</td>
                  {rankingData.problemOrders.map((problem: ProblemOrder) => {
                    const status = getProblemStatus(
                      user.userId,
                      problem.problemId
                    );
                    const score = getProblemScore(
                      user.userId,
                      problem.problemId
                    );

                    return (
                      <td key={problem.problemId} className="w-[4rem] px-1">
                        <div className="flex justify-center">
                          {status === 'accepted' ? (
                            <div className="flex items-center justify-center w-full h-8 text-white text-Ntext font-nGothic bg-green-500 rounded">
                              100
                            </div>
                          ) : status === 'partial' ? (
                            <div className="flex items-center justify-center w-full h-8 text-white text-Ntext font-nGothic bg-orange-500 rounded">
                              {score}
                            </div>
                          ) : status === 'failed' ? (
                            <div className="w-full h-8 text-Ntext font-nGothic bg-red-400 rounded" />
                          ) : (
                            <div className="w-full h-8 text-Ntext font-nGothic" />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Ranking;
