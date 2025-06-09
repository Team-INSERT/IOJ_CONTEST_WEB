'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Clock from '@/assets/Clock';
import RemainingTime from './RemainingTime';
import { PathUtil } from '@/lib/util';

interface Problem {
  id: number;
  level: number;
  title: string;
  status: string;
}

interface ContestDetail {
  endTime: string;
  problems: Problem[];
}

const CodeHeader = ({ endTime, problems }: ContestDetail) => {
  const router = useRouter();
  const pathname = usePathname();

  const currentProblemId = Number(PathUtil(pathname, 3));
  const contestId = PathUtil(pathname, 1);
  const currentIndex = problems.findIndex((p) => p.id === currentProblemId);

  const goToProblem = (index: number) => {
    if (index >= 0 && index < problems.length) {
      const problem = problems[index];
      router.push(`/contest/${contestId}/code/${problem.id}`);
    }
  };

  return (
    <div className="absolute top-0 flex items-center justify-between w-full h-12 px-6 text-white bg-zinc-800">
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 text-sm rounded bg-zinc-600 disabled:opacity-40"
          onClick={() => goToProblem(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          이전
        </button>
        <span className="text-sm">
          {currentIndex + 1} / {problems.length}
        </span>
        <button
          className="px-3 py-1 text-sm rounded bg-zinc-600 disabled:opacity-40"
          onClick={() => goToProblem(currentIndex + 1)}
          disabled={currentIndex === problems.length - 1}
        >
          다음
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-1 text-sm border border-white rounded">
        <Clock />
        <span className="text-text">
          <RemainingTime targetDate={endTime} />
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1 text-sm rounded bg-zinc-600">
          제출현황
        </button>
        <div className="w-px h-4 bg-white opacity-40" />
        <button
          onClick={() => router.push(`/contest/${contestId}`)}
          className="px-3 py-1 text-sm bg-red-500 rounded"
        >
          나가기
        </button>
      </div>
    </div>
  );
};

export default CodeHeader;
