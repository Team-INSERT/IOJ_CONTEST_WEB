'use client';

import React, { useEffect, useState } from 'react';

interface OwnProps {
  targetDate: string;
}

const formatTime = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(2, '0')}분 ${String(
    seconds
  ).padStart(2, '0')}초`;
};

const RemainingTime = ({ targetDate }: OwnProps) => {
  const target = React.useMemo(() => new Date(targetDate), [targetDate]);

  const [remaining, setRemaining] = useState(() =>
    formatTime(target.getTime() - Date.now())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setRemaining('00시간 00분 00초');
        clearInterval(interval);
      } else {
        setRemaining(formatTime(diff));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return <div className="text-text font-pRegular">{remaining}</div>;
};

export default RemainingTime;
