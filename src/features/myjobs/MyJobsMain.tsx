import { useGetMe } from "@/hooks/userHooks";
import AppSpiner from "@/utiles/AppSpiner";
import DashboardNavBar from "@/utils/DashboardNavBar";
import { useEffect } from "react";
import MyJobs from "./utils/MyJobs";

function MyJobsMain() {
  const { isPending, getMe } = useGetMe();

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center">
      {isPending && <AppSpiner />}
      <DashboardNavBar />

      <MyJobs />
    </div>
  );
}

export default MyJobsMain;
