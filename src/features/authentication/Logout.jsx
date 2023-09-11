import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Button from "../../ui/Button/Button";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/Spinner/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <Button
      secondary
      className="!rounded-full !p-2 text-indigo-600 !shadow-none !ring-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 dark:focus:ring-offset-gray-200"
      disabled={isLoading}
      disabledStyles="!bg-white"
      onClick={logout}
      icon={isLoading ? <SpinnerMini /> : null}
    >
      {!isLoading && <HiArrowRightOnRectangle className="h-5 w-5" />}
    </Button>
  );
}

export default Logout;
