/* eslint-disable @typescript-eslint/no-explicit-any */
import { jobPostType } from "@/types/jobTypes";
import { useAppContext } from "@/utiles/AppContext";
import { useEffect, useState } from "react";
import PostedJobCard from "./PostedJobCard";

function MyJobs() {
  const { userData } = useAppContext();
  const [postedProjects, setPostedProjets] = useState<any>();

  useEffect(() => {
    setPostedProjets(userData?.userAccountData?.postedProjects ?? []);
  }, []);

  return (
    <div className="">
      <div className="border min-w-[90vw] rounded-md min-h-[80vh] flex">
        <div className="w-[30vw] border-r">
          {userData?.userAccountData?.postedProjects?.map(
            (jobPost: jobPostType, index: number) => {
              return <PostedJobCard jobDetails={jobPost} key={index} />;
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default MyJobs;
