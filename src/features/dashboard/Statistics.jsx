import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import StatisticItem from "./StatisticItem";
import { formatCurrency } from "../../utils/helpers";

function Statistics({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmedStays?.length;
  // Occupancy Rate is the total no of nights occupied in X days / total available nights in X days (no of cabins * X days)
  const occupancyRate =
    (confirmedStays?.reduce((acc, curr) => acc + curr.numNights, 0) /
      (cabinCount * numDays)) *
    100;

  return (
    <div className="col-span-full grid grid-cols-1 gap-[1px] overflow-hidden rounded-xl border-[1px] border-gray-200 bg-gray-900 bg-opacity-5 dark:border-gray-800 dark:bg-gray-800 sm:grid-cols-[repeat(2,_minmax(min-content,_1fr))] lg:grid-cols-[repeat(4,_minmax(min-content,_1fr))]">
      <StatisticItem
        title="Bookings"
        color="text-sky-700 dark:text-white"
        bgColor="bg-sky-100 dark:bg-sky-800"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <StatisticItem
        title="Sales"
        color="text-green-700 dark:text-white"
        bgColor="bg-green-100 dark:bg-green-800"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <StatisticItem
        title="Check ins"
        color="text-indigo-700 dark:text-white"
        bgColor="bg-indigo-100 dark:bg-indigo-800"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <StatisticItem
        title="Occupancy rate"
        color="text-yellow-700 dark:text-white"
        bgColor="bg-yellow-100 dark:bg-yellow-800"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate) + "%"}
      />
    </div>
  );
}

export default Statistics;
