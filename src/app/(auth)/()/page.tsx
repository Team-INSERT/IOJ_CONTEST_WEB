'use client';

import Loading from '@/components/Loading';
import { customAxios } from '@/lib/api';
import { useGetContestList } from '@/lib/service/contest/contest.query';
import { AlertUtil, FormatUtil } from '@/lib/util';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ContestDetail {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

const Home = () => {
  const [getRoleLoading, setGetRoleLoading] = React.useState(false);
  const { data: contestDetail, isLoading } = useGetContestList({});
  const router = useRouter();

  if (isLoading || getRoleLoading) {
    return <Loading />;
  }

  const handleClick = async (id: number) => {
    try {
      setGetRoleLoading(true);
      await customAxios.get(`/contest/${id}`).then(() => {
        setGetRoleLoading(false);
      });
      router.push(`/contest/${id}`);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (
        axiosError.response?.status === 404 ||
        axiosError.response?.status === 403
      ) {
        AlertUtil.error('접근권한이 없는 대회입니다.');
      } else if (axiosError.response?.status === 400) {
        AlertUtil.error('아직 대회가 시작되지 않았습니다.');
      } else {
        AlertUtil.error('대회 정보를 불러오는 데 실패했습니다.');
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen py-[88px]">
      <div className="w-[1089px] flex justify-between items-start px-4">
        <h1 className="text-Nt font-nGothic text-gray-900 pb-7 pl-[15px]">
          대회목록
        </h1>
      </div>
      <div className="w-[1089px] flex flex-col gap-[13px] px-4">
        {contestDetail?.map((detail: ContestDetail) => (
          <div
            className="bg-[url('/assets/contest.svg')] bg-[length:100%_100%] bg-no-repeat w-full h-[128px] cursor-pointer"
            onClick={() => handleClick(detail.id)}
            key={detail.id}
          >
            <div className="pl-[7.5rem] flex flex-col justify-center h-full gap-1">
              <div className="text-gray-900 text-Nbt1 font-nGothic">
                {detail.title}
              </div>
              <div className="text-gray-600 text-Nstext font-nGothic">
                {FormatUtil.formatDateRange(detail.startTime, detail.endTime)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
