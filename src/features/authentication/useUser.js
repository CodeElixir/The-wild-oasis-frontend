import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext.jsx";
import { getCurrentUser } from "../../services/apiAuth";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useUser() {
  const { auth } = useAuth();
  const { axiosPrivate } = useAxios();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(axiosPrivate, auth?.user?.id),
  });

  return {
    user,
    isAuthenticated: user !== undefined && user !== null,
    isLoading,
  };
}
