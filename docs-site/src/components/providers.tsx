'use client';
import { Provider as JotaiProvider } from 'jotai';

export const Providers: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <JotaiProvider>{children}</JotaiProvider>
    </>
  );
};
