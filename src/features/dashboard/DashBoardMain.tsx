import { useGetMe } from "@/hooks/userHooks";
import { useEffect } from "react";
import AppSpiner from "@/utiles/AppSpiner";
import Dashboard from "./utils/Dashboard";
import LikedJobsCard from "./utils/LikedJobsCard";
import LikedProjectsCard from "./utils/LikedProjectsCard";

function DashBoardMain() {
  const { getMe, isPending, data } = useGetMe();

  useEffect(() => {
    if (!data?.data) {
      getMe(undefined);
    }
  }, [data]);

  return (
    <div className="w-full flex lg:px-10 flex-col  ">
      {isPending && <AppSpiner />}
      <div className="flex gap-3">
        <div className="hidden   gap-3 h-[90vh]  lg:flex flex-col">
          <LikedJobsCard />
          <LikedProjectsCard />
        </div>
        <div className="w-fit ">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default DashBoardMain;
