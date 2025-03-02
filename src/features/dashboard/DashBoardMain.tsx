import { useGetMe } from "@/hooks/userHooks";
import { useEffect } from "react";
import AppSpiner from "@/utiles/AppSpiner";
import Dashboard from "./utils/Dashboard";
import LikedJobsCard from "./utils/LikedJobsCard";
import LikedProjectsCard from "./utils/LikedProjectsCard";
import Courses from "./utils/Courses";
import Loans from "./utils/Loans";

function DashBoardMain() {
  const { getMe, isPending, data } = useGetMe();

  useEffect(() => {
    if (!data?.data) {
      getMe(undefined);
    }
  }, [data]);

  return (
    <div className="w-full flex lg:px-10 flex-col h-full">
      {isPending && <AppSpiner />}
      <div className="flex">
        <div className="hidden w-full lg:flex flex-col gap-3 sticky top-0 h-[87vh]">
          <LikedJobsCard />
          <LikedProjectsCard />
        </div>

        <div className="flex-grow overflow-auto w-full lg:-ml-2 ">
          <Dashboard />
        </div>
        <div className="hidden lg:flex w-full flex-col gap-3 sticky top-0 h-[87vh]">
          <Courses />
          <Loans />
        </div>
      </div>
    </div>
  );
}

export default DashBoardMain;

