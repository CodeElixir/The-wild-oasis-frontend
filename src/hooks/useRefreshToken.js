import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useAxios } from "../context/AxiosContext.jsx";

const useRefreshToken = () => {
  const { axiosPublic } = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const { setAuth } = useAuth();
  return async () => {
    try {
      const response = await axiosPublic.post("/auth/refresh-token");
      setAuth((prev) => {
        return {
          ...prev,
          user: response.data.user,
          accessToken: response.data.accessToken,
        };
      });
      return response.data;
    } catch (e) {
      navigate("/login", {
        replace: true,
        state: {
          from: location,
        },
      });
    }
  };
};

export default useRefreshToken;
