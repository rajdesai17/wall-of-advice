import { Happy_Monkey } from 'next/font/google';
import './globals.css';

const happyMonkey = Happy_Monkey({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={happyMonkey.className}>
      <body>{children}</body>
    </html>
  );
} 