import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useSidebarDialog } from "../../context/SidebarContext";

const classes =
  "group flex items-center gap-x-3 px-3 py-4 font-semibold text-gray-700 hover:rounded-md hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white";

function MainNav() {
  const { setOpen } = useSidebarDialog();

  const handleMenuItemClick = () => {
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col space-y-1">
        <li>
          <NavLink
            onClick={handleMenuItemClick}
            to="/dashboard"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineHome
                  className={`h-6 w-6 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-white ${
                    isActive
                      ? "text-indigo-600 dark:text-white"
                      : "text-gray-400"
                  }`}
                />
                <span>Home</span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleMenuItemClick}
            to="/bookings"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineCalendarDays
                  className={`h-6 w-6 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-white ${
                    isActive
                      ? "text-indigo-600 dark:text-white"
                      : "text-gray-400"
                  }`}
                />
                <span>Bookings</span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleMenuItemClick}
            to="/cabins"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineHomeModern
                  className={`h-6 w-6 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-white ${
                    isActive
                      ? "text-indigo-600 dark:text-white"
                      : "text-gray-400"
                  }`}
                />
                <span>Cabins</span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleMenuItemClick}
            to="/users"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineUsers
                  className={`h-6 w-6 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-white ${
                    isActive
                      ? "text-indigo-600 dark:text-white"
                      : "text-gray-400"
                  }`}
                />
                <span>Users</span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleMenuItemClick}
            to="/settings"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineCog6Tooth
                  className={`h-6 w-6 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-white ${
                    isActive
                      ? "text-indigo-600 dark:text-white"
                      : "text-gray-400"
                  }`}
                />
                <span>Settings</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
