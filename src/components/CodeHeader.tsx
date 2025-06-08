'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Clock from '@/assets/Clock';

const CodeHeader = () => {
  const router = useRouter();

  return (
    <div className="absolute top-0 flex items-center justify-between w-full h-12 px-6 text-white bg-zinc-800">
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 text-sm rounded bg-zinc-600">이전</button>
        <span className="text-sm">6 / 6</span>
        <button className="px-3 py-1 text-sm rounded bg-zinc-600">다음</button>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-1 text-sm border border-white rounded">
        <Clock />
        <span>00 : 00 : 00</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1 text-sm rounded bg-zinc-600">
          제출현황
        </button>
        <div className="w-px h-4 bg-white opacity-40" />
        <button
          onClick={() => router.back()}
          className="px-3 py-1 text-sm bg-red-500 rounded"
        >
          나가기
        </button>
      </div>
    </div>
  );
};

export default CodeHeader;
