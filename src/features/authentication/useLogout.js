import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";
import { useAxios } from "../../context/AxiosContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function useLogout() {
  const { axiosPrivate } = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutApi(axiosPrivate),
    onSuccess: () => {
      setAuth({});
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { logout, isLoading };
}

export default useLogout;
