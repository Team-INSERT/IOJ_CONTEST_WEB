'use client';

import GoogleIcon from '@/assets/GoogleIcon';
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
    <div className="flex items-center justify-center w-full h-full bg-gray-800 cursor-pointer">
      <div
        className="flex items-center justify-center bg-white border border-gray-200 w-fit h-fit py-[0.69rem] px-[6.56rem] rounded relative shadow-defaultShadow"
        onClick={() => {
          window.location.href = data;
        }}
      >
        <div className="absolute left-3">
          <GoogleIcon />
        </div>
        <div className="text-stext">구글 로그인</div>
      </div>
    </div>
  );
};

export default Login;
