import {
  createComplexRange,
  createFirstPage,
  createLastItem,
  createNextItem,
  createPageFactory,
  createPrevItem,
  createSimpleRange,
} from "./factories";

export const isSimplePagination = ({
  boundaryRange,
  hideEllipsis,
  siblingRange,
  totalPages,
}) => {
  const boundaryRangeSize = 2 * boundaryRange;
  const ellipsisSize = hideEllipsis ? 0 : 2;
  const siblingRangeSize = 2 * siblingRange;

  return 1 + ellipsisSize + siblingRangeSize + boundaryRangeSize >= totalPages;
};

export const createPaginationItems = (options) => {
  const { activePage, totalPages } = options;
  const pageFactory = createPageFactory(activePage);
  const innerRange = isSimplePagination(options)
    ? createSimpleRange(1, totalPages, pageFactory)
    : createComplexRange(options, pageFactory);

  return [
    createFirstPage(),
    createPrevItem(activePage),
    ...innerRange,
    createNextItem(activePage, totalPages),
    createLastItem(totalPages),
  ];
};
