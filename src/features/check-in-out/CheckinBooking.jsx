import { useEffect, useState } from "react";
import { HiArrowSmallLeft, HiOutlineArrowDownOnSquare } from "react-icons/hi2";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../bookings/BookingDataBox";
import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";
import Checkbox from "../../ui/Input/Checkbox";
import { formatCurrency } from "../../utils/helpers";

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking = {}, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isSettingsLoading } = useSettings();
  const moveBack = useMoveBack();

  const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
    guests: { fullName: guestName } = {},
  } = booking;

  useEffect(() => {
    if (!isLoading) {
      setConfirmPaid(isPaid);
    }
  }, [isLoading, isPaid, setConfirmPaid]);

  if (isLoading || isCheckingIn || isSettingsLoading) return <Spinner />;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  const formattedBreakfastPrice = formatCurrency(optionalBreakfastPrice);

  const formattedTotalPrice = formatCurrency(totalPrice);

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        ...booking,
        id: bookingId,
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      });
    } else {
      checkin({ ...booking, id: bookingId });
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4">
          <h1 className="text whitespace-nowrap	text-2xl font-bold">
            Check in booking #{bookingId}
          </h1>
        </div>
        <div className="flex whitespace-nowrap">
          <Button onClick={moveBack}>
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
      <div className="flex flex-col flex-wrap gap-3">
        {!hasBreakfast && (
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmPaid(false);
            }}
            id="addBreakfast"
          >
            Want to add breakfast for {formattedBreakfastPrice}?
          </Checkbox>
        )}

        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id="confirmPaid"
          disabled={(isPaid && !addBreakfast) || isCheckingIn}
        >
          I confirm that {guestName} has paid the total amount of{" "}
          {!addBreakfast ? (
            <span>{formattedTotalPrice}</span>
          ) : (
            <span>{`${formatCurrency(
              totalPrice + optionalBreakfastPrice,
            )} (${formattedTotalPrice} + ${formattedBreakfastPrice})`}</span>
          )}
        </Checkbox>
      </div>
      <div className="flex items-center justify-end gap-4 whitespace-nowrap">
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          <div className="flex items-center gap-3">
            <HiOutlineArrowDownOnSquare className="h-5 w-5" />
            <span>Check in booking #{bookingId}</span>
          </div>
        </Button>
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

export default CheckinBooking;
