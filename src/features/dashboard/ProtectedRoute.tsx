import { useGetMe } from "@/hooks/userHooks";
import { useAppContext } from "@/utiles/AppContext";
import DashboardNavBar from "@/utils/DashboardNavBar";
import HomeFooter from "@/utils/HomeFooter";
import MobileBottomNavBar from "@/utils/MobileBottomNavBar";
import { useEffect } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

function ProtectedLayout() {
  const emailId = localStorage.getItem("emailId");
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const { pathname } = useLocation();
  const { getMe } = useGetMe();

  useEffect(() => {
    if (localStorage?.getItem("emailId")) getMe(undefined);
  }, [pathname]);

  useEffect(() => {
    if (pathname) {
      if (emailId) {
        navigate(pathname);
      } else {
        if (pathname === "/signup") {
          navigate("/signup");
        } else {
          navigate("/login");
        }
      }
    }

    switch (pathname) {
      case "/feed":
        handleSetMobileMenuIndex(0);
        break;

      case "/jobs":
        handleSetMobileMenuIndex(1);
        break;

      case "/myjobs":
        handleSetMobileMenuIndex(1);
        break;

      case "/messages":
        handleSetMobileMenuIndex(2);
        break;

      case "/myprofile":
        handleSetMobileMenuIndex(3);
        break;
    }
  }, [pathname]);

  function handleSetMobileMenuIndex(index: number) {
    dispatch({
      type: "setMobileBottomMenu",
      payload: index,
    });
  }

  if (!emailId) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col w-full h-screen relative">
      <DashboardNavBar />

      <div className="flex flex-col flex-grow overflow-y-auto">
        <div className="flex-grow mb-14 lg:mb-0">
          <Outlet />
        </div>
        <div className="py-5 hidden lg:flex">
          <HomeFooter />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 z-[999] w-full">
        <MobileBottomNavBar />
      </div>
    </div>
  );
}

export default ProtectedLayout;
