export const LIST_PAGE_SIZE = 6;

export function getPageCount(totalItems: number, pageSize = LIST_PAGE_SIZE) {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function getPageItems<T>(
  items: T[],
  page: number,
  pageSize = LIST_PAGE_SIZE
) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getPageUrl(basePath: string, page: number) {
  return page === 1 ? basePath : `${basePath}/page/${page}`;
}
