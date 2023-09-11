import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";

function Filter({
  filters = [],
  label = "filters",
  gridCols = "grid-cols-[repeat(auto-fit,_minmax(6rem,_1fr))]",
  containerClasses = "",
  filterField = "discount",
  ...rest
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(
    searchParams.has(filterField)
      ? filters.find((filter) => filter.value === searchParams.get(filterField))
      : filters[0],
  );

  const handleSelectFilter = (filter) => {
    setSelected(filter);
    searchParams.set(filterField, filter.value);
    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }
    setSearchParams(searchParams);
  };

  return (
    <RadioGroup value={selected} onChange={handleSelectFilter} {...rest}>
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      <div className={`grid ${gridCols} gap-2 ${containerClasses}`}>
        {filters.map((filter) => (
          <RadioGroup.Option
            key={filter.id}
            value={filter}
            className={({ active, checked }) =>
              `${
                active
                  ? "bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2 hover:bg-indigo-500 dark:bg-opacity-100 dark:ring-offset-gray-900 dark:hover:bg-opacity-100"
                  : ""
              }${
                checked
                  ? "bg-indigo-600 text-white hover:bg-indigo-500 dark:!bg-opacity-100 dark:hover:bg-opacity-100"
                  : "bg-white text-gray-900 hover:bg-gray-50 dark:text-gray-200"
              } flex cursor-pointer items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-transparent dark:bg-opacity-5 dark:text-gray-200 dark:ring-gray-800 dark:hover:bg-opacity-20`
            }
          >
            {({ checked }) => (
              <>
                <RadioGroup.Label
                  as="span"
                  className={`font-medium ${checked ? "text-white" : ""}`}
                >
                  {filter.label}
                </RadioGroup.Label>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export default Filter;
