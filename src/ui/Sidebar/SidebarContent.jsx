import Uploader from "../../data/Uploader";
import Logo from "../Logo/Logo";
import MainNav from "./MainNav";

function SidebarContent() {
  return (
    <div className="flex grow flex-col gap-y-8 border-r border-gray-200 px-6 py-7 dark:border-gray-800">
      <Logo />
      <MainNav />
      {process.env.NODE_ENV === "development" && <Uploader />}
    </div>
  );
}

export default SidebarContent;
