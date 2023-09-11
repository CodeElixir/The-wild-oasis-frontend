import { useBookings } from "./useBookings";
import { useDeleteBooking } from "./useDeleteBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import BookingTableRow from "./BookingTableRow";
import BookingTableHeader from "./BookingTableHeader";
import BookingTableFooter from "./BookingTableFooter";
import Table from "../../ui/Table/Table";
import Spinner from "../../ui/Spinner/Spinner";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  const { isCheckingOut } = useCheckout();
  const { isDeleting } = useDeleteBooking();

  if (isLoading || isCheckingOut || isDeleting) return <Spinner />;

  return (
    <Table gridCols="grid-cols-[0.6fr_2fr_minmax(max-content,_2.4fr)_minmax(max-content,_1.4fr)_1fr_0.5fr]">
      <BookingTableHeader />
      {bookings?.length > 0 ? (
        bookings?.map((booking) => (
          <BookingTableRow booking={booking} key={booking.id} />
        ))
      ) : (
        <Table.Cell className="col-span-full">
          <div className="w-full text-center text-gray-700 dark:text-gray-400">
            No data to show!
          </div>
        </Table.Cell>
      )}
      <BookingTableFooter count={count} />
    </Table>
  );
}

export default BookingTable;
