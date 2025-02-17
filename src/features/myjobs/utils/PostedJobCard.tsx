import { jobPostType } from "@/types/jobTypes";
import { timeAgo, truncateString } from "@/utiles/appUtils";

interface PostedJobCardInterface {
  jobDetails: jobPostType;
}

function PostedJobCard({ jobDetails }: PostedJobCardInterface) {
  return (
    <div className="w-full  border-b  p-4 flex flex-col gap-3 cursor-pointer">
      <div className="w-full flex items-center justify-between">
        <div className="text-2xl font-semibold">{jobDetails?.title}</div>
        <div>{`${jobDetails?.budget} ${
          jobDetails?.costPerHour ? "USD / hr" : "USD -  Fixed price"
        } `}</div>
      </div>
      <p className="text-lg">
        {jobDetails?.description && jobDetails?.description?.length > 70
          ? truncateString(jobDetails?.description, 70)
          : jobDetails?.description}
      </p>
      <div className="w-fulll flex justify-end">
        <p>{timeAgo(jobDetails?.createdAt)}</p>
      </div>
    </div>
  );
}

export default PostedJobCard;
