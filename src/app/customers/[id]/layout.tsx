import React from 'react';
import { Suspense } from 'react';

export default function CustomerDetailsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<CustomerDetailsLoading />}>
        {children}
      </Suspense>
    </div>
  );
}

// This is a simple loading component that will be shown while the main content loads
// The actual detailed loading state is in loading.tsx
function CustomerDetailsLoading() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="h-8 w-40 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-9 w-64 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-40 w-full bg-gray-200 animate-pulse rounded"></div>
    </div>
  );
}