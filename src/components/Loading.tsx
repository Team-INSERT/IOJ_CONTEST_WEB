import React from 'react';
import { DotLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <DotLoader color="#007CFF" />
    </div>
  );
};

export default Loading;
