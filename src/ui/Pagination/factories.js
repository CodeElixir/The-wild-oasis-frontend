/************************************************ITEM FACTORIES START************************************************/
/**
 * @param {number} pageNumber
 * @return {Object}
 */
export const createEllipsisItem = (pageNumber) => ({
  active: false,
  type: "ellipsisItem",
  value: pageNumber,
});

/**
 * @return {Object}
 */
export const createFirstPage = () => ({
  active: false,
  type: "firstItem",
  value: 1,
});

/**
 * @param {number} activePage
 * @return {Object}
 */
export const createPrevItem = (activePage) => ({
  active: false,
  type: "prevItem",
  value: Math.max(1, activePage - 1),
});

/**
 * @param {number} activePage
 * @return {function}
 */
export const createPageFactory = (activePage) => (pageNumber) => ({
  active: activePage === pageNumber,
  type: "pageItem",
  value: pageNumber,
});

/**
 * @param {number} activePage
 * @param {number} totalPages
 * @return {Object}
 */
export const createNextItem = (activePage, totalPages) => ({
  active: false,
  type: "nextItem",
  value: Math.min(activePage + 1, totalPages),
});

/**
 * @param {number} totalPages
 * @return {Object}
 */
export const createLastItem = (totalPages) => ({
  active: false,
  type: "lastItem",
  value: totalPages,
});

/************************************************ITEM FACTORIES END************************************************/

/************************************************RANGE FACTORIES START************************************************/
/**
 * @param {number} start
 * @param {number} end
 * @param {function} pageFactory
 * @return {Array}
 */

export const createSimpleRange = (start, end, pageFactory) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => pageFactory(index + start));
};

// Inner prefix and inner suffix range factories(i.e, ellipsis)
/**
 * @param {number} innerGroupStart
 * @param {number} firstGroupEnd
 * @param {function} pageFactory
 * @param {boolean} hideEllipsis
 * @return {Array}
 */
export const createInnerPrefix = (
  innerGroupStart,
  firstGroupEnd,
  pageFactory,
  hideEllipsis,
) => {
  const prefixPageStart = firstGroupEnd + 1;
  const prefixPageEnd = innerGroupStart - 1;
  const showEllipsis = !hideEllipsis && prefixPageStart !== prefixPageEnd;
  const prefixFactory = showEllipsis ? createEllipsisItem : pageFactory;
  return [prefixFactory(prefixPageEnd)];
};

/**
 * @param {number} innerGroupEnd
 * @param {number} lastGroupStart
 * @param {function} pageFactory
 * @param {boolean} hideEllipsis
 * @return {Array}
 */
export const createInnerSuffix = (
  innerGroupEnd,
  lastGroupStart,
  pageFactory,
  hideEllipsis,
) => {
  const suffixPageStart = innerGroupEnd + 1;
  const suffixPageEnd = lastGroupStart - 1;
  const showEllipsis = !hideEllipsis && suffixPageStart !== suffixPageEnd;
  const suffixFactory = showEllipsis ? createEllipsisItem : pageFactory;
  return [suffixFactory(suffixPageStart)];
};

/**
 * @param {object} options
 * @param {function} pageFactory
 * @return {Array}
 */
export const createComplexRange = (options, pageFactory) => {
  const { activePage, boundaryRange, siblingRange, totalPages, hideEllipsis } =
    options;

  const ellipsisSize = hideEllipsis ? 0 : 1;

  // First group boundaries(represents starting boundary pages range)
  const firstGroupStart = 1;
  const firstGroupEnd = boundaryRange;
  const firstGroupRange = createSimpleRange(
    firstGroupStart,
    firstGroupEnd,
    pageFactory,
  );

  // Last group boundaries(represents ending boundary pages range)
  const lastGroupStart = totalPages - boundaryRange + 1;
  const lastGroupEnd = totalPages;
  const lastGroupRange = createSimpleRange(
    lastGroupStart,
    lastGroupEnd,
    pageFactory,
  );

  // Inner group boundaries(represents (siblings + activePage) excluding ellipsis)
  const innerGroupStart = Math.min(
    Math.max(firstGroupEnd + ellipsisSize + 1, activePage - siblingRange),
    lastGroupStart - ellipsisSize - 2 * siblingRange - 1,
  );
  const innerGroupEnd = innerGroupStart + 2 * siblingRange;
  const innerGroupRange = createSimpleRange(
    innerGroupStart,
    innerGroupEnd,
    pageFactory,
  );

  return [
    ...firstGroupRange,
    ...createInnerPrefix(
      innerGroupStart,
      firstGroupEnd,
      pageFactory,
      hideEllipsis,
    ),
    ...innerGroupRange,
    ...createInnerSuffix(
      innerGroupEnd,
      lastGroupStart,
      pageFactory,
      hideEllipsis,
    ),
    ...lastGroupRange,
  ].filter(Boolean);
};

/************************************************RANGE FACTORIES END************************************************/
