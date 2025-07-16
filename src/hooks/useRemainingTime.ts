import { useEffect, useMemo, useState, useRef } from 'react';

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `종료까지 ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatEndedDate(d: Date) {
  const M = String(d.getMonth() + 1).padStart(2, '0');
  const D = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${M}/${D} ${h}:${m}에 종료됨`;
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
        setRemaining(formatEndedDate(target));
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
