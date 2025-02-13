import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { SiCircle } from "react-icons/si";
import { PiUserListLight } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/utiles/AppContext";

function DashboardNavBar() {
  const navigate = useNavigate();
  const { userData } = useAppContext();

  console.log();
  return (
    <div className="w-full justify-between flex items-center px-4 py-2 ">
      <div className="flex items-center gap-8">
        <img onClick={()=>{navigate("/dashboard")}}
          src="Skillofin-Logo.png"
          alt="skillofin logo"
          className="cursor-pointer w-[40vw] lg:w-[10vw] max-w-xs md:w-[30vw]"
        />
        <div className="flex items-center gap-5">
          <div>
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-1">
                  <div className="text-[15px]">Manage finances</div>
                  <FaAngleDown className="w-3 h-3 mt-1" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 mt-3">
                <div className="my-2">
                  <div className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center">
                    <TbReportSearch className="w-5 h-5 ml-1" />
                    <p>Your reports</p>
                  </div>
                  <div className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center">
                    <GiReceiveMoney className="w-5 h-5 ml-1" />
                    <p>Withdraw earnings</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="text-[15px]  cursor-pointer">Messages</div>
          <div className="text-[15px]  cursor-pointer">Jobs</div>
        </div>
      </div>

      <div className="h-full flex gap-4 jutify-center items-center">
        <div className="flex items-center">
          <div className="mt-4">
            <Input
              iconName="search"
              placeholder="Search Jobs"
              className="h-8 w-[20vw]"
            />
          </div>
          <Button className="px-2 h-8">
            <FiSearch />
          </Button>
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <div className=" cursor-pointer rounded-full h-10 w-10 flex items-center justify-center  text-foreground relative">
                <div className="absolute top-1 right-1 clear-start text-[8px] text-background bg-destructive rounded-full w-4 h-4  flex items-center justify-center">
                  10
                </div>
                <BsBell className="w-5 h-5" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-4">
              <div>See all notifications</div>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <div className=" cursor-pointer rounded-full h-10 w-10 flex items-center justify-center  border">
                <img
                  alt="profile"
                  src={`${
                    userData?.userData?.profile ? "profile.jpg" : "no-user.png"
                  }`}
                  className="rounded-full h-10 w-10"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-4 p-0">
              <div className="flex flex-col  gap-1">
                <div className="flex p-2 lg:hover:bg-foreground/5  items-center gap-4  cursor-pointer mt-3">
                  <img
                    alt="profile"
                    src={`${
                      userData?.userData?.profile
                        ? "profile.jpg"
                        : "no-user.png"
                    }`}
                    className="rounded-full h-10 w-10"
                  />
                  <div className="flex flex-col ">
                    <h5 className="text-lg">
                      {userData?.userData?.firstName +
                        " " +
                        userData?.userData?.lastName}
                    </h5>
                    <p className="text-foreground/70 -mt-1">
                      {userData?.userData?.role?.charAt(0).toUpperCase() +
                        userData?.userData?.role?.slice(1).toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between px-3">
                  <p>Online for messages</p>
                  <div>
                    <Switch className="" />
                  </div>{" "}
                </div>
                <div className="w-full bg-foreground/10 h-[1px] mt-3"></div>

                <div
                  onClick={() => {
                    navigate("/myprofile");
                  }}
                  className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                >
                  <FaRegUserCircle className="w-5 h-5 ml-1" />
                  <p>Your profile</p>
                </div>

                <div className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center">
                  <SiCircle className="w-5 h-5 ml-1" />
                  <p>Connects</p>
                </div>
                <div className="w-full bg-foreground/10 h-[1px]"></div>

                <div className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center">
                  <IoSettingsOutline className="w-5 h-5 ml-1" />
                  <p>Account settings</p>
                </div>

                <div className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center">
                  <PiUserListLight className="w-5 h-5 ml-1" />
                  <p>Membership plans</p>
                </div>

                <div className="w-full bg-foreground/10 h-[1px]"></div>
                <div className="text-destructive mb-1 px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center">
                  <RiLogoutCircleLine className="w-5 h-5 ml-1" />
                  <p>Logout</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavBar;
