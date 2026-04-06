import { EmptyState } from "@/components/empty-state";
import { Filters } from "@/components/filters";
import { Pagination } from "@/components/pagination";
import { ProductGrid } from "@/components/product-grid";
import { getCategories, getSearchProducts } from "@/lib/api";
import { getCategory, getLimit, getPage, getQuery} from "@/lib/params"

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const revalidate = 300;

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const page = getPage(resolvedSearchParams);
  const limit = getLimit(resolvedSearchParams);
  const q = getQuery(resolvedSearchParams);
  const category = getCategory(resolvedSearchParams);

  const [categories, data] = await Promise.all([
    getCategories(),
    getSearchProducts({ page, limit, q, category }),
  ]);

  const normalizedSearchParams = {
    q: q || undefined,
    category: category || undefined,
    limit: String(limit),
  };

  return (
    <main className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">
          Content Explorer
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Discover products through a fast, searchable catalog
        </h1>
        <p className="max-w-2xl text-slate-600">
          Browse, search, and filter product data with URL-shareable state and
          server-rendered content.
        </p>
      </section>

      <Filters categories={categories} />

      {data.products.length > 0 ? (
        <>
          <ProductGrid products={data.products} />
          <Pagination
            currentPage={page}
            totalItems={data.total}
            perPage={limit}
            pathname="/"
            searchParams={normalizedSearchParams}
          />
        </>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
