import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QuizProvider } from './context/QuizContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Adaptive Quiz App',
  description: 'Quiz application with adaptive difficulty',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QuizProvider>
          {children}
        </QuizProvider>
      </body>
    </html>
  );
}