import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSearch, FiMenu } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/utiles/AppContext";
import { useLogout, useUpdateProfile } from "@/hooks/userHooks";
import AppSpiner from "@/utiles/AppSpiner";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PostJobDialog from "./PostJobDialog";
import { BsPersonWorkspace } from "react-icons/bs";

function DashboardNavBar() {
  const navigate = useNavigate();
  const { userData, userRole } = useAppContext();
  const { isPending, updateProfile } = useUpdateProfile();

  // For mobile menu toggling
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFinanceOpen, setMobileFinanceOpen] = useState(false);
  const { isPending: isLoading, logout } = useLogout();
  const [open, setOpen] = useState<boolean>(false);

  function onOnlineChange(value: boolean) {
    updateProfile({
      method: "online",
      data: { value },
    });
  }
  function handleLogoutClick() {
    logout();
  }

  function onClose() {
    setOpen(false);
  }

  return (
    <div className="w-full relative">
      {open && <PostJobDialog onClose={onClose} />}
      {(isPending || isLoading) && <AppSpiner bgColor="bg-foreground/40" />}

      {/* Desktop Navbar – visible on md and larger screens */}
      <div className="hidden md:flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-8">
          <img
            onClick={() => navigate("/dashboard")}
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
                    <div
                      className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                      onClick={() => navigate("/reports")}
                    >
                      <TbReportSearch className="w-5 h-5 ml-1" />
                      <p>Your reports</p>
                    </div>
                    <div
                      className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                      onClick={() => navigate("/withdraw")}
                    >
                      <GiReceiveMoney className="w-5 h-5 ml-1" />
                      <p>Withdraw earnings</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div
              onClick={() => navigate("/messages")}
              className="text-[15px] cursor-pointer"
            >
              Messages
            </div>
            <div
              onClick={() => navigate("/jobs")}
              className="text-[15px] cursor-pointer"
            >
              Jobs
            </div>
          </div>
        </div>

        <div className="h-full flex gap-4 justify-center items-center">
          {userRole === "CLIENT" ? (
            <div
              onClick={() => {
                setOpen(true);
              }}
            >
              <Button>Post Job</Button>
            </div>
          ) : (
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
          )}

          <div>
            <Popover>
              <PopoverTrigger>
                <div className="cursor-pointer rounded-full h-10 w-10 flex items-center justify-center border">
                  <img
                    alt="profile"
                    src={
                      userData?.userData?.profile
                        ? userData?.userData?.profile
                        : "no-user.png"
                    }
                    className="rounded-full h-10 w-10"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="mr-4 p-0">
                <div className="flex flex-col gap-1">
                  <div
                    className="flex p-2 lg:hover:bg-foreground/5 items-center gap-4 cursor-pointer mt-3"
                    onClick={() => navigate("/myprofile")}
                  >
                    <img
                      alt="profile"
                      src={
                        userData?.userData?.profile
                          ? userData?.userData?.profile
                          : "no-user.png"
                      }
                      className="rounded-full h-10 w-10"
                    />
                    <div className="flex flex-col">
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
                      <Switch
                        value={userData?.userData?.online}
                        onCheckedChange={onOnlineChange}
                      />
                    </div>
                  </div>
                  <div className="w-full bg-foreground/10 h-[1px] mt-3"></div>

                  <div
                    onClick={() => navigate("/myprofile")}
                    className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                  >
                    <FaRegUserCircle className="w-5 h-5 ml-1" />
                    <p>Your profile</p>
                  </div>
                  {userRole === "CLIENT" && (
                    <div className="w-full bg-foreground/10 h-[1px]"></div>
                  )}

                  {userRole === "CLIENT" && (
                    <div
                      onClick={() => navigate("/myjobs")}
                      className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                    >
                      <BsPersonWorkspace className="w-5 h-5 ml-1" />
                      <p>My jobs</p>
                    </div>
                  )}

                  <div className="w-full bg-foreground/10 h-[1px]"></div>
                  <div
                    className="text-destructive mb-1 px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                    onClick={() => {
                      handleLogoutClick();
                    }}
                  >
                    <RiLogoutCircleLine className="w-5 h-5 ml-1" />
                    <p>Logout</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Mobile Navbar – visible on small screens */}
      <div className="flex md:hidden flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
          <img
            onClick={() => navigate("/dashboard")}
            src="Skillofin-Logo.png"
            alt="Skillofin logo"
            className="cursor-pointer w-32"
          />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-xl"
          >
            {mobileMenuOpen ? (
              <IoIosCloseCircleOutline className="w-7 h-7" />
            ) : (
              <FiMenu />
            )}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="bg-white shadow-md px-4 py-4 space-y-4 fixed top-14 w-full h-fit z-[998] ">
            {/* Search Bar */}
            {userRole === "CLIENT" ? (
              <div
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Button>Post Job</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search Jobs"
                  iconName="search"
                  className="h-8 flex-1"
                />
                <Button className="px-2 h-8 -mt-4">
                  <FiSearch />
                </Button>
              </div>
            )}
            {/* Navigation Links */}
            <div className="flex flex-col space-y-3">
              {/* Manage Finances with submenu */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer text-[15px]"
                  onClick={() => setMobileFinanceOpen(!mobileFinanceOpen)}
                >
                  <span>Manage Finances</span>
                  <FaAngleDown
                    className={`w-3 h-3 mt-1 transform transition-transform duration-200 ${
                      mobileFinanceOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {mobileFinanceOpen && (
                  <div className="mt-2 pl-4 space-y-2">
                    <div
                      onClick={() => {
                        navigate("/reports");
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-[15px] cursor-pointer"
                    >
                      <TbReportSearch className="w-5 h-5" />
                      <span>Your Reports</span>
                    </div>
                    <div
                      onClick={() => {
                        navigate("/withdraw");
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-[15px] cursor-pointer"
                    >
                      <GiReceiveMoney className="w-5 h-5" />
                      <span>Withdraw Earnings</span>
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  navigate("/messages");
                  setMobileMenuOpen(false);
                }}
                className="text-[15px] cursor-pointer"
              >
                Messages
              </div>
              <div
                onClick={() => {
                  navigate("/jobs");
                  setMobileMenuOpen(false);
                }}
                className="text-[15px] cursor-pointer"
              >
                Jobs
              </div>
            </div>
            {/* Notifications and Profile Section */}
            <div className="border-t pt-4">
              <div className="mt-4 space-y-3">
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => {
                    navigate("/myprofile");
                    setMobileMenuOpen(false);
                  }}
                >
                  <img
                    alt="profile"
                    src={
                      userData?.userData?.profile
                        ? userData?.userData?.profile
                        : "no-user.png"
                    }
                    className="rounded-full h-10 w-10"
                  />
                  <div className="flex flex-col">
                    <h5 className="text-lg">
                      {userData?.userData?.firstName +
                        " " +
                        userData?.userData?.lastName}
                    </h5>
                    <p className="text-foreground/70 text-[15px]">
                      {userData?.userData?.role?.charAt(0).toUpperCase() +
                        userData?.userData?.role?.slice(1).toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-foreground/10 h-[1px] mt-3"></div>

                <div className="flex items-center justify-between px-2">
                  <span className="text-[15px]">Online for messages</span>
                  <Switch
                    value={userData?.userData?.online}
                    onCheckedChange={onOnlineChange}
                  />
                </div>
                <div className="w-full bg-foreground/10 h-[1px] mt-3"></div>

                <div
                  onClick={() => {
                    navigate("/myprofile");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-[15px] cursor-pointer"
                >
                  <FaRegUserCircle className="w-5 h-5" />
                  <span>Your Profile</span>
                </div>
                {userRole === "CLIENT" && (
                  <div className="w-full bg-foreground/10 h-[1px]"></div>
                )}

                {userRole === "CLIENT" && (
                  <div
                    onClick={() => navigate("/myjobs")}
                    className="flex items-center gap-2 text-[15px] cursor-pointer"
                  >
                    <BsPersonWorkspace className="w-5 h-5 " />
                    <p>My jobs</p>
                  </div>
                )}
                <div className="w-full bg-foreground/10 h-[1px] mt-3"></div>

                <div
                  onClick={() => {
                    handleLogoutClick();
                  }}
                  className="flex items-center gap-2 text-[15px] text-destructive cursor-pointer"
                >
                  <RiLogoutCircleLine className="w-5 h-5" />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardNavBar;
