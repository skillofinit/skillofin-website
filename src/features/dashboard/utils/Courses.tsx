import { useAppContext } from "@/utiles/AppContext";
import { BicepsFlexed } from "lucide-react";
import { BsEmojiSmile } from "react-icons/bs";

function Courses() {
  const { userRole } = useAppContext();
  return (
    <div className="w-full h-[43vh] text-white border  rounded-xl overflow-auto shadow-md transition-all hover:shadow-purple-600/50  ">
      <div className="w-full bg-gradient-to-r from-orange-100 to-yellow-100 flex items-center gap-3 text-black rounded-t-xl text-xl font-semibold px-6 py-3">
        <BicepsFlexed className="text-2xl" />
        {userRole === "FREELANCER" ? "Courses for you" : "Recent courses"}
      </div>
      <div className="text-foreground flex flex-col items-center justify-center mt-4 text-lg">
        <BsEmojiSmile className="text-primary w-10 h-10" />
        Courses are coming soon...
      </div>
    </div>
  );
}

export default Courses;
