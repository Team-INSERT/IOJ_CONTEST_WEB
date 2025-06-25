'use client';

import GoogleIcon from '@/assets/GoogleIcon';
import Logo from '@/assets/Logo';
import { useGetLoginLink } from '@/lib/service/auth/auth.query';
import React from 'react';

const Login = () => {
  const { data, error } = useGetLoginLink();

  if (error) {
    console.error('Error fetching login link:', error);
    return (
      <div className="text-red-500">
        로그인 링크를 가져오는 데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full gap-[8.25rem]">
      <header className="flex flex-col items-center pt-56 gap-11">
        <Logo />
        <p className="text-[1.1875rem] text-gray-800 font-regular">
          아이템을 이용한 스릴 넘치는 코딩 경기, IOJ에 오신 걸 환영합니다!
        </p>
      </header>
      <div
        className="flex items-center justify-center bg-white border border-gray-200 h-fit py-[11px] px-[124.5px] cursor-pointer rounded-lg gap-[0.6875rem]"
        onClick={() => {
          window.location.href = data;
        }}
      >
        <GoogleIcon />
        <div className="text-[16px] text-[#353535] font-regular">
          구글 로그인
        </div>
      </div>
    </div>
  );
};

export default Login;
