import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useUpdateSetting() {
  const { axiosPrivate } = useAxios();
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (data) => updateSettingApi(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Settings successfully updated.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
