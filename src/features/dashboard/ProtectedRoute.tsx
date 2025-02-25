import DashboardNavBar from "@/utils/DashboardNavBar";
import HomeFooter from "@/utils/HomeFooter";
import { useEffect } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

function ProtectedLayout() {
  const emailId = localStorage.getItem("emailId");
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      if (emailId) {
        navigate(pathname);
      }
      else{
        if(pathname === "/signup"){
          navigate("/signup")
        }
        else{
          navigate('/login')
        }
      }
    }
  }, [pathname]);

  if (!emailId) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <DashboardNavBar />

      <div className="flex flex-col flex-grow overflow-y-auto">
        <div className="flex-grow">
          <Outlet />
        </div>
        <div className="py-5">
          <HomeFooter />
        </div>
      </div>
    </div>
  );
}

export default ProtectedLayout;
