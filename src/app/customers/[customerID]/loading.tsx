import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CustomerDetailsLoading() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back Button Skeleton */}
      <div className="flex items-center mb-4">
        <Skeleton className="h-9 w-32" />
      </div>

      {/* Page Title Skeleton */}
      <div>
        <Skeleton className="h-9 w-64" />
      </div>

      {/* Customer Info Card Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item}>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-36" />
        </CardFooter>
      </Card>

      {/* Measurements Card Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-36" />
        </CardHeader>
        <CardContent>
          {/* Table Header Skeleton */}
          <div className="border rounded-md">
            <div className="h-10 border-b flex items-center px-4 bg-gray-50">
              <div className="flex w-full">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Skeleton key={item} className="h-4 flex-1 mx-2" />
                ))}
              </div>
            </div>

            {/* Table Rows Skeleton */}
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="h-16 border-b flex items-center px-4">
                <div className="flex w-full">
                  {[1, 2, 3, 4, 5].map((cell) => (
                    <Skeleton key={cell} className="h-4 flex-1 mx-2" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}