import { SearchParams } from "./types";

export function addSortToPathname(
  pathname: string,
  searchParams: SearchParams,
  sort: string
): string {
  const newSearchParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    value &&
      (Array.isArray(value)
        ? value.forEach((item) => newSearchParams.append(key, item))
        : newSearchParams.append(key, value));
  });
  newSearchParams.delete("sort");
  newSearchParams.delete("order");
  newSearchParams.append("sort", sort);
  newSearchParams.append(
    "order",
    searchParams.order === "asc" && searchParams.sort === sort ? "desc" : "asc"
  );

  return `${pathname}?${newSearchParams.toString()}`;
}
