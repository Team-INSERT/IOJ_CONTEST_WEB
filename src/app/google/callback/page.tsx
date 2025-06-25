'use client';

import Loading from '@/components/Loading';
import { usePostCode } from '@/lib/service/auth/auth.mutation';
import { Storage } from '@/lib/util';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';

const Callback = () => {
  const [code, setCode] = useState<string | null>(null);
  const { data, mutate } = usePostCode();
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    if (accessToken) {
      setCode(accessToken);
    }
  }, []);

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [code, mutate]);

  useEffect(() => {
    if (data) {
      Storage.setItem('accessToken', data.accessToken);
      Storage.setItem('refreshToken', data.refreshToken);
      router.push('/');
    }
  }, [data, router]);

  return (
    <Suspense>
      <main>
        <Loading />
      </main>
    </Suspense>
  );
};

export default Callback;
