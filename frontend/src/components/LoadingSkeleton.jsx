export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-gray-100"
        >
          <div className="h-52 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
            <div className="mt-4 h-8 w-1/3 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
