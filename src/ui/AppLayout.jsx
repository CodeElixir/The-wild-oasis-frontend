import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[16.2rem_1fr] grid-rows-[auto_1fr] text-gray-700">
      <Header />
      <Sidebar />
      <main className="overflow-y-scroll bg-white px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
