import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useEditCabin() {
  const { axiosPrivate } = useAxios();
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: (data) => createEditCabin(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully edited.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
