import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/app/styles/mdx.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { fontSans } from '@/lib/fonts';

const _inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" suppressHydrationWarning>
      {/* <NextTopLoader /> */}
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          {/* <div className="container"> */}
          <div className="flex flex-col pb-10">
            <Header />
            <Providers>{children}</Providers>
          </div>
          {/* </div> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
