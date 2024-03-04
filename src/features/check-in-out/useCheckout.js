import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useCheckout() {
  const { axiosPrivate } = useAxios();
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (booking) =>
      updateBooking(axiosPrivate, {
        ...booking,
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error while checking out"),
  });
  return { checkout, isCheckingOut };
}
