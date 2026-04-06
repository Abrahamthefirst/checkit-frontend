export function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h2 className="text-xl font-semibold text-slate-900">No products found</h2>
      <p className="mt-2 text-sm text-slate-600">
        Try adjusting your search or category filter.
      </p>
    </div>
  );
}
