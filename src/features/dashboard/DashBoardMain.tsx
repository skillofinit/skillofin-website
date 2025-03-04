import { useGetMe } from "@/hooks/userHooks";
import { useEffect, useState } from "react";
import AppSpiner from "@/utiles/AppSpiner";
import Dashboard from "./utils/Dashboard";
import LikedJobsCard from "./utils/LikedJobsCard";
import LikedProjectsCard from "./utils/LikedProjectsCard";
import Courses from "./utils/Courses";
import Loans from "./utils/Loans";
import { X } from "lucide-react";
import AllJobsOrProjects from "./utils/AllJobsOrProjects";
import { FaRegBookmark, FaRegFolderOpen } from "react-icons/fa6";

function DashBoardMain() {
  const { getMe, isPending, data } = useGetMe();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!data?.data) {
      getMe(undefined);
    }
  }, [data]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1);
  }, [step]);

  if (refresh) return <AppSpiner />;

  return (
    <div className="w-full flex lg:px-10 flex-col h-full">
      {isPending && <AppSpiner />}
      <div className="flex gap-3">
        <div className="hidden w-full lg:flex flex-col gap-3 sticky top-0 h-[87vh]">
          <LikedJobsCard seeAllClick={() => setStep(1)} />
          <LikedProjectsCard
            seeAllClick={() => {
              setStep(2);
            }}
          />
        </div>

        <div className="flex-grow overflow-auto w-full  mx-4">
          {step === 0 && <Dashboard />}
          {step === 1 && (
            <div className="flex flex-col gap-3">
              <div className="text-xl bg-primary text-background pl-4 flex items-center gap-2 justify-between p-2 rounded-md">
                <h4 className="flex items-center gap-2">
                  {" "}
                  <FaRegBookmark />
                  Jobs for you
                </h4>
                <X
                  onClick={() => {
                    setStep(0);
                  }}
                  className="h-8 w-8 p-2 bg-background/10 rounded-full text-background cursor-pointer hover:scale-105"
                />
              </div>
              <AllJobsOrProjects type="JOB" />
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-3">
              <div className="text-xl bg-primary text-background pl-4 flex items-center gap-2 justify-between p-2 rounded-md">
                <h4 className="flex items-center gap-2">
                  {<FaRegFolderOpen />}
                  Projects for you
                </h4>
                <X
                  onClick={() => {
                    setStep(0);
                  }}
                  className="h-8 w-8 p-2 bg-background/10 rounded-full text-background cursor-pointer hover:scale-105"
                />
              </div>
              <AllJobsOrProjects type="PROJECT" />
            </div>
          )}
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
