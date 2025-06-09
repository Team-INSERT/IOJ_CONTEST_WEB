'use client';

import { useGetContestList } from '@/lib/service/contest/contest.query';
import { FormatUtil } from '@/lib/util';
import Link from 'next/link';
import React from 'react';

interface ContestDetail {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

const Home = () => {
  const { data: contestDetail } = useGetContestList({});

  return (
    <div className="w-full flex flex-col items-center min-h-screen py-[88px]">
      <div className="w-[1089px] flex justify-between items-start px-4">
        <h1 className="text-Nbt1 text-gray-900 pb-7 pl-[15px]">대회목록</h1>
      </div>

      <div className="w-[1089px] flex flex-col gap-[13px] px-4">
        {contestDetail?.map((detail: ContestDetail) => (
          <Link href={`/contest/${detail.id}`} key={detail.id}>
            <div
              className="bg-[url('/assets/contest.svg')] bg-[length:100%_100%] bg-no-repeat w-full h-[128px] cursor-pointer"
              onClick={() => {}}
            >
              <div className="pl-[7.5rem] flex flex-col justify-center h-full">
                <div className="text-gray-900 text-Nbt1">{detail.title}</div>
                <div className="text-gray-600 text-Nstext">
                  {FormatUtil.formatDateRange(detail.startTime, detail.endTime)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
