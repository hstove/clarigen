import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/app/styles/mdx.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { fontMono, fontSans } from '@/lib/fonts';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Clarigen Documentation',
  description:
    'Documentation for using Clarigen - a tool for generating types from your Clarity contracts',
  // icons: ['/clarigen-logo.png'],
  icons: {
    icon: '/clarigen-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextTopLoader />
      <body className={cn('bg-background min-h-screen font-sans antialiased', fontSans.className)}>
        <ThemeProvider defaultTheme="dark" attribute="class" enableSystem disableTransitionOnChange>
          {/* <div className="container"> */}
          <div className="flex flex-col">
            <Header />
            <Providers>
              <>{children}</>
            </Providers>
          </div>
          {/* </div> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
