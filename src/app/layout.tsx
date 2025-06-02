import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IOJ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen w-screen">{children}</body>
    </html>
  );
}
