"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCategory } from "@/types/products";

type FiltersProps = {
  categories: ProductCategory[];
};

export function Filters({ categories }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setQuery(initialQuery);
    setCategory(initialCategory);
  }, [initialQuery, initialCategory]);

  const paramsString = useMemo(() => searchParams.toString(), [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(paramsString);

      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      params.delete("page");

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, category, pathname, router, paramsString]);

  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[2fr_1fr]">
      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-800">Search</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-800">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
