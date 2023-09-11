import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[auto_1fr] text-gray-700 dark:text-gray-200 lg:grid-cols-[16.2rem_1fr]">
      <Header />
      <Sidebar />
      <main className="overflow-y-auto bg-white px-8 py-10 dark:bg-gray-900 dark:text-gray-200">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
