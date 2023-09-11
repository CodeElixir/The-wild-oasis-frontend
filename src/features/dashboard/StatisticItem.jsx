import { cloneElement } from "react";

function StatisticItem({ icon, title, value, color = "", bgColor = "" }) {
  return (
    <div className="grid grid-cols-[min-content,_minmax(min-content,_1fr)] items-center gap-x-4 gap-y-1 bg-white px-6 py-10 dark:bg-gray-900">
      <div
        className={`row-span-full flex aspect-square items-center justify-center rounded-full p-4 ${bgColor}`}
      >
        {cloneElement(icon, { className: `h-8 w-8 ${color}` })}
      </div>
      <div className="">
        <h5 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
          {title}
        </h5>
        <p className="text-2xl font-semibold dark:text-white">{value}</p>
      </div>
    </div>
  );
}

export default StatisticItem;
