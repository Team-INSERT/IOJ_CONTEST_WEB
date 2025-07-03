'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface OwnProps {
  targetDate: string;
  type?: 'contest' | 'problem';
}

const formatTime = (ms: number) => {
  if (isNaN(ms)) return '시간 불러오는 중...';
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(2, '0')}분 ${String(
    seconds
  ).padStart(2, '0')}초`;
};

const RemainingTime = ({ targetDate, type }: OwnProps) => {
  const target = useMemo(() => {
    if (!targetDate) return null;
    const d = new Date(targetDate);
    return isNaN(d.getTime()) ? null : d;
  }, [targetDate]);

  const [remaining, setRemaining] = useState<string>('시간 불러오는 중...');

  useEffect(() => {
    if (!target) {
      setRemaining('시간 불러오는 중...');
      return;
    }

    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setRemaining('00시간 00분 00초');
        return true;
      } else {
        setRemaining(formatTime(diff));
        return false;
      }
    };

    update();

    const interval = setInterval(() => {
      if (update()) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div
      className={
        type === 'contest' ? 'text-bt3 font-pBold' : 'text-text font-pRegular'
      }
    >
      {remaining}
    </div>
  );
};

export default RemainingTime;
