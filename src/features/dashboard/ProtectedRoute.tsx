import { Outlet, Navigate } from "react-router-dom";

function ProtectedLayout() {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
