import { format, isToday } from "date-fns";
import Table from "../../ui/Table/Table";
import Badge from "../../ui/Badge/Badge";
import {
  formatCurrency,
  formatDistanceFromNow,
  bookingStatusToBadgeColor,
} from "../../utils/helpers";
import BookingMenu from "./BookingMenu";

function BookingTableRow(booking) {
  const {
    booking: {
      id: bookingId,
      startDate,
      endDate,
      numNights,
      totalPrice,
      status,
      guests: { fullName: guestName, email },
      cabins: { name: cabinName },
    },
  } = booking;
  return (
    <>
      <Table.Cell className="font-[Sono] font-semibold text-gray-600">
        {cabinName}
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col gap-y-1">
          <div className="font-medium">{guestName}</div>
          <div className="text-gray-500 dark:text-gray-400">{email}</div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col gap-y-1">
          <div className="font-medium">
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <Badge className={bookingStatusToBadgeColor[status]}>
          {status.replace("-", " ")}
        </Badge>
      </Table.Cell>
      <Table.Cell className="font-[Sono] font-medium">
        {formatCurrency(totalPrice)}
      </Table.Cell>
      <Table.Cell>
        <BookingMenu booking={booking.booking} status={status} />
      </Table.Cell>
    </>
  );
}

export default BookingTableRow;
