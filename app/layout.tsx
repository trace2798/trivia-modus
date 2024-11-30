import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';

const quicksand = localFont({
  src: '../public/assets/fonts/Quicksand-Variable.woff2',
  display: 'swap',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rec & Triv',
  description:
    'Rec & Triv is my submission for Modus Hackathon 2024 hosted on Hashnode.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <head>
        <link
          rel="preload"
          href="/assets/fonts/Quicksand-Variable.woff2"
          as="font"
          type="font/woff2"
        />
      </head>
      {/* light, regular, medium, semibold, bold */}
      <html lang="en">
        <body className={quicksand.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {children} <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
