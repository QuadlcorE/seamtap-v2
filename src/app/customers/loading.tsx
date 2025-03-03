import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CustomersLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Title and Description Skeleton */}
      <div>
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Add New Customer Button Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Table Card Skeleton */}
      <Card>
        <CardContent className="p-6">
          {/* Search and Filter Skeleton */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
          </div>

          {/* Table Header Skeleton */}
          <div className="border rounded-md">
            <div className="h-10 border-b flex items-center px-4 bg-gray-50">
              <div className="flex w-full">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton key={item} className="h-4 flex-1 mx-2" />
                ))}
              </div>
            </div>

            {/* Table Rows Skeleton */}
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="h-16 border-b flex items-center px-4">
                <div className="flex w-full">
                  {[1, 2, 3, 4, 5, 6].map((cell) => (
                    <Skeleton key={cell} className="h-4 flex-1 mx-2" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((item) => (
                <Skeleton key={item} className="h-8 w-8" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}