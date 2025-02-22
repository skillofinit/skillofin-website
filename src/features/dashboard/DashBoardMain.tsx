import { useGetMe } from "@/hooks/userHooks";
import { useEffect } from "react";
import AppSpiner from "@/utiles/AppSpiner";
import Dashboard from "./utils/Dashboard";

function DashBoardMain() {
  const { getMe, isPending, data } = useGetMe();

  useEffect(() => {
    if (!data?.data) {
      getMe(undefined);
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col  ">
      {isPending && <AppSpiner />}
      <Dashboard />
    </div>
  );
}

export default DashBoardMain;
