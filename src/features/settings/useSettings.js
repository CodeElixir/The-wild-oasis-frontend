import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useSettings() {
  const { axiosPrivate } = useAxios();
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(axiosPrivate),
  });

  return { isLoading, error, settings };
}
