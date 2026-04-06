const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export function getPage(searchParams: Record<string, string | string[] | undefined>) {
  const raw = searchParams.page;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? page : DEFAULT_PAGE;
}

export function getLimit(searchParams: Record<string, string | string[] | undefined>) {
  const raw = searchParams.limit;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const limit = Number(value);
  return Number.isFinite(limit) && limit > 0 && limit <= 50 ? limit : DEFAULT_LIMIT;
}

export function getQuery(searchParams: Record<string, string | string[] | undefined>) {
  const raw = searchParams.q;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.trim() ?? "";
}

export function getCategory(searchParams: Record<string, string | string[] | undefined>) {
  const raw = searchParams.category;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.trim() ?? "";
}
