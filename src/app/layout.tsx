import ReactQueryProvider from './providers/react-query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import './globals.css';

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
      <body className="w-screen h-screen antialiased overscroll-none">
        <ReactQueryProvider>
          {children} <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
