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
import { FaRegFolderOpen, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LikedProjectsCard() {
  const { jobs, userRole, userData } = useAppContext();
  const navigate = useNavigate();

  function getProjects() {
    const filterProjects = jobs?.filter(
      (job: any) => job?.status === "OPEN" && job?.projectType === "PROJECT"
    );

    if (userRole === "CLIENT" || userRole === "BANK") {
      return filterProjects;
    } else {
      if (
        !userData?.userAccountData?.skills ||
        userData?.userAccountData?.skills?.length === 0
      ) {
        return filterProjects;
      }
      return filterProjects?.filter((project: any) => {
        const projectContent = (project?.title + " " + project?.description)
          ?.toLowerCase()
          ?.trim();

        const hasMatchingSkill = userData?.userAccountData?.skills?.some(
          (skill: any) => {
            const skillName = skill?.name?.toLowerCase()?.trim();

            const skillWords = skillName.split(" ");

            return skillWords.some((skillWord: any) => {
              const found = projectContent.includes(skillWord.toLowerCase());
              return found;
            });
          }
        );

        return hasMatchingSkill;
      });
    }
  }

  return (
    <div className="w-full h-[43vh] text-white border  rounded-xl overflow-auto shadow-md transition-all hover:shadow-purple-500/50 ">
      <div className="w-full bg-gradient-to-r from-green-100 to-teal-100 flex items-center gap-3 text-black rounded-t-xl text-xl font-semibold px-6 py-3">
        <FaRegFolderOpen className="text-2xl" />
        {userRole === "FREELANCER" ? "Projects for you" : "Recent Projects"}
      </div>
      {(getProjects()?.length === 0 || !getProjects()) && (
        <div className="text-foreground flex flex-col items-center  mt-4 text-lg justify-between">
          <div className="flex items-center gap-2 h-[30vh] justify-center">
            <BsEmojiSmile className="text-primary  w-10 h-10" />
            No projects found
          </div>
          {getProjects()?.length > 0 && getProjects() && (
            <div>
              <Button className="h-7">See all</Button>
            </div>
          )}
        </div>
      )}
      <Accordion type="single" collapsible className="p-3">
        {getProjects()?.map((job: any, index: number) => (
          <AccordionItem
            key={index}
            value={index.toString()}
            className="border-b border-gray-600"
          >
            <AccordionTrigger className="px-5 flex justify-between items-center text-foreground ">
              <div className="flex items-center gap-2">
                <FaRegFolderOpen className="text-indigo-400 text-xl" />
                <h4 className="truncate text-foreground">{job?.title}</h4>
              </div>
              <p className="text-green-400 flex items-center w-20">
                <FaDollarSign />$
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

export default LikedProjectsCard;
