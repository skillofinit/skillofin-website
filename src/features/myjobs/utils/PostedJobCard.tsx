/* eslint-disable @typescript-eslint/no-explicit-any */
import { jobPostType } from "@/types/jobTypes";
import { timeAgo, truncateString } from "@/utiles/appUtils";

interface PostedJobCardInterface {
  jobDetails: jobPostType;
  onClick: (data: jobPostType) => void;
}

function PostedJobCard({ jobDetails, onClick }: PostedJobCardInterface) {
  return (
    <div
      className="w-full  border-b  p-4 flex flex-col gap-3 cursor-pointer"
      onClick={() => {
        onClick(jobDetails);
      }}
    >
      <div className="w-full flex items-center justify-between">
        <div className="text-xl font-semibold">{jobDetails?.title}</div>
        <div>{`${
          jobDetails?.budget !== 0
            ? jobDetails?.budget
            : jobDetails?.costPerHour
        } ${
          jobDetails?.costPerHour ? "USD / hr" : "USD -  Fixed price"
        } `}</div>
      </div>
      <p className="text-md">
        {jobDetails?.description && jobDetails?.description?.length > 70
          ? truncateString(jobDetails?.description, 70)
          : jobDetails?.description}
      </p>
      <div className="w-fulll flex justify-between">
        <div className="flex gap-3 items-center">
          {jobDetails?.skillsRequired
            ?.slice(0, 2) 
            ?.map((skill: string, index: number) => {
              return (
                <div
                  key={index}
                  className="px-2 py-1 rounded-full bg-foreground/5"
                >
                  {skill}
                </div>
              );
            })}
          <div>{jobDetails?.skillsRequired?.length > 2 && "More.."}</div>
        </div>
        <p>{timeAgo(jobDetails?.createdAt as any)}</p>
      </div>
    </div>
  );
}

export default PostedJobCard;
