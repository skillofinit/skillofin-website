/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/utiles/AppContext";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegBookmark, FaRegMoneyBillAlt } from "react-icons/fa";
import { FaBlackTie } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function LikedJobsCard() {
  const { jobs, userRole } = useAppContext();
  const navigate = useNavigate();

  function checkEmptyJobs(): boolean {
    const filterJobs = jobs?.filter(
      (job: any) => job?.status === "OPEN" && job?.projectType === "JOB"
    );

    if (userRole === "CLIENT" && filterJobs?.length > 0) {
      return true;
    }
    return false;
  }

  function getJobs() {
    const filterJobs = jobs?.filter((job: any) => job?.status === "OPEN" && job?.projectType === 'JOB');
    return filterJobs;
  }

  return (
    <div className="w-[32vw] h-[43vh] text-white border  rounded-xl overflow-auto shadow-lg transition-all hover:shadow-purple-600/50  ">
      <div className="w-full bg-gradient-to-r from-purple-700 to-pink-500 flex items-center gap-3 text-white rounded-t-xl text-xl font-semibold px-6 py-3">
        <FaRegBookmark className="text-2xl" /> Jobs for you
      </div>
      {!checkEmptyJobs() && (
        <div className="text-foreground flex flex-col items-center justify-center mt-4 text-lg">
          <BsEmojiSmile className="text-constructive w-10 h-10" />
          No jobs found
        </div>
      )}


      <Accordion type="single" collapsible className="p-3">
        {getJobs()?.map((job: any, index: number) => (
          <AccordionItem
            key={index}
            value={index.toString()}
            className="border-b border-gray-700"
          >
            <AccordionTrigger className="px-5 flex text-foreground ">
              <div className="flex items-center gap-2 w-[20vw] ">
                <FaBlackTie className="text-pink-400 text-xl" />
                <h4 className="truncate text-foreground">{job?.title}</h4>
              </div>
              <p className="text-green-400 flex items-center w-20   gap-1">
                <FaRegMoneyBillAlt className="text-lg" />$
                {job?.budget !== 0 ? job?.budget : job?.costPerHour}
              </p>
            </AccordionTrigger>
            <AccordionContent className="pb-3 flex flex-col gap-2 px-5 text-gray-400 text-sm">
              <p className="max-h-[20vh] overflow-auto">{job?.description}</p>
              {userRole === "FREELANCER" && (
                <div>
                  <Button
                    onClick={() => {
                      navigate("/jobs", {
                        state: {
                          value: job?.title,
                        },
                      });
                    }}
                    className="w-fit h-7"
                    variant={"outline"}
                  >
                    View details
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default LikedJobsCard;
