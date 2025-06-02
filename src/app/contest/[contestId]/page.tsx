/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import QuestionStatus from '@/components/Contest/QuestionStatus';
import RemainingTime from '@/components/Contest/RemainingTime';
import StarStatus from '@/components/Contest/StarStatus';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export const contestDetail = {
  title: 'QA용 대회',
  endTime: '2025-06-03T08:20:00',
  problems: [
    {
      id: 1,
      level: 1,
      title: 'A-B',
      status: 'solved',
    },
    {
      id: 2,
      level: 2,
      title: '알파벳 대소문자 변환',
      status: 'unsolved',
    },
    {
      id: 3,
      level: 3,
      title: '세로읽기',
      status: 'failed',
    },
    {
      id: 4,
      level: 4,
      title: '2차원 배열 순서대로 채우기',
      status: 'unsolved',
    },
    {
      id: 5,
      level: 5,
      title: '카드',
      status: 'unsolved',
    },
  ],
};

const Contest = () => {
  const navigate = useRouter();
  const pathname = usePathname();

  return (
    <div className="px-[120px] pt-[40px] pb-[194px] w-full">
      <div className="relative flex items-center justify-center w-full pb-5">
        <h1 className="text-bt1">{contestDetail.title}</h1>
        <div className="absolute right-0 pt-5">
          <button
            className="px-4 py-2 text-white rounded bg-ut-warningRed text-stext"
            onClick={() => {
              navigate.back();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <div className="relative bg-white rounded-lg flex flex-col items-center py-[56px] mb-14 border border-transparent before:content-[''] before:absolute before:inset-[-3px] before:rounded-lg before:bg-gradient-to-br before:from-[#007CFF] before:to-[#FF48AB] before:-z-10">
        <div className="pb-[28px]">
          <RemainingTime targetDate={contestDetail.endTime} />
        </div>
        <div className="w-[60%] border-t border-gray-300" />
        <div className="pt-[31px]">
          <button
            className="px-4 py-2 bg-[#007CFF] rounded text-stext text-white"
            onClick={() => {
              navigate.push(`${pathname}/ranking`);
            }}
          >
            순위보러가기
          </button>
        </div>
      </div>

      <div className="text-[24px] font-semibold pb-5">문제</div>
      <div className="flex flex-col gap-2">
        {contestDetail.problems.map((problem: any) => {
          const formattedLetter = String.fromCharCode(65 + (problem.id - 1));

          return (
            <div
              key={problem.id}
              className="flex items-center justify-between px-2 py-1 bg-white rounded shadow-md cursor-pointer h-11"
              onClick={() => {
                navigate.push(`${pathname}/code/${problem.id}`);
              }}
            >
              <div className="flex items-center gap-[2.19rem]">
                <QuestionStatus status={problem.status} />

                <div className="text-left text-text">{formattedLetter}</div>
                <div className="text-left text-text">
                  {problem.id.toString().padStart(4, '0')}
                </div>
                <div className="text-left text-text text-blue-normal">
                  {problem.title}
                </div>
              </div>

              <div className="">
                <StarStatus level={problem.level} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contest;
