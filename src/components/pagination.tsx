import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  perPage: number;
  pathname: string;
  searchParams: Record<string, string | undefined>;
};

function buildPageHref(
  pathname: string,
  searchParams: Record<string, string | undefined>,
  page: number,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  params.set("page", String(page));
  return `${pathname}?${params.toString()}`;
}

export function Pagination({
  currentPage,
  totalItems,
  perPage,
  pathname,
  searchParams,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-between gap-4"
      aria-label="Pagination"
    >
      <Link
        href={buildPageHref(
          pathname,
          searchParams,
          Math.max(1, currentPage - 1),
        )}
        aria-disabled={currentPage === 1}
        className={`rounded-lg border px-4 py-2 text-sm font-medium ${
          currentPage === 1
            ? "pointer-events-none border-slate-200 text-slate-400"
            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
        }`}
      >
        Previous
      </Link>

      <p className="text-sm text-slate-600">
        Page <span className="font-semibold text-slate-900">{currentPage}</span>{" "}
        of <span className="font-semibold text-slate-900">{totalPages}</span>
      </p>

      <Link
        href={buildPageHref(
          pathname,
          searchParams,
          Math.min(totalPages, currentPage + 1),
        )}
        aria-disabled={currentPage === totalPages}
        className={`rounded-lg border px-4 py-2 text-sm font-medium ${
          currentPage === totalPages
            ? "pointer-events-none border-slate-200 text-slate-400"
            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
