import { Happy_Monkey } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Metadata } from 'next';

const happyMonkey = Happy_Monkey({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wall of Advice - Share Your Thoughts',
  description: 'A collaborative wall where people can share advice and thoughts with each other.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={happyMonkey.className}>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
} 