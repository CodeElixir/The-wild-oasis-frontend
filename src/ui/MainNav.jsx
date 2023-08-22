import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const classes =
  "group flex items-center gap-x-3 px-3 py-4 font-semibold text-gray-700 transition-all hover:rounded-md hover:bg-gray-100 hover:text-indigo-600";

function MainNav() {
  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col">
        <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 text-indigo-600`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineHome
                  className={`h-6 w-6 flex-shrink-0  group-hover:text-indigo-600 ${
                    isActive ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                <span>Home</span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/bookings"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 text-indigo-600`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineCalendarDays
                  className={`h-6 w-6 flex-shrink-0  group-hover:text-indigo-600 ${
                    isActive ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                <span>Bookings</span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cabins"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 text-indigo-600`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineHomeModern
                  className={`h-6 w-6 flex-shrink-0  group-hover:text-indigo-600 ${
                    isActive ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                <span>Cabins</span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/users"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 text-indigo-600`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineUsers
                  className={`h-6 w-6 flex-shrink-0  group-hover:text-indigo-600 ${
                    isActive ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                <span>Users</span>
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => {
              return isActive
                ? `${classes} rounded-md bg-gray-100 text-indigo-600`
                : `${classes}`;
            }}
          >
            {({ isActive }) => (
              <>
                <HiOutlineCog6Tooth
                  className={`h-6 w-6 flex-shrink-0  group-hover:text-indigo-600 ${
                    isActive ? "text-indigo-600" : "text-gray-400"
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
