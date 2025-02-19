import HomeFooter from "@/utils/HomeFooter";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedLayout() {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="min-h-[90vh] w-full h-full">
        <Outlet />
      </div>
      <div className="pb-3">
        <HomeFooter />
      </div>
    </div>
  );
}

export default ProtectedLayout;
