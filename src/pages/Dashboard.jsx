import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex">
          <DashboardFilter />
        </div>
        <div className="flex w-full flex-col">
          <DashboardLayout />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
