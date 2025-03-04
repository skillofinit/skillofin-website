import { useAppContext } from "@/utiles/AppContext";
import { BsEmojiSmile } from "react-icons/bs";
import { CiBank } from "react-icons/ci";

function Loans() {
  const { userRole } = useAppContext();
  return (
    <div className="w-full h-[43vh] text-white border  rounded-xl overflow-auto shadow-md transition-all hover:shadow-purple-600/50  ">
      <div className="w-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center gap-3 text-black rounded-t-xl text-xl font-semibold px-6 py-3">
        <CiBank className="text-2xl" />
        {userRole === "FREELANCER" ? "Loans for you" : "Recent loans"}
      </div>
      <div className="text-foreground flex flex-col items-center justify-center mt-4 text-lg  h-[25vh] ">
        <BsEmojiSmile className="text-primary  w-10 h-10" />
        Loans are coming soon...
      </div>
    </div>
  );
}

export default Loans;
