import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Pagination } from "@/components/pagination";

describe("Pagination", () => {
  it("shows the current page and total pages", () => {
    render(
      <Pagination
        currentPage={2}
        totalItems={100}
        perPage={20}
        pathname="/"
        searchParams={{ q: "phone", category: "beauty" }}
      />,
    );

    expect(screen.getByText(/Page/)).toHaveTextContent("Page 2 of 5");
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/?q=phone&category=beauty&page=1",
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/?q=phone&category=beauty&page=3",
    );
  });
});
