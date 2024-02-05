import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useCreateCabin() {
  const { axiosPrivate } = useAxios();
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (data) => createEditCabin(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully created.");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
