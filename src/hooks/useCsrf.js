import { getCsrf } from "../services/apiAuth.js";
import { useAxios } from "../context/AxiosContext.jsx";

const useCsrf = () => {
  const { axiosPublic } = useAxios();

  return async () => {
    return await getCsrf(axiosPublic);
  };
};

export default useCsrf;
