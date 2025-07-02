'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Clock from '@/assets/Clock';
import RemainingTime from './RemainingTime';
import { PathUtil } from '@/lib/util';

interface ProblemIds {
  id: number;
}

interface ContestDetail {
  endTime: string;
  problems: ProblemIds[];
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
    <div className="absolute top-0 flex items-center justify-between w-full px-6 text-white h-16 bg-[#333333] select-none">
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 text-Nstext font-nGothic rounded bg-zinc-600 disabled:opacity-40"
          onClick={() => goToProblem(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          이전
        </button>
        <span className="text-Nstext font-nGothic">
          {currentIndex + 1} / {problems.length}
        </span>
        <button
          className="px-3 py-1 text-Nstext font-nGothic rounded bg-zinc-600 disabled:opacity-40"
          onClick={() => goToProblem(currentIndex + 1)}
          disabled={currentIndex === problems.length - 1}
        >
          다음
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-2 border border-white rounded">
        <Clock />
        <RemainingTime targetDate={endTime} />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push(`/contest/${contestId}`)}
          className="px-3 py-1 text-Nstext font-nGothic bg-red-500 rounded"
        >
          나가기
        </button>
      </div>
    </div>
  );
};

export default CodeHeader;
