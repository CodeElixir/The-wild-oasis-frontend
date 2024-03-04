import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowSmallLeft,
  HiOutlineArrowDownOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useMoveBack } from "../../hooks/useMoveBack";
import Badge from "../../ui/Badge/Badge";
import BookingDataBox from "./BookingDataBox";
import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";
import { bookingStatusToBadgeColor } from "../../utils/helpers";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDeletePopUp from "../../ui/Modal/ConfirmDeletePopUp";
import Empty from "../../ui/Empty";

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading || isCheckingOut || isDeleting) return <Spinner />;

  if (!booking) return <Empty resourceName={"booking"} />;

  const { status, id: bookingId } = booking;

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4">
          <h1 className="text whitespace-nowrap	text-2xl font-bold">
            Booking #{bookingId}
          </h1>
          <Badge className={bookingStatusToBadgeColor[status]}>
            {status.replace("-", " ")}
          </Badge>
        </div>
        <div className="flex whitespace-nowrap">
          <Button secondary onClick={moveBack}>
            <div className="flex items-center gap-3">
              <HiArrowSmallLeft className="h-5 w-5" />
              <span>Go Back</span>
            </div>
          </Button>
        </div>
      </div>
      <div className="flex">
        <BookingDataBox booking={booking} />
      </div>
      <div className="flex items-center justify-end gap-4 whitespace-nowrap">
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            <div className="flex items-center gap-3">
              <HiOutlineArrowDownOnSquare className="h-5 w-5" />
              <span>Check in</span>
            </div>
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkout(booking)}>
            <div className="flex items-center gap-3">
              <HiArrowDownOnSquare className="h-5 w-5" />
              <span>Check out</span>
            </div>
          </Button>
        )}

        <ConfirmDeletePopUp
          resourceName={"booking"}
          trigger={
            <Button danger>
              <div className="flex items-center gap-3">
                <HiTrash className="h-5 w-5" />
                <span>Delete Booking</span>
              </div>
            </Button>
          }
          onConfirm={() =>
            deleteBooking(bookingId, {
              onSuccess: () => navigate(-1),
            })
          }
          disabled={isDeleting}
        />

        <Button secondary onClick={moveBack}>
          <div className="flex items-center gap-3">
            <HiArrowSmallLeft className="h-5 w-5" />
            <span>Go Back</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default BookingDetail;
