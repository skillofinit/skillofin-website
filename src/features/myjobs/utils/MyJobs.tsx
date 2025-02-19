/* eslint-disable @typescript-eslint/no-explicit-any */
import { jobPostType, IBid } from "@/types/jobTypes";
import { useAppContext } from "@/utiles/AppContext";
import { useState } from "react";
import PostedJobCard from "./PostedJobCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyJobs() {
  const { userData, dispatch } = useAppContext();
  const [selectedJob, setSelectedJob] = useState<jobPostType | undefined>();
  const [selectedBid, setSelectedBid] = useState<IBid | undefined>();
  const navigate = useNavigate();

  function handleOnProjectClick(data: jobPostType) {
    setSelectedJob(data);
    setSelectedBid(undefined);
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
    setTimeout(()=>{
      navigate("/messages",{
        state:{
          emailId:selectedBid?.freelancerEmail
        }
      })
    },300)
  }

  return (
    <div className="p-6">
      <div className=" min-w-[90vw]  border min-h-[80vh] flex shadow-md rounded-md">
        {/* Left Section - List of Jobs */}
        <div className="w-[30vw] border-r ">
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
        <div className="flex flex-col w-full p-6">
          {!selectedJob ? (
            <div className="text-xl text-center mt-10 text-gray-600">
              Select a posted job to view details
            </div>
          ) : (
            <div className="space-y-6">
              {/* Job Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {selectedJob.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{selectedJob.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">
                      Budget: ${selectedJob.budget}
                    </Badge>
                    <Badge variant="outline">
                      Status: {selectedJob.status}
                    </Badge>
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
                        className={`p-3 border rounded-md flex justify-between items-center cursor-pointer ${
                          selectedBid === bid
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleOnBidClick(bid)}
                      >
                        <div>
                          <p className="font-medium">{bid.freelancerEmail}</p>
                          <p className="text-sm text-gray-500">
                            Bid Amount: ${bid.bidAmount}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            Status: {bid.status}{" "}
                            {bid.status === "ACCEPTED" ? (
                              <CheckCircle className="text-green-500 w-4 h-4" />
                            ) : (
                              <XCircle className="text-red-500 w-4 h-4" />
                            )}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Selected Bid Details */}
              {selectedBid && (
                <Card>
                  <CardHeader>
                    <CardTitle>Bid Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <span className="font-medium">Freelancer:</span>{" "}
                      {selectedBid.freelancerEmail}
                    </p>
                    <p>
                      <span className="font-medium">Bid Amount:</span> $
                      {selectedBid.bidAmount}
                    </p>
                    <p>
                      <span className="font-medium">Cover Letter:</span>{" "}
                      {selectedBid.coverLetter}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {selectedBid.status}
                    </p>

                    {/* Message Freelancer Button */}
                    <Button
                      className="mt-4 flex items-center gap-2"
                      onClick={handleMessageClick}
                    >
                      <MessageSquare className="w-5 h-5" /> Message Freelancer
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyJobs;
