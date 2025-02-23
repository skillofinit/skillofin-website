import DashboardNavBar from "@/utils/DashboardNavBar";
import HomeFooter from "@/utils/HomeFooter";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedLayout() {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <DashboardNavBar />

      <div className="flex flex-col flex-grow overflow-y-auto">
        <div className="flex-grow">
          <Outlet />
        </div>
        <div className="py-5"><HomeFooter /></div>
      </div>
    </div>
  );
}

export default ProtectedLayout;
