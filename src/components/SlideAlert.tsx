'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface SlideAlertProps {
  message: string;
  duration?: number;
  type?: 'success' | 'error';
}

const SlideAlert = ({
  message,
  duration = 2000,
  type = 'success',
}: SlideAlertProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={clsx(
        'fixed top-32 right-0 z-50 rounded-md px-6 py-3 text-white font-bold shadow-lg transition-transform duration-500 ease-in-out',
        bgColor,
        visible ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default SlideAlert;
