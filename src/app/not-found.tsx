'use client';

import InsertIcon from '@/assets/InsertIcon';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
  const navigate = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-12">
      <div className="flex items-center justify-center gap-6">
        <InsertIcon />

        <div className="text-bt3 font-pBold text-ut-insertBlue">
          Team Insert
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-bt1 font-pBold text-ut-warningRed">
          404 - Page Not Found
        </h1>

        <div className="text-text font-pRegular">
          쓸데없는 짓 하지 말고 문제 열심히 푸세용!!
        </div>

        <button
          onClick={() => {
            navigate.push('/');
          }}
          className="px-4 py-3 text-white rounded-md text-stext font-pBold bg-ut-insertBlue"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFound;
