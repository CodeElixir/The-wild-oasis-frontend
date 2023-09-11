import TodayList from "./TodayList";

function TodayActivity() {
  return (
    <div className="flex flex-col gap-6 overflow-hidden rounded-xl border-[1px] border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <h2 className="text-xl font-semibold">Today</h2>
      <TodayList />
    </div>
  );
}

export default TodayActivity;
