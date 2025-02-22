/* eslint-disable @typescript-eslint/no-explicit-any */
import { jobPostType, IBid } from "@/types/jobTypes";
import { useAppContext } from "@/utiles/AppContext";
import { useState } from "react";
import PostedJobCard from "./PostedJobCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppDialog from "@/utiles/AppDilaog";
import { MdDelete } from "react-icons/md";
import { useApproveBid, useGetMe, usePostedDelete } from "@/hooks/userHooks";
import AppSpiner from "@/utiles/AppSpiner";
import { BsEmojiSmile } from "react-icons/bs";

function MyJobs() {
  const { userData, dispatch } = useAppContext();
  const [selectedJob, setSelectedJob] = useState<jobPostType | undefined>();
  const [selectedBid, setSelectedBid] = useState<IBid | undefined>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { deletePosted, isPending } = usePostedDelete();
  const { getMe, isPending: isLoading } = useGetMe();
  const { approvebid, isPending: approvingBid } = useApproveBid();

  function handleOnProjectClick(data: jobPostType) {
    setSelectedJob(data);
    setSelectedBid(undefined);
    setOpen(true);
  }

  function handleOnBidClick(bid: IBid) {
    setSelectedBid(bid);
  }
  function handleMessageClick() {
    dispatch({
      type: "addMessages",
      payload: {
        receiverName: selectedBid?.name,
        receiverProfile: selectedBid?.profile,
        receiverEmail: selectedBid?.freelancerEmail,
      },
    });
    setTimeout(() => {
      navigate("/messages", {
        state: {
          emailId: selectedBid?.freelancerEmail,
        },
      });
    }, 300);
  }

  function handleDeleteJob() {
    deletePosted(
      { method: "job", id: selectedJob?.id },
      {
        onSettled(data) {
          if (data?.message === "SUCCESS") {
            getMe(undefined);
            setSelectedJob(undefined);
          }
        },
      }
    );
  }

  return (
    <div className="p-6">
      {(isPending || isLoading || approvingBid) && (
        <AppSpiner bgColor="bg-foreground/50" />
      )}
      {userData?.userAccountData?.postedProjects?.length === 0 && (
        <div>
          <div className="w-full h-full text-xl items-center justify-center flex flex-col gap-4 min-h-[70vh]">
            <div className="text-3xl">No jobs posted</div>
            <BsEmojiSmile className="h-20 w-20 text-constructive/40" />
          </div>
        </div>
      )}

      {userData?.userAccountData?.postedProjects?.length > 0 && (
        <div className=" w-[90vw]  border h-[80vh] flex shadow-md rounded-md">
          {/* Left Section - List of Jobs */}
          <div
            className={` lg:w-[30vw] lg:border-r ${
              !open ? "flex flex-col " : "hidden lg:flex lg:flex-col"
            } `}
          >
            {userData?.userAccountData?.postedProjects?.map(
              (jobPost: jobPostType, index: number) => (
                <PostedJobCard
                  onClick={handleOnProjectClick}
                  jobDetails={jobPost}
                  key={index}
                />
              )
            )}
          </div>

          {/* Right Section - Job Details and Bids */}
          <div
            className={` flex-col w-full h-full items-center justify-center  p-1  ${
              open ? "flex" : "hidden lg:flex"
            }`}
          >
            {!selectedJob ? (
              <div className="text-xl text-center mt-10 text-gray-600">
                Select a posted job to view details
              </div>
            ) : (
              <div className="space-y-6 h-[80vh] overflow-auto w-[90vw] lg:w-[70vw] p-2">
                {/* Job Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl justify-between flex items-center">
                      <div>{selectedJob.title}</div>
                      <div>
                        <MdDelete
                          onClick={handleDeleteJob}
                          className="text-destructive cursor-pointer bg-foreground/5 h-8 w-8 p-1 rounded-md"
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{selectedJob.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">
                        Budget: ${selectedJob.budget}
                      </Badge>
                      <div className="lg:flex gap-3 flex-col lg:flex-row">
                        {selectedJob?.skillsRequired?.map(
                          (skill: string, index: number) => {
                            return (
                              <div
                                key={index}
                                className="py-1 px-3 bg-foreground/5 rounded-full "
                              >
                                {skill}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bids Section */}
                <div>
                  <h3 className="text-xl font-semibold">Bids Received</h3>
                  {selectedJob.bids.length === 0 ? (
                    <p className="text-gray-500">No bids yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {selectedJob.bids.map((bid, index) => (
                        <li
                          key={index}
                          className={`p-3 border rounded-md flex justify-between items-center ${
                            selectedBid === bid
                              ? "bg-blue-100"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex flex-col gap-2">
                            <p className="font-medium">{bid.freelancerEmail}</p>
                            <p className="text-sm">
                              <span className="font-semibold">
                                Bid Amount:{" "}
                              </span>
                              ${bid.bidAmount}
                            </p>

                            <p className="text-sm ">
                              <span className="font-semibold">
                                Cover letter:
                              </span>{" "}
                              ${bid.coverLetter}
                            </p>
                          </div>
                          <div className="flex gap-3 lg:flex-row flex-col">
                            <Button onClick={() => handleOnBidClick(bid)}>
                              View Details
                            </Button>
                            <Button
                              disabled={bid?.status === "ACCEPTED"}
                              onClick={() => {
                                console.log(selectedJob);
                                approvebid({
                                  id: selectedJob?.id,
                                  freelancerEmailId: bid?.freelancerEmail,
                                });
                              }}
                              variant={"constructive"}
                            >
                              {bid?.status === "ACCEPTED"
                                ? "Approved"
                                : "Approve"}
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {selectedBid && (
        <AppDialog
          title="Bid Details"
          onClose={() => {
            setSelectedBid(undefined);
          }}
        >
          {selectedBid && (
            <div className="w-[80vw] lg:w-[40vw] flex flex-col gap-2">
              <div className="flex justify-end">
                <Button
                  variant={"link"}
                  onClick={() => {
                    navigate("/profile", {
                      state: {
                        emailId: selectedBid?.freelancerEmail,
                      },
                    });
                  }}
                >
                  View Profile
                </Button>
              </div>
              <p>
                <span className="font-medium">Freelancer:</span>{" "}
                {selectedBid.freelancerEmail}
              </p>
              <p>
                <span className="font-medium">Bid Amount:</span> $
                {selectedBid.bidAmount}
              </p>
              <p>
                <span className="font-medium ">Cover Letter:</span>{" "}
                {selectedBid.coverLetter}
              </p>

              {/* Message Freelancer Button */}
              <Button
                className="mt-10 flex items-center gap-2"
                onClick={handleMessageClick}
              >
                <MessageSquare className="w-5 h-5" /> Message Freelancer
              </Button>
            </div>
          )}
        </AppDialog>
      )}
    </div>
  );
}

export default MyJobs;
