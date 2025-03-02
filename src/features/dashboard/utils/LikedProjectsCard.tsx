/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppContext } from "@/utiles/AppContext";
import { FaRegFolderOpen, FaDollarSign } from "react-icons/fa";

function LikedProjectsCard() {
  const { jobs } = useAppContext();

  return (
    <div className="w-[32vw] h-[50vh] text-white border  rounded-xl overflow-auto shadow-lg transition-all hover:shadow-purple-500/50 ">
      <div className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center gap-3 text-white rounded-t-xl text-xl font-semibold px-6 py-3">
        <FaRegFolderOpen className="text-2xl" />Projects for you
      </div>
      <Accordion type="single" collapsible className="p-3">
        {jobs?.map((job: any, index: number) => (
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
                <FaDollarSign  />$
                {job?.budget !== 0 ? job?.budget : job?.costPerHour}
              </p>
            </AccordionTrigger>
            <AccordionContent className="pb-3 px-5 text-gray-400  text-sm">
              <p className="max-h-[20vh] overflow-auto">{job?.description}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default LikedProjectsCard;
