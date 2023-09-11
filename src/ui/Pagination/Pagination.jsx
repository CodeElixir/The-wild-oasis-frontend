import { useEffect, useState } from "react";
import { forwardRef } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiDotsHorizontal,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi";
import { createPaginationItems } from "./createPaginationItems";
import Button from "../Button/Button";
import PaginationItem from "./PaginationItem";

const Pagination = forwardRef(function Pagination(props, _ref) {
  const {
    defaultActivePage = 1,
    activePage: currentPage,
    disabled = false,
    hideEllipsis = false,
    boundaryRange = 1,
    siblingRange = 1,
    totalCount,
    pageSize = 10,
    ellipsisItem = <HiDotsHorizontal />,
    firstItem = <HiChevronDoubleLeft />,
    lastItem = <HiChevronDoubleRight />,
    nextItem = <HiChevronRight />,
    prevItem = <HiChevronLeft />,
    onClick = () => {},
    onKeyDown = () => {},
    onPageChange = () => {},
    containerClasses = "",
    itemClasses = "",
    ...rest
  } = props;

  const [activePage, setActivePage] = useState(defaultActivePage);

  useEffect(() => {
    if (currentPage) {
      setActivePage(currentPage);
    }
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const items = createPaginationItems({
    activePage,
    boundaryRange,
    hideEllipsis,
    siblingRange,
    totalPages,
  });

  const handlePreviousClick = (e) => {
    const value = activePage > 1 ? activePage - 1 : 1;
    setActivePage(value);
    onPageChange(e, value);
    onClick(e, value);
  };

  const handleNextClick = (e) => {
    const value = activePage < totalPages ? activePage + 1 : totalPages;
    setActivePage(value);
    onPageChange(e, value);
    onClick(e, value);
  };

  return (
    <div
      className={`flex w-full items-center justify-between ${containerClasses}`}
      ref={_ref}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          secondary
          className="relative !font-medium"
          onClick={handlePreviousClick}
          disabled={activePage === 1}
        >
          <div className="flex items-center gap-3">
            <HiChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </div>
        </Button>
        <Button
          secondary
          className="relative !font-medium"
          onClick={handleNextClick}
          disabled={activePage === totalPages}
        >
          <div className="flex items-center gap-2">
            <HiChevronRight className="h-4 w-4" />
            <span>Next</span>
          </div>
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="text-sm">
            Showing{" "}
            <span className="font-medium">
              {(activePage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(activePage * pageSize, totalCount)}
            </span>{" "}
            of <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {items.map(({ active, type, value }) => (
              <PaginationItem
                key={`${type}-${value}`}
                active={active}
                type={type}
                value={value}
                activePage={activePage}
                setActivePage={setActivePage}
                disabled={disabled}
                ellipsisItem={ellipsisItem}
                firstItem={firstItem}
                lastItem={lastItem}
                nextItem={nextItem}
                prevItem={prevItem}
                onClick={onClick}
                onKeyDown={onKeyDown}
                onPageChange={onPageChange}
                itemClasses={itemClasses}
                {...rest}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
});

export default Pagination;
