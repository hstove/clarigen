'use client';
import React from 'react';
import { Text } from '@/components/text';

export const Header: React.FC<{ children?: React.ReactNode }> = () => {
  return (
    <div className="flex w-full mt-7 justify-between items-center">
      <div>
        <Text variant="h1">App Name</Text>
      </div>
      <div className="flex gap-4 items-center ">{/* right side stuff */}</div>
    </div>
  );
};
