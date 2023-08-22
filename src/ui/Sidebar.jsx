import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="row-span-full flex flex-col bg-white">
      <div className="flex grow flex-col gap-y-8 border-r border-gray-200 px-6 py-7">
        <Logo />
        <MainNav />
      </div>
    </aside>
  );
}

export default Sidebar;
