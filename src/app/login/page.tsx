import GoogleIcon from '@/assets/GoogleIcon';
import React from 'react';

const Login = () => {
  return (
    <div className="bg-gray-800 h-full w-full flex items-center justify-center cursor-pointer">
      <div className="flex items-center justify-center bg-white border border-gray-200 w-fit h-fit py-[0.69rem] px-[6.56rem] rounded relative shadow-defaultShadow">
        <div className="absolute left-3">
          <GoogleIcon />
        </div>
        <div className="text-stext">구글 로그인</div>
      </div>
    </div>
  );
};

export default Login;
