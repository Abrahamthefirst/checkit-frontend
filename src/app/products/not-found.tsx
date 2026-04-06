import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
      <p className="mt-3 text-slate-600">
        The product you’re looking for does not exist or is unavailable.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Back to products
      </Link>
    </main>
  );
}
