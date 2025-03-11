import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HomeNavBar from "./HomeNavBar";
import { useEffect } from "react";
import DashboardNavBar from "./DashboardNavBar";
import { useGetMe } from "@/hooks/userHooks";

function HomeLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const emailId = localStorage?.getItem("emailId");
  const { getMe } = useGetMe();

  useEffect(() => {
    if (emailId) {
      console.log(pathname)
      getMe(undefined);
      if (pathname === "/login") {
        navigate("/feed");
      } else if (pathname === "/signup") {
        navigate("/feed");
      }
    }
  }, [pathname,emailId]);

  return (
    <div className="flex flex-col w-full h-full">
      {!emailId || pathname === "/" ? (
        <div className="z-[995]">
          <HomeNavBar />
        </div>
      ) : (
        <div>
          <DashboardNavBar />
        </div>
      )}
      {<Outlet />}
    </div>
  );
}

export default HomeLayout;
