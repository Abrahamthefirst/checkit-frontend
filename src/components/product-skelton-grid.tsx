export function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="aspect-4/3 animate-pulse bg-slate-200" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 animate-pulse rounded bg-slate-100" />
              <div className="h-14 animate-pulse rounded bg-slate-100" />
              <div className="h-14 animate-pulse rounded bg-slate-100" />
              <div className="h-14 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
