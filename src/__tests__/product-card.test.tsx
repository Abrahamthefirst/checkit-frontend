import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/product-card";
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt} />,
}));

describe("ProductCard", () => {
  it("renders product information", () => {
    render(
      <ProductCard
        product={{
          id: 1,
          title: "Test Product",
          description: "A sample description",
          category: "beauty",
          price: 12.99,
          discountPercentage: 5,
          rating: 4.5,
          stock: 10,
          thumbnail: "/test.jpg",
          images: ["/test.jpg"],
          brand: "Acme",
        }}
      />,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("beauty")).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
  });
});
