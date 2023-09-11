import Filter from "../../ui/Filters/Filter";

const filters = [
  {
    id: 1,
    label: "Last 7 days",
    value: "7",
  },
  {
    id: 2,
    label: "Last 30 days",
    value: "30",
  },
  {
    id: 3,
    label: "Last 90 days",
    value: "90",
  },
];

function DashboardFilter() {
  return (
    <Filter
      filters={filters}
      filterField="last"
      label="Dashboard Filters"
      gridCols="grid-cols-1 min-[350px]:grid-cols-3"
    />
  );
}

export default DashboardFilter;
