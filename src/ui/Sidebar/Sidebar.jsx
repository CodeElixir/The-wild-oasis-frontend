import SidebarContent from "./SidebarContent";

function Sidebar() {
  return (
    <aside className="row-span-full hidden flex-col bg-white dark:bg-gray-900 lg:flex">
      <SidebarContent />
    </aside>
  );
}

export default Sidebar;
