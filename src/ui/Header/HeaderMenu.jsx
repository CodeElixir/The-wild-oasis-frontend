import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import Button from "../Button/Button";
import Logout from "../../features/authentication/Logout";

function HeaderMenu() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };

  return (
    <ul className="flex items-center gap-1">
      <li>
        <Button
          secondary
          className="!rounded-full !p-2 text-indigo-600 !shadow-none !ring-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 dark:focus:ring-offset-gray-200"
          disabledStyles="!bg-gray-200"
          onClick={() => navigate("/account")}
          icon={<HiOutlineUser className="h-5 w-5" />}
        />
      </li>
      <li>
        <Button
          secondary
          className="!rounded-full !p-2 text-indigo-600 !shadow-none !ring-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 dark:focus:ring-offset-gray-200"
          disabledStyles="!bg-white"
          onClick={handleDarkModeToggle}
          icon={
            isDarkMode ? (
              <HiOutlineMoon className="h-5 w-5" />
            ) : (
              <HiOutlineSun className="h-5 w-5" />
            )
          }
        />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
