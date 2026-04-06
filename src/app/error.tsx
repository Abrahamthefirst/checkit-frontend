"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <main className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">
        Something went wrong
      </h1>
      <p className="mt-3 text-slate-600">
        We couldn’t load the content right now. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Retry
      </button>
    </main>
  );
}
