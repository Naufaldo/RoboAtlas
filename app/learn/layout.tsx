import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <Sidebar />
        <div className="flex-1 w-full min-w-0">{children}</div>
      </div>
    </div>
  );
}
