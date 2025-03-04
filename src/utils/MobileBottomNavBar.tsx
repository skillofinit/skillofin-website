import { GrHomeOption } from "react-icons/gr";
import { TbTie } from "react-icons/tb";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { useAppContext } from "@/utiles/AppContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MobileBottomNavBar() {
  const { mobileBottomMenu, dispatch ,userRole} = useAppContext();
  const [menuIndex, setMenuIndex] = useState<number>(1);
  const navigate = useNavigate()

  useEffect(() => {
    setMenuIndex(mobileBottomMenu);
  }, [mobileBottomMenu]);

  function handleSetMenuIndex(index: number) {
    dispatch({
      type: "setMobileBottomMenu",
      payload: index,
    });

    switch(index){
        case 0:
            navigate("/feed")
            break;
        
        case 1:
            navigate(userRole === "CLIENT"?"/myjobs":"/jobs")
            break;
        
        case 2:
            navigate("/messages")
            break;
        
        case 3:
            navigate("/myprofile")
            break;
        
    }



  }

  return (
    <div className="px-2 flex items-center justify-between border-t p-2 w-full bg-background">
      {[
        { icon: <GrHomeOption className="h-5 w-5" />, label: "Home" },
        { icon: <TbTie className="h-5 w-5" />, label: userRole === "CLIENT"?"My Jobs":"Jobs" },
        { icon: <LuMessagesSquare className="h-5 w-5" />, label: "Message" },
        { icon: <FaRegUser className="h-5 w-5" />, label: "Profile" },
      ].map((item, index) => (
        <div
          key={index}
          onClick={() => handleSetMenuIndex(index)}
          className={`flex items-center justify-center w-full h-8 rounded-full cursor-pointer transition-all duration-300 ease-in-out
            ${
              menuIndex === index
                ? "flex-row gap-2 bg-primary text-white px-4 scale-105"
                : "flex-col gap-0 opacity-70"
            }
          `}
        >
          {item.icon}
          <span className="text-xs ">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default MobileBottomNavBar;
