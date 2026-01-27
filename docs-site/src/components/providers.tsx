'use client';
import { Provider as JotaiProvider } from 'jotai';

export const Providers: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <>
    <JotaiProvider>{children}</JotaiProvider>
  </>
);
