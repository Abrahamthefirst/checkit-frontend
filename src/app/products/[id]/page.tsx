import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RelatedProducts } from "@/components/related-product";
import { RelatedProductsSkeleton } from "@/components/related-product-skeleton";
import { Suspense } from "react";
import { getProductById } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { NotFoundError } from "@/lib/api";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProductById(id);

    return {
      title: `${product.title} | Content Explorer`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.thumbnail || product.images[0],
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      return {
        title: "Product not found | Content Explorer",
        description: "The requested product could not be found.",
      };
    }
    throw error;
  }
}

export const revalidate = 300;

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  try {
    const { id } = await params;
    const product = await getProductById(id);

    return (
      <main className="space-y-8">
        <Breadcrumbs currentLabel={product.title} />

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <Image
              src={product.thumbnail || product.images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                {product.title}
              </h1>
              <p className="text-base leading-7 text-slate-600">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Price</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Rating</p>
                <p className="mt-1 text-xl font-semibold">
                  {product.rating.toFixed(1)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Stock</p>
                <p className="mt-1 text-xl font-semibold">{product.stock}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Brand</p>
                <p className="mt-1 text-xl font-semibold">
                  {product.brand ?? "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </section>
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts
            category={product.category}
            currentProductId={product.id}
          />
        </Suspense>
      </main>
    );
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }
}
