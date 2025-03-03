/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FreelancerJobDialog from "@/features/jobs/utils/FreelancerJobDialog";
import { jobPostType } from "@/types/jobTypes";
import { useAppContext } from "@/utiles/AppContext";
import { useState } from "react";
import { FiArrowRight, FiBriefcase, FiDollarSign } from "react-icons/fi";

interface AllJobsOrProjectsInterface {
  type: "JOB" | "PROJECT";
}

function AllJobsOrProjects({ type }: AllJobsOrProjectsInterface) {
  const { jobs } = useAppContext();
  const [selectedJob, setSelectedJob] = useState<jobPostType | null>(null);

  return (
    <div>
      {selectedJob && (
        <FreelancerJobDialog
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {jobs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.filter(
          (job: any) =>
            job.status !== "IN_PROGRESS" && job?.projectType === type
        )
        ?.map((job: jobPostType, index: number) => (
          <Card
            key={index}
            className="hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full"
            onClick={() => setSelectedJob(job)}
          >
            <CardHeader className="flex  justify-between">
              <CardTitle className=" font-semibold justify-between flex items-center gap-2">
                <div className="flex items-center gap-2 text-lg">
                  <FiBriefcase className="w-5 h-5" />
                  {job.title}
                </div>
                <div className=" flex items-center gap-2">
                  <p className="text-foreground/70 font-medium">
                    {`Project Type :`}
                  </p>
                  <p>{job?.projectType}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {job.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <FiDollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">
                  Budget: $
                  {`${
                    job.budget
                      ? `${job.budget} - Fixed price`
                      : `${job.costPerHour} /Hr`
                  }`}
                </span>
              </div>
              <div className="mt-6 flex justify-between ">
                <div className="hidden lg:flex gap-3 items-center">
                  {job?.skillsRequired?.map((skill: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className="px-2 py-1 rounded-full bg-foreground/5"
                      >
                        {skill}
                      </div>
                    );
                  })}
                </div>

                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(job);
                  }}
                >
                  View &amp; Bid <FiArrowRight className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

export default AllJobsOrProjects;
