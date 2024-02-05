import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useUpdateUser() {
  const { axiosPrivate } = useAxios();

  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: (data) => updateCurrentUser(axiosPrivate, data),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("User account successfully updated.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
