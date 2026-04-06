import { ProductSkeletonGrid } from "@/components/product-skelton-grid";

export default function Loading() {
  return (
    <main className="space-y-8">
      <section className="space-y-3">
        <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-96 max-w-full animate-pulse rounded bg-slate-200" />
        <div className="h-5 w-lg max-w-full animate-pulse rounded bg-slate-200" />
      </section>

      <div className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      <ProductSkeletonGrid />
    </main>
  );
}
