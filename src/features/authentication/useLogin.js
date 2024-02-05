import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useAxios } from "../../context/AxiosContext.jsx";
import useRefreshToken from "../../hooks/useRefreshToken.js";
import { addInterceptors } from "../../services/axiosPrivate.js";

export function useLogin() {
  const { axiosPublic } = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();
  const refresh = useRefreshToken();

  const from = location.state?.from?.pathname || "/dashboard";

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi(axiosPublic, { email, password }),
    onSuccess: (data) => {
      addInterceptors(data, refresh);
      setAuth(data);
      queryClient.setQueryData(["user"], data.user);
      navigate(from, { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isLoading };
}
