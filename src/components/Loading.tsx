import React from 'react';

interface LoadingProps {
  text?: string | null;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="text-bt3">{text === null ? 'Loading...' : text}</div>
    </div>
  );
};

export default Loading;
