import { useCabins } from "../cabins/useCabins";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Statistics from "./Statistics";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Spinner from "../../ui/Spinner/Spinner";

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { isLoading: isLoadingCabins, cabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <div className="grid grid-cols-12 grid-rows-[min-content_auto__min-content] gap-6">
      <Statistics
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <div className="col-span-full grid grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fit,_minmax(35rem,_1fr))]">
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
      </div>

      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
