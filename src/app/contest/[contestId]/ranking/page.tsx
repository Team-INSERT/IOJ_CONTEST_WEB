'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import GradingModal from '@/components/Contest/GradingModal';

export const contestRanking = [
  {
    nickname: '최최성성훈훈',
    problemStatuses: [
      { status: 'unsolved', penalty: null },
      { status: 'solved', penalty: 660 },
      { status: 'solved', penalty: 670 },
    ],
  },
  {
    nickname: '안안예예성성',
    problemStatuses: [
      { status: 'solved', penalty: 600 },
      { status: 'failed', penalty: 610 },
      { status: 'unsolved', penalty: null },
    ],
  },
  {
    nickname: '김김시시연연',
    problemStatuses: [
      { status: 'failed', penalty: 720 },
      { status: 'solved', penalty: 750 },
      { status: 'failed', penalty: 735 },
    ],
  },
];

const getColumnHeaders = (count: number) =>
  Array.from({ length: count }, (_, i) =>
    String.fromCharCode('A'.charCodeAt(0) + i)
  );

const Ranking = () => {
  const navigate = useRouter();
  const maxProblems = Math.max(
    ...contestRanking.map((u) => u.problemStatuses.length)
  );
  const columns = getColumnHeaders(maxProblems);

  const [gradingModal, setGradingModal] = React.useState(false);

  return (
    <>
      {gradingModal && <GradingModal onClose={() => setGradingModal(false)} />}
      <div className="px-40 py-20 space-y-6 font-pretendard">
        <div className="flex items-center justify-between px-6 py-4 bg-gray-100 rounded-xl">
          <h1 className="text-xl font-bold">
            2024학년도 1학년 알고리즘 경진대회
          </h1>
          <div className="flex gap-2">
            <button
              className="h-8 px-4 text-white bg-gray-700 rounded text-stext"
              onClick={() => setGradingModal(true)}
            >
              채점기준
            </button>
            <button
              className="h-8 px-4 text-white rounded text-stext bg-ut-warningRed"
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
                <th className="w-[3rem] text-Nbt">순위</th>
                <th className="w-[12rem] text-Nbt">이름</th>
                {columns.map((col) => (
                  <th key={col} className="font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contestRanking.map((user, idx) => (
                <tr key={idx} className="h-10 text-sm">
                  <td className="font-bold text-blue-normal text-Ntext">
                    {idx + 1}
                  </td>
                  <td className="text-lg text-Nbt">{user.nickname}</td>
                  {user.problemStatuses.map((p, i) => (
                    <td key={i}>
                      {p.status === 'solved' ? (
                        <div className="flex items-center justify-center w-[3.75rem] h-8 mx-auto text-white text-Ntext bg-green-500 rounded">
                          {Math.floor(p.penalty! / 60)}
                        </div>
                      ) : p.status === 'failed' ? (
                        <div className="w-[3.75rem] h-8 mx-auto text-Ntext bg-red-400 rounded" />
                      ) : (
                        <div className="w-[3.75rem] h-8 mx-auto text-Ntext" />
                      )}
                    </td>
                  ))}
                  {Array.from({
                    length: maxProblems - user.problemStatuses.length,
                  }).map((_, i) => (
                    <td key={`empty-${i}`}>
                      <div className="w-[3.75rem] h-8 mx-auto" />
                    </td>
                  ))}
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
