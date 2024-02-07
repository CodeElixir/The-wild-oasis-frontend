import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import Booking from "../pages/Booking";
import Checkin from "../pages/Checkin";
import Cabins from "../pages/Cabins";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Account from "../pages/Account";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../ui/AppLayout";
import useCsrf from "../hooks/useCsrf.js";
import PersistLogin from "../PersistLogin.jsx";

function AppRoutes() {
  const getCsrf = useCsrf();

  useEffect(() => {
    if (!Cookies.get("XSRF-TOKEN")) {
      (async () => await getCsrf())();
    }
  }, [getCsrf]);

  return (
    <BrowserRouter basename={"/the-wild-oasis"}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to={"dashboard"} replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
