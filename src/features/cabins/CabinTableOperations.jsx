import Filter from "../../ui/Filters/Filter";
import SortBy from "../../ui/Filters/SortBy";

const filters = [
  {
    id: 1,
    label: "All",
    value: "all",
  },
  {
    id: 2,
    label: "No discount",
    value: "no-discount",
  },
  {
    id: 3,
    label: "With discount",
    value: "with-discount",
  },
];

const sortOptions = [
  { id: 1, label: "Sort by name (A-Z)", value: "name-asc" },
  { id: 2, label: "Sort by name (Z-A)", value: "name-desc" },
  { id: 3, label: "Sort by price (low first)", value: "regularPrice-asc" },
  { id: 4, label: "Sort by price (high first)", value: "regularPrice-desc" },
  { id: 5, label: "Sort by capacity (low first)", value: "maxCapacity-asc" },
  { id: 6, label: "Sort by capacity (high first)", value: "maxCapacity-desc" },
];

function CabinTableOperations() {
  return (
    <>
      <div className="flex">
        <Filter
          filters={filters}
          filterField="discount"
          label="Cabin Filters"
          gridCols="grid-cols-1 min-[315px]:grid-cols-3"
        />
      </div>
      <div className="flex">
        <SortBy options={sortOptions} containerStyles={"w-60"} />
      </div>
    </>
  );
}

export default CabinTableOperations;
