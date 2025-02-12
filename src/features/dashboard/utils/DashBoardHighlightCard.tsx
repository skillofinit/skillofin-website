import { Button } from "@/components/ui/button";

function DashBoardHighlightCard() {
  return (
    <div className="border  w-[60vw] min-h-[30vh] rounded-md bg-primary text-background flex  p-5">
      <div className="flex flex-col justify-between gap-20">
        <div className="text-3xl font-serif  ">
          Zero commission fees for first 100 freelancers in any category for one
          year !
        </div>
        <Button className="w-fit bg-background text-foreground hover:bg-gray-200">
          Read More
        </Button>
      </div>
      <div>
        <img
          alt="highlight"
          src="working-man-illu.jpg"
          className="w-[20vw] rounded-lg"
        />
      </div>
    </div>
  );
}

export default DashBoardHighlightCard;
