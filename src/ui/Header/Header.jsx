import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../../features/authentication/UserAvatar";
import Hamburger from "../Sidebar/Hamburger";
import { SidebarDialogProvider } from "../../context/SidebarContext";

function Header() {
  return (
    <header className="flex h-16 items-center justify-between gap-6 border-b-[1px] border-b-gray-200 bg-white px-8 text-gray-600 shadow-sm dark:border-b-gray-800 dark:bg-gray-900 dark:text-gray-200 lg:justify-end">
      <SidebarDialogProvider>
        <Hamburger />
      </SidebarDialogProvider>
      <div className="flex items-center gap-6">
        <UserAvatar />
        <HeaderMenu />
      </div>
    </header>
  );
}

export default Header;
