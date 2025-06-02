'use client';

import React from 'react';

export const contestDetail = [
  {
    id: 1,
    title: '2024학년도 1학년 알고리즘 대회',
    startTime: '09/17 13:30',
    endTime: '09/17 14:30',
  },
  {
    id: 2,
    title: '2024학년도 2학년 알고리즘 대회',
    startTime: '09/17 13:30',
    endTime: '09/17 14:30',
  },
  {
    id: 3,
    title: '2024학년도 3학년 알고리즘 대회',
    startTime: '09/17 13:30',
    endTime: '09/17 14:30',
  },
];

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center min-h-screen py-[88px]">
      <div className="w-[1089px] flex justify-between items-start px-4">
        <h1 className="text-Nbt1 text-gray-900 pb-7 pl-[15px]">대회목록</h1>
      </div>

      <div className="w-[1089px] flex flex-col gap-[13px] px-4">
        {contestDetail.map((detail) => (
          <div
            key={detail.id}
            className="bg-[url('/assets/contest.svg')] bg-[length:100%_100%] bg-no-repeat w-full h-[128px] cursor-pointer"
            onClick={() => {}}
          >
            <div className="pl-[7.5rem] flex flex-col justify-center h-full">
              <div className="text-Nbt1 text-gray-900">{detail.title}</div>
              <div className="text-Nstext text-gray-600">
                {`${detail.startTime} ~ ${detail.endTime}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
