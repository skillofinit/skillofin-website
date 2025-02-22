import DashboardNavBar from "@/utils/DashboardNavBar";
import HomeFooter from "@/utils/HomeFooter";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedLayout() {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col w-full h-full justify-between  overflow-auto ">
      <DashboardNavBar />

      <div className=" w-full h-full flex flex-row ">
        <div className="w-full h-full flex flex-col">
          <div className="flex w-full h-full pb-5 ">
            <Outlet />
          </div>
          <div className="pb-3">
            <HomeFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedLayout;
