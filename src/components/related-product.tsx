import { getProductsByCategory } from "@/lib/api";
import { ProductCard } from "./product-card";

type RelatedProductsProps = {
  category: string;
  currentProductId: number;
};

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
  // I need to implement a delay to demonstrate streaming in the take-home.
  await delay(1200);

  const products = await getProductsByCategory({
    category,
    limit: 4,
    excludeId: currentProductId,
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Related products</h2>
        <p className="text-sm text-slate-600">
          More items from the same category.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
