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
  const { jobs, userRole } = useAppContext();
  const navigate = useNavigate();

  function checkEmptyProjects(): boolean {
    const filterJobs = jobs?.filter(
      (job: any) => job?.status === "OPEN" && job?.projectType === "PROJECT"
    );

    if (userRole === "CLIENT" && filterJobs?.length > 0) {
      return true;
    }

    return false;
  }
  function getProjects() {
    const filterJobs = jobs?.filter(
      (job: any) => job?.status === "OPEN" && job?.projectType === "PROJECT"
    );
    return filterJobs;
  }

  return (
    <div className="w-[32vw] h-[43vh] text-white border  rounded-xl overflow-auto shadow-lg transition-all hover:shadow-purple-500/50 ">
      <div className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center gap-3 text-white rounded-t-xl text-xl font-semibold px-6 py-3">
        <FaRegFolderOpen className="text-2xl" />
        Projects for you
      </div>
      {!checkEmptyProjects() && (
        <div className="text-foreground flex flex-col items-center justify-center mt-4 text-lg">
          <BsEmojiSmile className="text-constructive w-10 h-10" />
          No projects found
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
              <div className="flex items-center gap-2 w-[20vw]">
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
