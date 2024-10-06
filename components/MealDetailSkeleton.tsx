import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const MealDetailSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto p-4 bg-cover bg-center text-sm xl:text-base">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            <Skeleton className="w-full h-full" />
            <div className="absolute bottom-16 left-4">
              <Skeleton className="h-8 w-64" />
            </div>
            <div className="absolute bottom-2 left-4 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          <div className="mb-2 p-4 rounded-lg shadow-inner">
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="flex flex-col h-full gap-1">
          <Card className="h-full">
            <CardContent className="px-6 py-4 h-full flex flex-col">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
          </CardHeader>
          <CardContent className="p-2 px-6">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
          </CardHeader>
          <CardContent className="px-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealDetailSkeleton;