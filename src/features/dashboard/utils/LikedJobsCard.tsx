/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/utiles/AppContext";
import { FaRegBookmark, FaRegMoneyBillAlt } from "react-icons/fa";
import { FaBlackTie } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function LikedJobsCard() {
  const { jobs } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="w-[32vw] h-[50vh] text-white border  rounded-xl overflow-auto shadow-lg transition-all hover:shadow-purple-600/50  ">
      <div className="w-full bg-gradient-to-r from-purple-700 to-pink-500 flex items-center gap-3 text-white rounded-t-xl text-xl font-semibold px-6 py-3">
        <FaRegBookmark className="text-2xl" /> Jobs for you
      </div>
      <Accordion type="single" collapsible className="p-3">
        {jobs?.map((job: any, index: number) => (
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
              <div>
                <Button
                  onClick={() => {
                    navigate("/jobs", {
                      state: {
                        value:job?.title,
                      },
                    });
                  }}
                  className="w-fit h-7"
                  variant={"outline"}
                >
                  View details
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default LikedJobsCard;
