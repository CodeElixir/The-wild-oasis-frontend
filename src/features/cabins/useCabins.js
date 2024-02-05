import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCabins } from "../../services/apiCabins";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useCabins() {
  const { axiosPrivate } = useAxios();
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => getCabins(axiosPrivate),
  });

  const [searchParams] = useSearchParams();

  // Filtering
  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins = cabins?.filter((cabin) => {
    if (filterValue === "all") {
      return true;
    } else if (filterValue === "no-discount") {
      return cabin.discount === 0;
    } else if (filterValue === "with-discount") {
      return cabin.discount > 0;
    } else return true;
  });

  // Sorting
  const sortByValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );

  return { isLoading, cabins: sortedCabins, error };
}
