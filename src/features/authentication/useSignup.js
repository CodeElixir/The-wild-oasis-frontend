import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";
import { useAxios } from "../../context/AxiosContext.jsx";

export function useSignup() {
  const { axiosPrivate } = useAxios();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (data) => signupApi(axiosPrivate, data),
    onSuccess: () => {
      toast.success("Account successfully created.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isLoading };
}

export default useSignup;
