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
import CorrectIcon from '@/assets/CorrectIcon';
import WrongIcon from '@/assets/WrongIcon';

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
      <div className="flex flex-col px-40 py-16 gap-12 font-pRegular">
        <div className="flex items-center justify-between px-6 py-7 text-white bg-[linear-gradient(90deg,#004A99_0%,#FFF_100%)] rounded-[4px]">
          <h1 className="text-2xl font-pBold">2025학년도 알고리즘 경진대회</h1>
          <div className="flex gap-2">
            <button
              className="py-1 px-4 text-white bg-gray-700 rounded-[4px] font-bold"
              onClick={() => setGradingModal(true)}
            >
              채점기준
            </button>
            <button
              className="py-1 px-4 text-white rounded-[4px] font-bold bg-ut-warningRed"
              onClick={() => navigate.back()}
            >
              나가기
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 font-nGothic text-xl">
          <div className="flex gap-10">
            <div className="flex gap-5 basis-1/5">
              <p className="w-1/4">순위</p>
              <p className="w-3/4">이름</p>
            </div>
            <div className="flex justify-between basis-3/5">
              {columns.map((col, i) => (
                <p className="flex-1 text-center" key={i}>
                  {col}
                </p>
              ))}
            </div>
            <p>총점</p>
            <p>패널티</p>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-[#F2F2F2] to-[#007CFF] rounded-sm" />
          <div>
            {rankingData.rankings.map((user: RankingUser, idx: number) => (
              <div key={user.userId} className="flex items-center gap-10 h-14">
                <div className="flex gap-5 basis-1/5">
                  <p className="w-1/4">{idx + 1}</p>
                  <p className="w-3/4">{user.userName}</p>
                </div>
                <div className="flex justify-between basis-3/5 gap-2 h-full">
                  {rankingData.problemOrders.map((problem: ProblemOrder) => {
                    const status = getProblemStatus(
                      user.userId,
                      problem.problemId
                    );
                    const score = getProblemScore(
                      user.userId,
                      problem.problemId
                    );

                    switch (status) {
                      case 'accepted':
                        return (
                          <div
                            key={problem.problemId}
                            className="flex-1 bg-[#24B984] transform -skew-x-[7.5deg] flex items-center justify-center my-1"
                          >
                            <CorrectIcon className="skew-x-[7.5deg]" />
                          </div>
                        );
                      case 'partial':
                        return (
                          <div
                            key={problem.problemId}
                            className="flex-1 bg-[#FF984D] transform -skew-x-[7.5deg] flex items-center justify-center my-1"
                          >
                            <p className="skew-x-[7.5deg] text-white">
                              {score} / 100
                            </p>
                          </div>
                        );
                      case 'failed':
                        return (
                          <div
                            key={problem.problemId}
                            className="flex-1 bg-[#F85353] transform -skew-x-[7.5deg] flex items-center justify-center my-1"
                          >
                            <WrongIcon className="skew-x-[7.5deg]" />
                          </div>
                        );
                      default:
                        return (
                          <div key={problem.problemId} className="flex-1" />
                        );
                    }
                  })}
                </div>
                <p>{user.totalScore}</p>
                <p>
                  -
                  {(
                    (new Date(user.achievedAt).getTime() -
                      new Date(rankingData.startTime).getTime()) /
                    (60 * 1000)
                  ).toFixed(0)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ranking;
