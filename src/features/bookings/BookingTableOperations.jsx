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
    label: "Checked out",
    value: "checked-out",
  },
  {
    id: 3,
    label: "Checked in",
    value: "checked-in",
  },
  {
    id: 4,
    label: "Unconfirmed",
    value: "unconfirmed",
  },
];

const sortOptions = [
  { id: 1, label: "Sort by date (recent first)", value: "startDate-desc" },
  { id: 2, label: "Sort by date (earlier first)", value: "startDate-asc" },
  { id: 3, label: "Sort by amount (high first)", value: "totalPrice-desc" },
  { id: 4, label: "Sort by amount (low first)", value: "totalPrice-asc" },
];

function BookingTableOperations() {
  return (
    <>
      <div className="flex">
        <Filter
          filters={filters}
          filterField="status"
          label="Bookings Filters"
          gridCols="grid-cols-1 min-[420px]:grid-cols-4"
        />
      </div>
      <div className="flex">
        <SortBy options={sortOptions} containerStyles={"w-60"} />
      </div>
    </>
  );
}

export default BookingTableOperations;
