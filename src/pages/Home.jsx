import { Navigate, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  return <Navigate to={from} replace />;
};

export default Home;
