import { z } from "zod";
import { Product, ProductsResponse, ProductCategory } from "@/types/products";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const REVALIDATE_SECONDS = 300;

export class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()).optional(),
  brand: z.string().optional(),
  sku: z.string().optional(),
  thumbnail: z.string(),
  images: z.array(z.string()),
  availabilityStatus: z.string().optional(),
});

const productsResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

const productCategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  url: z.string().url(),
});

const categoriesResponseSchema = z.array(productCategorySchema);
async function fetchJson<T>(
  url: string,
  schema: z.ZodSchema<T>,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (response.status === 404) {
    throw new NotFoundError(`404 for ${url}`);
  }
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const json = await response.json();
  return schema.parse(json);
}

export async function getSearchProducts(params: {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
}): Promise<ProductsResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const skip = (page - 1) * limit;
  const q = params.q?.trim();
  const category = params.category?.trim();

  if (q) {
    const url = new URL(`${BASE_URL}/products/search`);
    url.searchParams.set("q", q);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("skip", String(skip));

    const data = await fetchJson(url.toString(), productsResponseSchema);
    return category
      ? {
          ...data,
          products: data.products.filter(
            (product) => product.category === category,
          ),
          total: data.products.filter(
            (product) => product.category === category,
          ).length,
        }
      : data;
  }

  if (category) {
    const url = new URL(
      `${BASE_URL}/products/category/${encodeURIComponent(category)}`,
    );
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("skip", String(skip));
    return fetchJson(url.toString(), productsResponseSchema);
  }

  const url = new URL(`${BASE_URL}/products`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  return fetchJson(url.toString(), productsResponseSchema);
}

export async function getProductById(id: string): Promise<Product> {
  return fetchJson(`${BASE_URL}/products/${id}`, productSchema);
}

export async function getCategories(): Promise<ProductCategory[]> {
  return fetchJson(`${BASE_URL}/products/categories`, categoriesResponseSchema);
}

export async function getProductsByCategory(params: {
  category: string;
  limit?: number;
  excludeId?: number;
}): Promise<Product[]> {
  const limit = params.limit ?? 4;

  const url = new URL(
    `${BASE_URL}/products/category/${encodeURIComponent(params.category)}`,
  );
  url.searchParams.set("limit", String(limit + 1));

  const data = await fetchJson(url.toString(), productsResponseSchema);

  return data.products
    .filter((product) => product.id !== params.excludeId)
    .slice(0, limit);
}
