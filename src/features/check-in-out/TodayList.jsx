import { useTodayActivity } from "./useTodayActivity";
import TodayListItem from "./TodayListItem";
import Spinner from "../../ui/Spinner/Spinner";

function TodayList() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="flex h-full flex-col overflow-auto leading-6">
      <div className="grid grid-cols-[6.2rem_1.25rem_2fr_4.375rem_7rem] items-center gap-4">
        {!isLoading ? (
          activities?.length > 0 ? (
            <>
              {activities.map((activity) => (
                <TodayListItem activity={activity} key={activity.id} />
              ))}
            </>
          ) : (
            <div className="col-span-full mt-2 text-center text-base font-medium">
              No activity today...
            </div>
          )
        ) : (
          <div className="col-span-full mt-5 place-items-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default TodayList;
