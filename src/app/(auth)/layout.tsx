'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { useGetUserInfo } from '@/lib/service/auth/auth.query';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data, isLoading } = useGetUserInfo();

  useEffect(() => {
    if (!isLoading && !data) {
      router.replace('/login');
    }
  }, [data, isLoading, router]);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return <>{children}</>;
}
