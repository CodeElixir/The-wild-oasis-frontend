import { useNavigate } from "react-router-dom";
import { useCheckout } from "./useCheckout";
import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import SpinnerMini from "../../ui/Spinner/SpinnerMini";
import { bookingStatusToBadgeColor } from "../../utils/helpers";

function TodayListItem({ activity }) {
  const {
    id: bookingId,
    status,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    numNights,
  } = activity;
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();

  return (
    <>
      <div className="col-start-1 col-end-2">
        {status === "unconfirmed" && (
          <Badge className={bookingStatusToBadgeColor[status]}>Arriving</Badge>
        )}
        {status === "checked-in" && (
          <Badge className={bookingStatusToBadgeColor[status]}>Departing</Badge>
        )}
      </div>

      <div className="col-start-2 col-end-3">
        {countryFlag && (
          <img
            className="block max-w-[1.25rem] rounded-sm border border-gray-100 dark:border-gray-50"
            src={countryFlag}
            alt={`Flag of ${country}`}
          />
        )}
      </div>

      <div className="col-start-3 col-end-4">
        <span className="whitespace-nowrap font-medium">{guestName}</span>
      </div>

      <div className="col-start-4 col-end-5">
        <span className="whitespace-nowrap font-medium">
          {numNights} nights
        </span>
      </div>

      <div className="col-start-5 col-end-6">
        {status === "unconfirmed" && (
          <Button
            size="sm"
            onClick={() => navigate(`/checkin/${bookingId}`)}
            className={"w-28"}
          >
            <div className="items-centergap-3 flex">
              <span>Check in</span>
            </div>
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            size="sm"
            onClick={() => checkout(activity)}
            disabled={isCheckingOut}
            disabledStyles="!bg-indigo-500"
            className={"w-28"}
          >
            <div className="flex items-center gap-3">
              <span className="whitespace-nowrap">Check out</span>
              {isCheckingOut && <SpinnerMini className={"!h-5 !w-5"} />}
            </div>
          </Button>
        )}
      </div>
    </>
  );
}

export default TodayListItem;
