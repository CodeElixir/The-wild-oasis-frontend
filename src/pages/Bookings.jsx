import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">All Bookings</h1>
        </div>
        <BookingTableOperations />
      </div>
      <div>
        <BookingTable />
      </div>
    </div>
  );
}

export default Bookings;
