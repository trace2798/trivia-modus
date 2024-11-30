import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

interface LoadingBlockProps {}

const LoadingBlock: FC<LoadingBlockProps> = ({}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      <div className="flex flex-col space-y-3 pt-5">
        <div className="flex flex-col space-y-1">
          <h2 className="font-bold text-3xl">Question&apos;s History</h2>
          <h3 className="text-primary/80">
            Questions in the games your played
          </h3>
        </div>
        <Separator />
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </>
  );
};

export default LoadingBlock;
