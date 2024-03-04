import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
  HiOutlineArrowDownOnSquare,
  HiOutlineArrowUpOnSquare,
  HiOutlineEye,
  HiOutlineTrash,
  HiTrash,
} from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Menu from "../../ui/Menu/Menu";
import ConfirmDeletePopUp from "../../ui/Modal/ConfirmDeletePopUp";

function BookingMenu({ booking, status }) {
  const navigate = useNavigate();
  const { checkout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <>
      <Menu>
        <Menu.Button>
          <HiEllipsisVertical />
        </Menu.Button>
        <Menu.Items>
          <div className="w-48 py-1 leading-6 text-gray-600 dark:text-gray-400">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? " bg-gray-100 text-indigo-600 dark:bg-gray-800 dark:text-white"
                      : ""
                  } group flex w-full items-center gap-4 rounded-md px-4 py-2 text-left text-sm`}
                  onClick={() => navigate(`/bookings/${booking.id}`)}
                >
                  {active ? (
                    <HiOutlineEye className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <HiEye className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>See details</span>
                </button>
              )}
            </Menu.Item>

            {status === "unconfirmed" && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? " bg-gray-100 text-indigo-600 dark:bg-gray-800 dark:text-white"
                        : ""
                    } group flex w-full items-center gap-4 rounded-md px-4 py-2 text-left text-sm`}
                    onClick={() => navigate(`/checkin/${booking.id}`)}
                  >
                    {active ? (
                      <HiOutlineArrowDownOnSquare
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    ) : (
                      <HiArrowDownOnSquare
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    )}
                    <span>Check in</span>
                  </button>
                )}
              </Menu.Item>
            )}

            {status === "checked-in" && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? " bg-gray-100 text-indigo-600 dark:bg-gray-800 dark:text-white"
                        : ""
                    } group flex w-full items-center gap-4 rounded-md px-4 py-2 text-left text-sm`}
                    onClick={() => checkout(booking)}
                  >
                    {active ? (
                      <HiOutlineArrowUpOnSquare
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    ) : (
                      <HiArrowUpOnSquare
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    )}
                    <span>Check out</span>
                  </button>
                )}
              </Menu.Item>
            )}

            <Menu.Item>
              {({ active }) => (
                <ConfirmDeletePopUp
                  resourceName={"booking"}
                  trigger={
                    <button
                      className={`${
                        active
                          ? " bg-gray-100 text-indigo-600 dark:bg-gray-800 dark:text-white"
                          : ""
                      } group flex w-full items-center gap-4 rounded-md px-4 py-2 text-left text-sm`}
                    >
                      {active ? (
                        <HiOutlineTrash
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      ) : (
                        <HiTrash className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span>Delete booking</span>
                    </button>
                  }
                  onConfirm={() => deleteBooking(booking.id)}
                  disabled={isDeleting}
                />
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </>
  );
}

export default BookingMenu;
