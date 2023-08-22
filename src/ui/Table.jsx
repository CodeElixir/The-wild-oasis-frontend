function TableHeaderCell({ children, className = "" }) {
  return (
    <div
      className={`col-span-1 flex items-center px-6 py-4 text-sm font-bold uppercase text-gray-600 ${className}`}
    >
      {children}
    </div>
  );
}

function TableCell({ children, className = "" }) {
  return (
    <div
      className={`col-span-1 flex items-center bg-white px-6 py-4 ${className}`}
    >
      {children}
    </div>
  );
}

function Table({
  gridCols = "grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))]",
  className = "",
  children,
}) {
  return (
    <div
      className={`grid ${gridCols} overflow-hidden overflow-x-auto rounded-xl border-[1px] border-gray-200 bg-gray-100 ${className}`}
      role="table"
    >
      {children}
    </div>
  );
}

Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;

export default Table;
