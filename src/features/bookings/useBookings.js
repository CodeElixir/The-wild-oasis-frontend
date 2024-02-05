import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useBookings() {
  const { axiosPrivate } = useAxios();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filtering
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // Sorting
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = {
    field,
    direction,
  };

  // Pagination
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page"), 10)
    : 1;

  // Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings(axiosPrivate, { filter, sortBy, currentPage }),
  });

  // Pre-fetching
  const totalPages = Math.ceil(count / PAGE_SIZE);

  if (currentPage < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getBookings(axiosPrivate, {
          filter,
          sortBy,
          currentPage: currentPage + 1,
        }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getBookings(axiosPrivate, {
          filter,
          sortBy,
          currentPage: currentPage - 1,
        }),
    });
  }

  return { isLoading, bookings, count, error };
}
