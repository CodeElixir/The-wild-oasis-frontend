import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <header className="flex flex-wrap items-center justify-between gap-4 bg-indigo-600 px-10 py-5 text-base font-medium text-indigo-100">
        <div className="flex items-center gap-4">
          <HiOutlineHomeModern className="h-8 min-h-[1.5rem] w-8 min-w-[1.5rem]" />
          <div>
            <span>{numNights} nights in Cabin</span>
            <span className="ml-1 font-[Sono] text-lg">{cabinName}</span>
          </div>
        </div>
        <div>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </div>
      </header>

      <section className="flex flex-col text-base">
        <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 px-10 py-5 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {countryFlag && (
              <img
                className="block max-w-[1.25rem] rounded-sm border border-gray-100 dark:border-gray-50"
                src={countryFlag}
                alt={`Flag of ${country}`}
              />
            )}
            <span className="font-medium">
              {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400">
            <span className="mr-3">&bull;</span>
            {email}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            <span className="mr-3">&bull;</span>
            National ID {nationalID}
          </span>
        </div>

        <div className="flex flex-col flex-wrap gap-4 px-10 py-5">
          {observations && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3">
                <HiOutlineChatBubbleBottomCenterText className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">Observations</span>
              </div>
              <div className="text-gray-700 dark:text-gray-400">
                <span>{observations}</span>
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <HiOutlineCheckCircle className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">Breakfast included?</span>
            </div>
            <div className="text-gray-700 dark:text-gray-400">
              <span>{hasBreakfast ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        <div className="px-10 pb-5">
          <div
            className={`flex flex-wrap items-center justify-between gap-3 rounded-md px-8 py-4 ${
              isPaid ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            <div className="flex gap-2">
              <HiOutlineCurrencyDollar
                className={`mt-[2px] min-h-[1.2rem] min-w-[1.2rem] sm:mt-0 sm:h-6 sm:w-6 ${
                  isPaid ? "text-green-800" : "text-yellow-800"
                }`}
              />
              <div
                className={`font-semibold ${
                  isPaid ? "text-green-800" : "text-yellow-800"
                }`}
              >
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3">
                  <span>Total price</span>
                  <span className="font-medium">
                    {formatCurrency(totalPrice)}
                    {hasBreakfast && (
                      <span>
                        {` (${formatCurrency(
                          cabinPrice,
                        )} cabin + ${formatCurrency(extrasPrice)} breakfast)`}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <span
                className={`text-sm font-semibold uppercase ${
                  isPaid ? "text-green-800" : "text-yellow-800"
                }`}
              >
                {isPaid ? "Paid" : "Will pay at property"}
              </span>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="flex flex-wrap items-center justify-end gap-3 px-10 pb-5">
          <span className="text-right text-xs text-gray-500 dark:text-gray-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </span>
        </div>
      </footer>
    </section>
  );
}

export default BookingDataBox;
