import { useGetMe } from "@/hooks/userHooks";
import AppSpiner from "@/utiles/AppSpiner";
import { useEffect } from "react";
import MyJobs from "./utils/MyJobs";

function MyJobsMain() {
  const { isPending, getMe } = useGetMe();

  useEffect(() => {
    getMe(undefined);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center">
      {isPending && <AppSpiner />}

      <MyJobs />
    </div>
  );
}

export default MyJobsMain;
