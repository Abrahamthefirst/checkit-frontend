import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/products";
import {  formatCurrency, clampText } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const imageSrc = product.thumbnail || product.images?.[0] || "/fallback-product.png";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-4/3 bg-slate-100">
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          priority={priority}
          className="object-cover"
          sizes=""
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
            {product.category}
          </p>
          <h2 className="line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-indigo-700">
            {product.title}
          </h2>
          <p className="text-sm text-slate-600">{clampText(product.description)}</p>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 text-sm text-slate-700">
          <div className="rounded-lg bg-slate-50 p-2">
            <span className="block text-xs text-slate-500">Price</span>
            <span className="font-medium">{formatCurrency(product.price)}</span>
          </div>
          <div className="rounded-lg bg-slate-50 p-2">
            <span className="block text-xs text-slate-500">Rating</span>
            <span className="font-medium">{product.rating.toFixed(1)}</span>
          </div>
          <div className="rounded-lg bg-slate-50 p-2">
            <span className="block text-xs text-slate-500">Stock</span>
            <span className="font-medium">{product.stock}</span>
          </div>
          <div className="rounded-lg bg-slate-50 p-2">
            <span className="block text-xs text-slate-500">Brand</span>
            <span className="font-medium">{product.brand ?? "Unknown"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
