'use client';

import Loading from '@/components/Loading';
import StarStatus from '@/components/StarStatus';
import { useRemainingTime } from '@/hooks/useRemainingTime';
import { useGetContestById } from '@/lib/service/contest/contest.query';
import { PathUtil } from '@/lib/util';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Contest = () => {
  const navigate = useRouter();
  const pathname = usePathname();
  const contestId = PathUtil(pathname, 1);

  const { data: contestDetail, isLoading } = useGetContestById(contestId);
  const remaining = useRemainingTime(contestDetail?.endTime);

  if (isLoading || !contestDetail) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-start items-center px-[120px] py-[100px] gap-6 w-full h-full">
      <div className="flex flex-shrink-0 flex-col bg-banner bg-no-repeat bg-center bg-cover w-full h-[40vh] px-6 py-5 rounded-lg">
        <div className="flex flex-shrink-0 gap-2 justify-end">
          <button
            className="px-4 py-2 bg-blue-normal text-white rounded-[4px] font-semibold tracking-wide"
            onClick={() => navigate.push(`${pathname}/ranking`)}
          >
            순위 보러가기
          </button>
          <button
            className="px-4 py-2 bg-[#E33434] text-white rounded-[4px] font-semibold tracking-wide"
            onClick={() => navigate.push('/')}
          >
            뒤로가기
          </button>
        </div>
        <div className="flex-1" />
        <div className="flex flex-col flex-shrink-0 gap-2">
          <h2 className="text-4xl text-white font-pSemibold">{remaining}</h2>
          <h3 className="text-2xl text-white">{contestDetail.title}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-start w-full">
        <h2 className="text-3xl font-pSemibold">문제</h2>
        <div className="flex flex-col gap-2 w-full">
          {contestDetail.problems?.map((problem, i) => (
            <div
              key={problem.id}
              className="flex px-2 py-1 w-full shadow-[0px_4px_6px_0px_rgba(111,111,111,0.25)] text-Ntext cursor-pointer justify-between"
              onClick={() => navigate.push(`${pathname}/code/${problem.id}`)}
            >
              <div className="flex flex-shrink-0 items-center">
                <div className="flex w-[10rem] font-nGothic text-white text-[17px]">
                  {problem.verdict === 'ACCEPTED' ? (
                    <div className="px-2 py-1 bg-[#24B984] rounded-[4px] w-fit">
                      성공
                    </div>
                  ) : problem.verdict === 'PARTIAL' ? (
                    <div className="px-2 py-1 bg-[#FF984D] rounded-[4px] w-fit">
                      {problem.score} / 100 점
                    </div>
                  ) : problem.verdict === 'WRONG_ANSWER' ? (
                    <div className="px-2 py-1 bg-[#E33434] rounded-[4px] w-fit">
                      실패
                    </div>
                  ) : (
                    <div className="px-2 py-1 bg-gray-500 rounded-[4px] w-fit">
                      미해결
                    </div>
                  )}
                </div>
                <p className="w-[17px] font-pBold mr-9">
                  {String.fromCharCode(65 + i)}
                </p>
                <p className="w-12 mr-9">
                  {problem.id.toString().padStart(4, '0')}
                </p>
                <p className="text-blue-normal ">{problem.title}</p>
              </div>
              <StarStatus level={problem.level} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contest;
