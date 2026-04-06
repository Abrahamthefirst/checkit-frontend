import Link from "next/link";

type BreadcrumbsProps = {
  currentLabel: string;
};

export function Breadcrumbs({ currentLabel }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-slate-900">
            Products
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-slate-900">{currentLabel}</li>
      </ol>
    </nav>
  );
}
