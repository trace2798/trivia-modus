import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const quicksand = localFont({
  src: '../public/assets/fonts/Quicksand-Variable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rec & Triv',
  description:
    'Rec & Triv is my submission for Modus Hackathon 2024 hosted on Hashnode.',
  openGraph: {
    title: 'Rec & Triv',
    description:
      'Rec & Triv is my submission for Modus Hackathon 2024 hosted on Hashnode.',
    url: `https://recntriv.vercel.app/`,
    siteName: 'recntriv.vercel.app',
    images: [
      {
        url: `https://recntriv.vercel.app/og.png`,
        width: 1200,
        height: 675,
      },
    ],
  },
  twitter: {
    title: 'Rec & Triv',
    card: 'summary_large_image',
  },
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
