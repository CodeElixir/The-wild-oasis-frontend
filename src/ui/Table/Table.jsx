function TableHeaderCell({ children, className = "" }) {
  return (
    <div
      className={`col-span-1 flex items-center border-b border-gray-100 px-6 py-4 text-sm font-bold uppercase text-gray-600 dark:border-gray-800 dark:text-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}

function TableCell({ children, className = "" }) {
  return (
    <div
      className={`col-span-1 flex items-center border-b border-gray-100 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}

function TableFooterCell({ children, className = "" }) {
  return (
    <div
      className={`col-span-1 flex items-center px-6 py-4 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}

function Table({
  gridCols = "grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))]",
  className = "",
  children,
  ...rest
}) {
  return (
    <div
      className={`grid ${gridCols} overflow-hidden overflow-x-auto rounded-xl border-[1px] border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-10 ${className}`}
      role="table"
      {...rest}
    >
      {children}
    </div>
  );
}

Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;
Table.FooterCell = TableFooterCell;

export default Table;
