import { cloneElement, forwardRef } from "react";

const PaginationItem = forwardRef(function PaginationItem(props, _ref) {
  const {
    active,
    type,
    value,
    activePage,
    setActivePage,
    itemClasses,
    ...rest
  } = props;

  const disabled = props.disabled || type === "ellipsisItem";

  const handleClick = (e) => {
    if (type === "ellipsisItem") {
      return;
    }

    const prevActivePage = activePage;

    if (+prevActivePage === +value) {
      return;
    }

    setActivePage(value);
    props.onPageChange(e, value);
    props.onClick(e, value);
  };

  const handleKeyDown = (e) => {
    if (type === "ellipsisItem") {
      return;
    }

    if (e.code === "Enter") {
      handleClick(e);
    }

    props.onKeyDown(e, value);
  };

  const borderRadiusClass = () => {
    if (type == "firstItem") {
      return "rounded-l-md";
    }

    if (type == "lastItem") {
      return "rounded-r-md";
    }
    return "";
  };

  const render = () => {
    switch (type) {
      case "pageItem":
        return (
          <a
            ref={_ref}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-current={active}
            aria-disabled={disabled}
            className={`relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:bg-opacity-10 dark:text-gray-200 dark:ring-gray-800 dark:hover:bg-opacity-20 ${itemClasses} ${
              active
                ? "z-10 bg-indigo-600 text-white hover:bg-indigo-600 focus-visible:outline-indigo-600 dark:bg-opacity-100 hover:dark:bg-opacity-100"
                : ""
            }`}
          >
            {value}
          </a>
        );

      case "ellipsisItem":
        return (
          <a
            ref={_ref}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={`relative inline-flex items-center px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 dark:bg-opacity-10 dark:text-gray-200 dark:ring-gray-800 dark:hover:bg-opacity-20 ${borderRadiusClass()} ${itemClasses}`}
          >
            {props[type] &&
              cloneElement(props[type], {
                className: "h-4 w-4",
                "aria-hidden": "true",
              })}
          </a>
        );

      default:
        return (
          <a
            ref={_ref}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={`relative inline-flex cursor-pointer items-center px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:bg-opacity-10 dark:text-gray-200 dark:ring-gray-800 dark:hover:bg-opacity-20 ${borderRadiusClass()} ${itemClasses}`}
          >
            {props[type] &&
              cloneElement(props[type], {
                className: "h-4 w-4",
                "aria-hidden": "true",
              })}
          </a>
        );
    }
  };

  return render();
});

export default PaginationItem;
