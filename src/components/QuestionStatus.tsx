import React from 'react';

interface OwnProps {
  status: 'unsolved' | 'solved' | 'failed';
}

const QuestionStatus = ({ status }: OwnProps) => {
  return (
    <div
      className={`flex items-center justify-center w-8 rounded h-9 
        ${
          status === 'unsolved'
            ? ''
            : status === 'solved'
              ? 'bg-[#24B984]'
              : 'bg-[#E54747]'
        }`}
    >
      <div className="text-white text-Ntext font-nGothic">
        {status === 'unsolved' ? '' : status === 'solved' ? 'S' : 'W'}
      </div>
    </div>
  );
};

export default QuestionStatus;
