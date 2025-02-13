import DashBoardHighlightCard from "./utils/DashBoardHighlightCard";
import DashboardNavBar from "../../utils/DashboardNavBar";
import { useGetMe } from "@/hooks/userHooks";
import { useEffect } from "react";
import AppSpiner from "@/utiles/AppSpiner";

function DashBoardMain() {
  const { getMe, isPending, data } = useGetMe();

  useEffect(() => {
    if (!data?.data) {
      getMe();
    }
  }, [data]);

  return (
    <div className="w-full">
      {isPending && <AppSpiner />}
      <DashboardNavBar />
      <div className="px-4">
        <div className="pl-10 mt-10">
          <DashBoardHighlightCard />
        </div>
      </div>
    </div>
  );
}

export default DashBoardMain;
