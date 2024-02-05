import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useBooking() {
  const { axiosPrivate } = useAxios();
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(axiosPrivate, bookingId),
    retry: false,
  });

  return { isLoading, booking, error };
}
