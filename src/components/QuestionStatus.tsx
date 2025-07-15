import React from 'react';

import { QuestionStatus as QuestionStatusType } from '@/lib/types/contest.types';

interface OwnProps {
  status: QuestionStatusType;
}

const QuestionStatus = ({ status }: OwnProps) => {
  return (
    <div
      className={`flex items-center justify-center w-8 rounded h-9 font-pRegular
        ${
          status === null
            ? ''
            : status === 'ACCEPTED'
              ? 'bg-[#24B984]'
              : status === 'PARTIAL'
                ? 'bg-orange-500'
                : 'bg-[#E54747]'
        }`}
    >
      <div className="text-white text-Ntext ">
        {status === null
          ? ''
          : status === 'ACCEPTED'
            ? 'S'
            : status === 'PARTIAL'
              ? 'P'
              : 'W'}
      </div>
    </div>
  );
};

export default QuestionStatus;
