import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Spinner from "./ui/Spinner/Spinner.jsx";
import useRefreshToken from "./hooks/useRefreshToken.js";
import { addInterceptors } from "./services/axiosPrivate.js";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const data = await refresh();
        addInterceptors(data, refresh);
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth?.accessToken, refresh]);

  return <>{isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
