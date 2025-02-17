import { useGetMe } from "@/hooks/userHooks";
import AppSpiner from "@/utiles/AppSpiner";
import DashboardNavBar from "@/utils/DashboardNavBar";
import { useEffect } from "react";

function MyJobsMain() {
  const { isPending, getMe } = useGetMe();

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center">
      {isPending && <AppSpiner />}
      <DashboardNavBar />

      <div className="">
        <div className="border min-w-[90vw] rounded-md min-h-[80vh] flex">


            <div className="w-[30vw] border-r"></div>


        </div>
      </div>
    </div>
  );
}

export default MyJobsMain;
