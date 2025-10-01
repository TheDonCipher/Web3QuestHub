import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WagmiProvider } from '@/components/providers/WagmiProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Web3 Quest Hub - Learn Web3 Through Adventure',
  description: 'A gamified educational platform for Web3 beginners',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <WagmiProvider>
          {children}
        </WagmiProvider>
      </body>
    </html>
  );
}
