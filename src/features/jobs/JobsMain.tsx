/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jobPostType } from "@/types/jobTypes";
import {
  FiBriefcase,
  FiDollarSign,
  FiArrowRight,
  FiSearch,
} from "react-icons/fi";
import FreelancerJobDialog from "./utils/FreelancerJobDialog";
import AppSpiner from "@/utiles/AppSpiner";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { BsEmojiSmile } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdClear } from "react-icons/md";
import { useGetJobs } from "@/hooks/jobHooks";

function FreelancerJobs() {
  const [selectedJob, setSelectedJob] = useState<jobPostType | null>(null);
  const { getJobs, data: jobListings, isPending } = useGetJobs();
  const [jobs, setJobs] = useState<jobPostType[] | undefined>();
  const [searchedValue, setSearchedValue] = useState("");
  const { state } = useLocation();
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);

  useEffect(() => {
    if (!jobListings)
      getJobs(undefined, {
        onSuccess(data) {
          if (data?.message === "SUCCESS") {
            setJobs(data?.jobs);
          }
        },
      });
  }, []);

  useEffect(() => {
    if (state?.value) {
      setSearchedValue(state?.value);
      handleSearch();
    }
  }, [jobListings]);

  function handleSearch() {
    if (!selectedJobType && !searchedValue) {
      setJobs(jobListings?.jobs);
      return;
    }

    const temp: any = [];

    if (searchedValue && !selectedJobType) {
      for (let index = 0; index < jobListings?.jobs?.length; index++) {
        if (
          jobListings?.jobs[index]?.title
            ?.toLowerCase()
            .trim()
            .includes(searchedValue?.trim().toLowerCase())
        ) {
          temp.push(jobListings?.jobs[index]);
        }
      }
    }
    if (!searchedValue && selectedJobType) {
      for (let index = 0; index < jobListings?.jobs?.length; index++) {
        if (
          jobListings?.jobs[index]?.projectType ===
          (selectedJobType === "regularJob" ? "JOB" : "PROJECT")
        ) {
          temp.push(jobListings?.jobs[index]);
        }
      }
    }
    if (searchedValue && selectedJobType) {
      for (let index = 0; index < jobListings?.jobs?.length; index++) {
        if (
          jobListings?.jobs[index]?.title
            ?.toLowerCase()
            .trim()
            .includes(searchedValue?.trim().toLowerCase()) &&
          jobListings?.jobs[index]?.projectType ===
            (selectedJobType === "regularJob" ? "JOB" : "PROJECT")
        ) {
          temp.push(jobListings?.jobs[index]);
        }
      }
    }
    setJobs(temp);
  }


  return (
    <div className="w-full">
      {isPending && <AppSpiner />}
      {selectedJob && (
        <FreelancerJobDialog
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
      {jobListings?.jobs &&
        jobListings?.jobs?.filter((job: any) => job.status !== "IN_PROGRESS")
          ?.length === 0 && (
          <div className="flex flex-col gap-4 items-center justify-center min-h-[60vh] w-full">
            <div className="text-3xl">No jobs found</div>
            <BsEmojiSmile className="h-20 w-20 text-constructive/40" />
          </div>
        )}
      {jobListings?.jobs &&
        jobListings?.jobs?.filter((job: any) => job.status !== "IN_PROGRESS")
          ?.length > 0 && (
          <div className="flex flex-col gap-6 items-center">
            <div className="items-center flex flex-col lg:flex-row gap-2 lg:gap-6 mt-5">
              <Input
                iconName="search"
                placeholder="Search"
                className="w-[80vw] lg:w-[30vw]"
                value={searchedValue}
                onChange={(e) => {
                  setSearchedValue(e?.target?.value);
                }}
                clearCallBack={() => {
                  setSearchedValue("");
                  setJobs(jobListings?.jobs);
                }}
              />
              <div className="-ml-2 -mt-4 w-[93vw] lg:w-[20vw]">
                <Select
                  value={selectedJobType ?? ""}
                  onValueChange={(value) => {
                    setSelectedJobType(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Job Type</SelectLabel>
                      <SelectItem value="regularJob">Regular Job</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant={"outline"}
                  title="Clear search"
                  onClick={() => {
                    setSearchedValue("");
                    setJobs(jobListings?.jobs);
                    setSelectedJobType(null);
                  }}
                  className="px-2 h-8 lg:-mt-4 flex  items-center"
                >
                  <div className="flex items-center gap-4">
                    Clear <MdClear className="mt-[2px]" />
                  </div>
                </Button>
                <Button
                  title="Search"
                  onClick={handleSearch}
                  className="px-2 h-8 lg:-mt-4 flex  items-center"
                >
                  <div className="flex items-center gap-4">
                    Search <FiSearch className="mt-[2px]" />
                  </div>
                </Button>
              </div>
            </div>
            {jobs
              ?.filter((job) => job.status !== "IN_PROGRESS")
              ?.map((job: jobPostType) => (
                <Card
                  key={job.id}
                  className="hover:shadow-xl transition-shadow duration-300 cursor-pointer w-[90vw] lg:w-[50vw]"
                  onClick={() => setSelectedJob(job)}
                >
                  <CardHeader className="flex  justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <FiBriefcase className="w-5 h-5" />
                      {job.title}
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
                        {job?.skillsRequired?.map(
                          (skill: string, index: number) => {
                            return (
                              <div
                                key={index}
                                className="px-2 py-1 rounded-full bg-foreground/5"
                              >
                                {skill}
                              </div>
                            );
                          }
                        )}
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
        )}
    </div>
  );
}

export default FreelancerJobs;
