Content Explorer

A production-minded Content Explorer built with Next.js App Router, TypeScript, and Tailwind CSS, using the DummyJSON Products API as the data source.

The application allows users to browse, search, filter, and inspect product content through a responsive interface with server-rendered pages, shareable URL state, and clear loading/error/empty states.

Live Demo

Repository: https://github.com/Abrahamthefirst/checkit-frontend
Live URL: https://checkit-frontend-8bal.vercel.app/

Stack
• Next.js 16 with App Router
• TypeScript in strict mode
• Tailwind CSS
• Vitest + React Testing Library
• DummyJSON Products API

Setup

Clone the repository and run locally in under 5 commands:

``bash
git clone https://github.com/Abrahamthefirst/checkit-frontend
cd checkit-frontend
npm install
npm run dev
`

Then open:

`bash
http://localhost:3000
`

API Choice

I chose the DummyJSON Products API because it is:

• public and stable 
• easy to paginate
• rich in metadata
• image-based, which suits a content explorer UI well


It provides the fields needed for the brief, including:
• title
• thumbnail/image
• category
• price
• rating
• stock
• description

Features Implemented
Listing Page
• Server-rendered product listing page
• Displays 20 items per page
• Each card shows:
  - product title
  - image
  - category
  - price
  - rating
  - stock
  - brand
• Responsive grid layout:
  - mobile: 1 column
  - tablet: 2 columns
  - desktop: 4 columns
• Pagination implemented instead of infinite scroll

Detail Page
• Dynamic route at /products/[id]
• Product data fetched at the server level
• Metadata implemented with generateMetadata
  - page title
  - description
  - Open Graph image
• Breadcrumb navigation back to the listing page

Search and Filtering
• Debounced search input (400ms debounce)
• Category filter dropdown
• URL-driven state using search params
• Search/filter state is shareable via URL

Loading, Error, and Empty States
• Skeleton loading UI implemented via loading.tsx
• Friendly route-level error.tsx
• Dedicated empty state when no products match the current filters

Testing
• Two component tests using Vitest and React Testing Library:
  - ProductCard
  - Pagination

Bonus: React 18 Streaming with Suspense
• The product detail page streams a related-products section
• The primary detail content renders first
• A meaningful skeleton fallback is shown while related products load

Why I Chose Pagination Instead of Infinite Scroll

I chose pagination rather than infinite scroll for three reasons:

Accessibility  
   Pagination is generally easier to navigate and reason about with keyboard and assistive technology.

Shareable state  
   It works naturally with URL parameters, which makes exact views easy to revisit and share.

Simpler SSR/ISR behavior  
   Pagination is easier to cache, test, and reason about in a server-rendered application than infinite scroll.

Given the scope and timebox of the assessment, pagination provided the most maintainable and production-friendly solution.

Architecture Decisions
App Router + Server Components
I used the Next.js App Router and defaulted to server-rendered pages for the listing and detail routes.

This gave me:
• server-side data fetching
• better SEO
• clean metadata generation
• simpler performance characteristics
• less client-side JavaScript for primary content

API Layer Abstraction
All API requests are abstracted behind src/lib/api.ts.

That means:
• components do not call fetch() directly
• API concerns stay centralized
• response validation and request logic are easier to maintain

Shared Types
Shared domain types live in src/types/.

This keeps:
• component props consistent
• API return shapes reusable
• TypeScript easier to maintain as the app grows

Minimal Client Components
Only interactive UI pieces that truly need client behavior are client components, such as the search/filter controls.

This keeps the app aligned with the strengths of the App Router and avoids unnecessary client-side complexity.

Presentation and Logic Separation
I avoided putting business logic directly inside JSX where possible.

Examples:
• URL search param parsing is handled in utility functions
• data fetching lives in lib/
• formatting helpers are extracted to utility functions

Folder Structure

`text
src/
  app/
    error.tsx
    globals.css
    layout.tsx
    loading.tsx
    not-found.tsx
    page.tsx
    products/
      [id]/
        page.tsx
  components/
    breadcrumbs.tsx
    empty-state.tsx
    filters.tsx
    pagination.tsx
    product-card.tsx
    product-grid.tsx
    product-skeleton-grid.tsx
    related-products.tsx
    related-products-skeleton.tsx
  lib/
    api.ts
    params.ts
    utils.ts
  types/
    product.ts
  tests/
    pagination.test.tsx
    product-card.test.tsx
  test/
    setup.ts
