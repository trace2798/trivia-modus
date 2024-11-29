import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return (
    <>
      <div className="w-full min-h-screen space-y-5 flex flex-col items-center justify-center">
        <Skeleton className="w-full max-w-[300px] h-8" />
        <Skeleton className="w-full max-w-sm h-12" />
        <Skeleton className="w-full max-w-[300px] h-8" />
      </div>
    </>
  );
}
