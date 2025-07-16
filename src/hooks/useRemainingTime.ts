import { useEffect, useMemo, useState, useRef } from 'react';

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${String(h).padStart(2, '0')}시간 ${String(m).padStart(2, '0')}분 ${String(s).padStart(2, '0')}초`;
}

export function useRemainingTime(targetDate?: string | number | Date | null) {
  const target = useMemo<Date | null>(() => {
    if (!targetDate) return null;

    let d: Date;
    if (typeof targetDate === 'number') {
      d = new Date(targetDate);
    } else if (typeof targetDate === 'string') {
      d = new Date(targetDate);
    } else {
      d = targetDate;
    }

    return isNaN(d.getTime()) ? null : d;
  }, [targetDate]);

  const [remaining, setRemaining] = useState<string>('시간 불러오는 중...');
  const timerRef = useRef<number>(0);

  useEffect(() => {
    if (!target) {
      setRemaining('시간 불러오는 중...');
      return;
    }

    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setRemaining('00시간 00분 00초');
        return;
      }
      const text = formatTime(diff);
      setRemaining((prev) => (prev === text ? prev : text));
      const delay = diff % 1000 || 1000;
      timerRef.current = window.setTimeout(tick, delay);
    };

    tick();
    return () => clearTimeout(timerRef.current);
  }, [target]);

  return remaining;
}
