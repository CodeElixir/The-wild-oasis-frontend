import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useTodayActivity() {
  const { axiosPrivate } = useAxios();
  const { isLoading, data: activities } = useQuery({
    queryFn: () => getStaysTodayActivity(axiosPrivate),
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
}
