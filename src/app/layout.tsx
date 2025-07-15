import ReactQueryProvider from './providers/react-query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import './globals.css';
import BodyWrapper from './BodyWrapper';

export const metadata: Metadata = {
  title: 'Insert Online Judge',
  icons: {
    icon: '/assets/insertLogo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <BodyWrapper>
        <ReactQueryProvider>
          {children} <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </BodyWrapper>
    </html>
  );
}
