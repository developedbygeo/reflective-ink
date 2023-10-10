import './globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Open_Sans, Source_Sans_3 } from 'next/font/google';

import { ThemeProvider } from '@/components/theme/ThemeProvider';

const open = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open',
});

const source = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source',
});

export const metadata: Metadata = {
  title: 'Reflective Ink',
  description:
    'Reflective Ink is the best way to get your ideas out there and receive feedback on them, in real time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${open.variable} ${source.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
