'use client';

import { usePathname } from 'next/navigation';

interface BodyWrapperProps {
  children: React.ReactNode;
}

export default function BodyWrapper({ children }: BodyWrapperProps) {
  const pathname = usePathname();
  const isCodePage = pathname.includes('/code/');

  return (
    <body
      className={`font-pRegular w-screen h-screen antialiased overflow-x-hidden overscroll-none ${
        isCodePage ? 'overflow-hidden' : ''
      }`}
    >
      {children}
    </body>
  );
}
