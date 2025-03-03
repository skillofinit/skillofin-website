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
  const { jobs, userRole, userData } = useAppContext();
  const navigate = useNavigate();

  function getJobs() {
    const filterJobs = jobs?.filter(
      (job: any) => job?.status === "OPEN" && job?.projectType === "JOB"
    );
    console.log(filterJobs);
    console.log(jobs);

    if (userRole === "CLIENT" || userRole === "BANK") {
      return filterJobs;
    } else {
      if (
        !userData?.userAccountData?.skills ||
        userData?.userAccountData?.skills?.length === 0
      ) {
        return filterJobs;
      }
      return filterJobs?.filter((job: any) => {
        const jobContent = (job?.title + " " + job?.description)
          ?.toLowerCase()
          ?.trim();

        const hasMatchingSkill = userData?.userAccountData?.skills?.some(
          (skill: any) => {
            const skillName = skill?.name?.toLowerCase()?.trim();

            const skillWords = skillName.split(" ");

            return skillWords.some((skillWord: any) => {
              const found = jobContent.includes(skillWord.toLowerCase());

              return found;
            });
          }
        );

        return hasMatchingSkill;
      });
    }
  }

  return (
    <div className="w-full h-[43vh] text-white border  rounded-xl overflow-auto shadow-md  transition-all hover:shadow-purple-600/50  ">
      <div className="w-full bg-gradient-to-r from-pink-100 to-purple-200  flex items-center gap-3 text-black rounded-t-xl text-xl font-semibold px-6 py-3 justify-between">
        <div className="flex items-center gap-2">
          <FaRegBookmark className="text-2xl" />
          {userRole === "FREELANCER" ? "Jobs for you" : "Recent Jobs"}
        </div>
        {getJobs()?.length > 0 && getJobs() && (
          <div>
            <Button className="h-7">See all</Button>
          </div>
        )}
      </div>
      {(getJobs()?.length === 0 || !getJobs()) && (
        <div className="text-foreground flex flex-col items-center justify-center mt-4 text-lg">
          <BsEmojiSmile className="text-primary  w-10 h-10  h-[30vh] justify-center" />
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
              <div className="flex items-center gap-2 ">
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