`

Performance Optimizations Applied

I focused on shipping a performant solution without making the code harder to understand.

next/image
All product images use next/image rather than plain img tags.

Why:
• responsive image loading
• better optimization
• reduced layout shift risk

I also provided explicit layout behavior and used priority for above-the-fold images.

next/font
I used next/font for font optimization.

Why:
• better font loading performance
• avoids render-blocking external font requests
• reduces layout shift compared to ad hoc font loading

Incremental Static Regeneration / Revalidation
I used Next.js fetch revalidation for API requests.

Why:
• reduces repeated API work
• allows content to stay reasonably fresh
• balances speed with up-to-date data

In this project:
• listing and detail data are revalidated periodically
• category data is also cached with revalidation

Responsive, Stable Image Layouts
Images are displayed in fixed aspect ratio containers so the layout remains stable as content loads.

Why:
• reduces layout shift
• improves perceived performance
• helps Core Web Vitals

Limited Client-Side JavaScript
I kept most of the app server-rendered and only used client components where interactivity was required.

Why:
• smaller hydration cost
• cleaner architecture
• faster initial rendering

Cache Decisions

I used Next.js fetch caching with revalidation rather than no-store.

Why revalidate
This project uses public API content that changes occasionally, but not on every request. That makes it a good fit for time-based revalidation.

This approach helps:
• reduce unnecessary network requests
• improve repeat page performance
• keep content reasonably fresh without requiring fully dynamic rendering

Why not no-store
Using no-store would force every request to hit the upstream API, which would hurt performance and provide little benefit for this use case.

Why not force-cache forever
The data is not fully static, so permanently caching it would risk serving stale content for too long.

React 18 Streaming with Suspense

For the optional streaming bonus, I added a Suspense boundary on the product detail page around a secondary server-rendered section: related products.

Why this approach
The main product content is the highest-priority content on the page. Related products are useful, but secondary. Streaming lets the primary content render immediately while the lower-priority content loads separately.

Implementation
• product detail loads at the server level
• related products are fetched in a separate async server component
• the related-products section is wrapped in Suspense
• a skeleton fallback is rendered while the related section is loading

Result
This demonstrates:
• React 18 streaming
• meaningful Suspense usage
• no client-side loading state for that fetch

Accessibility Notes

I aimed for a solid accessibility baseline by:

• using semantic HTML structure
• ensuring images have descriptive alt text
• keeping form controls labeled
• using visible focus states
• preserving readable contrast and spacing
• using button/link semantics appropriately

Given more time, I would run a formal axe/Lighthouse accessibility audit and document the findings in more detail.

Trade-offs and Known Limitations
Combined search + category filtering
The DummyJSON API does not provide a perfectly expressive combined query model for every search/filter combination.

In the current implementation:
• search uses the API search endpoint
• category filtering can be applied on top of returned search results

This works well for the assessment, but in a production app I would likely introduce a backend-for-frontend layer or normalized internal API to support more exact combined filtering and pagination behavior.

Public API dependency
Because the app relies on a third-party public API, availability and response shape are outside my control.

To reduce risk:
• I validate and centralize API access
• I handle loading, error, and not-found states explicitly

Scope control over feature breadth
I intentionally prioritized:
• clean architecture
• responsive UI quality
• loading/error/empty states
• performance
• test coverage

over adding extra features that would be less polished within the timebox.

Cloudflare deployment
Cloudflare Workers was preferred in the brief, but I prioritized delivery quality and implementation clarity within the timebox

What I Would Improve With More Time

If I had few more  hours, I would focus on:

Improving combined search/filter accuracy  
   I would normalize search and category filtering in a server-side layer so pagination totals remain exact for combined query states.

Cloudflare Workers deployment with OpenNext  
   I would deploy with OpenNext, add edge caching verification, and document the runtime/cache semantics more deeply.

Accessibility audit  
   I would run axe-core/Lighthouse accessibility checks, fix any remaining issues, and document the audit results formally.

Testing

Run all tests:

`bash
npm run test
`

Run tests in watch mode:

`bash
npm run test:watch
`

Current tests cover:
• ProductCard rendering of product metadata
• Pagination URL generation and page display

Environment Variables


Example .env.example:

`env
NEXTPUBLICAPP_URL=
`

At the moment, the selected API does not require an API key.

Scripts

`json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run",
  "test:watch": "vitest"
}
`


If given few more hours, I would:
improve combined search/filter correctness through a normalized server-side query layer,
add a formal accessibility audit and fixes,
deploy to Cloudflare Workers with cache verification headers.

> I chose Vercel for this submission to prioritize delivery speed and implementation quality within the timebox, while keeping the architecture compatible with a future OpenNext/Cloudflare deployment.


