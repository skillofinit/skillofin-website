/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSearch, FiMenu } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/utiles/AppContext";
import { useLogout } from "@/hooks/userHooks";
import AppSpiner from "@/utiles/AppSpiner";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PostJobDialog from "../features/jobs/utils/PostJobDialog";
import { BsCardList, BsPersonWorkspace, BsPostcardHeart } from "react-icons/bs";
import { FaSignsPost } from "react-icons/fa6";
import Logo from "./Logo";
import { TbHeartHandshake } from "react-icons/tb";
import { FaQuestionCircle } from "react-icons/fa";

function DashboardNavBar() {
  const navigate = useNavigate();
  const { userData, userRole } = useAppContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFinanceOpen, setMobileFinanceOpen] = useState(false);
  const { isPending: isLoading, logout } = useLogout();
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [popOverOpen, setPopOverOpen] = useState<boolean>(false);

  function handleLogoutClick() {
    logout();
  }

  function onClose() {
    setOpen(false);
  }

  function handleSearchJobClick() {
    navigate("/jobs", {
      state: {
        value: inputValue,
      },
    });
  }

  return (
    <div className="w-full relative  ">
      {open && <PostJobDialog onClose={onClose} />}
      {isLoading && <AppSpiner bgColor="bg-foreground/40" />}

      {/* Desktop Navbar – visible on md and larger screens */}
      <div className="hidden md:flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-8">
          <div onClick={() => navigate("/feed")} className="cursor-pointer">
            <Logo />
          </div>
          <div className="flex items-center gap-3">
            {userRole !== "BANK" && (
              <div className="flex items-center gap-5">
                {userRole !== "CLIENT" && (
                  <div>
                    <Popover>
                      <PopoverTrigger>
                        <div className="flex items-center gap-1">
                          <div className="text-[15px]">Manage finances</div>
                          <FaAngleDown className="w-3 h-3 mt-1" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 mt-3">
                        <div className="">
                          <div
                            onClick={() => {
                              navigate("/withdraw");
                            }}
                            className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                          >
                            <GiReceiveMoney className="w-5 h-5 ml-1" />
                            <p>Withdraw earnings</p>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                <div
                  onClick={() => navigate("/messages")}
                  className="text-[15px] cursor-pointer"
                >
                  Messages
                </div>
                <div
                  onClick={() =>
                    navigate(userRole === "CLIENT" ? "/myjobs" : "/jobs")
                  }
                  className="text-[15px] cursor-pointer"
                >
                  {userRole === "CLIENT" ? "My Jobs" : "Jobs"}
                </div>
              </div>
            )}
            <div
              onClick={() => navigate("/feed")}
              className="text-[15px] cursor-pointer ml-2"
            >
              Feed
            </div>

            <div
              onClick={() => navigate("/pricing")}
              className="text-[15px] cursor-pointer border-2 border-constructive px-2 py-1  rounded-full "
            >
              Upgarde
            </div>
          </div>
        </div>

        <div className="h-full flex gap-4 justify-center items-center">
          {userRole !== "BANK" && (
            <div>
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
                      value={inputValue}
                      onChange={(e) => {
                        const value = e?.target?.value;
                        setInputValue(value ?? "");
                      }}
                      iconName="search"
                      placeholder="Search Jobs"
                      className="h-8 w-[20vw]"
                    />
                  </div>
                  <Button className="px-2 h-8" onClick={handleSearchJobClick}>
                    <FiSearch />
                  </Button>
                </div>
              )}
            </div>
          )}

          <div>
            <Popover
              open={popOverOpen}
              onOpenChange={(value) => {
                setPopOverOpen(value);
              }}
            >
              <PopoverTrigger
                onClick={() => {
                  setPopOverOpen(true);
                }}
              >
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
                    onClick={() => {
                      setPopOverOpen(false);
                      navigate("/myprofile");
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
                      <p className="text-foreground/70 -mt-1">
                        {userData?.userData?.role?.charAt(0).toUpperCase() +
                          userData?.userData?.role?.slice(1).toLowerCase()}
                      </p>
                    </div>
                  </div>

                  {userRole === "CLIENT" && (
                    <div className="w-full bg-foreground/10 h-[1px]"></div>
                  )}

                  {userRole !== "BANK" && (
                    <div className="flex flex-col">
                      {userRole === "CLIENT" && (
                        <div
                          onClick={() => {
                            navigate("/myjobs");
                            setPopOverOpen(false);
                          }}
                          className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                        >
                          <BsPersonWorkspace className="w-5 h-5 ml-1" />
                          <p>My jobs</p>
                        </div>
                      )}
                      <div className="w-full bg-foreground/10 h-[1px]"></div>

                      <div
                        onClick={() => {
                          navigate("/createpost");
                          setPopOverOpen(false);
                        }}
                        className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                      >
                        <BsPostcardHeart className="w-5 h-5 ml-1" />
                        <p>Create Post</p>
                      </div>
                      <div
                        onClick={() => {
                          navigate("/myposts");
                          setPopOverOpen(false);
                        }}
                        className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                      >
                        <FaSignsPost className="w-5 h-5 ml-1" />
                        <p>My Posts</p>
                      </div>

                      <div className="w-full bg-foreground/10 h-[1px]"></div>
                      <div
                        onClick={() => {
                          navigate("/contactus");
                          setPopOverOpen(false);
                        }}
                        className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                      >
                        <TbHeartHandshake className="w-5 h-5 ml-1" />
                        <p>Contact Us</p>
                      </div>
                      <div
                        onClick={() => {
                          navigate("/faqs");
                          setPopOverOpen(false);
                        }}
                        className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                      >
                        <FaQuestionCircle className="w-5 h-5 ml-1" />
                        <p>faqs</p>
                      </div>
                      <div
                        onClick={() => {
                          navigate("/blog");
                          setPopOverOpen(false);
                        }}
                        className="px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                      >
                        <BsCardList className="w-5 h-5 ml-1" />
                        <p>Blog</p>
                      </div>

                      <div className="w-full bg-foreground/10 h-[1px]"></div>
                    </div>
                  )}

                  <div
                    className="text-destructive mb-1 px-3 cursor-pointer flex gap-3 py-2 lg:hover:bg-foreground/5 items-center"
                    onClick={() => {
                      handleLogoutClick();
                      setPopOverOpen(false);
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
            onClick={() => navigate("/feed")}
            src="Skillofin-Logo.png"
            alt="Skillofin logo"
            className="cursor-pointer w-32"
          />

          <div className="items-center flex gap-3">
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
        </div>
        {mobileMenuOpen && (
          <div className="bg-white shadow-md px-4 py-4 space-y-4 fixed top-14 w-full h-fit z-[998] ">
            {/* Search Bar */}
            {userRole !== "BANK" && (
              <div>
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
                      value={inputValue}
                      onChange={(e) => {
                        const value = e?.target?.value;
                        setInputValue(value ?? "");
                      }}
                      placeholder="Search Jobs"
                      iconName="search"
                      className="h-8 flex-1"
                    />
                    <Button className="px-2 h-8 -mt-4">
                      <FiSearch onClick={handleSearchJobClick} />
                    </Button>
                  </div>
                )}
              </div>
            )}
            {/* Navigation Links */}
            <div className="flex flex-col space-y-3">
              {/* Manage Finances with submenu */}
              {userRole !== "BANK" && (
                <div className="flex flex-col space-y-3">
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
                            setMobileMenuOpen(false);
                            navigate("/withdraw");
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
                      navigate(userRole === "CLIENT" ? "/myjobs" : "/jobs");
                      setMobileMenuOpen(false);
                    }}
                    className="text-[15px] cursor-pointer"
                  >
                    {userRole === "CLIENT" ? "My Jobs" : "Jobs"}
                  </div>
                  <div
                    onClick={() => {
                      navigate("/feed");
                      setMobileMenuOpen(false);
                    }}
                    className="text-[15px] cursor-pointer"
                  >
                    {"Feed"}
                  </div>
                </div>
              )}
              <div
                onClick={() => {
                  navigate("/pricing");
                  setMobileMenuOpen(false);
                }}
                className="text-[15px] cursor-pointer"
              >
                {"Upgarde"}
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
                <div className="w-full bg-foreground/10 h-[1px]"></div>

                <div
                  onClick={() => navigate("/createpost")}
                  className="flex items-center gap-2 text-[15px] cursor-pointer"
                >
                  <BsPostcardHeart className="w-5 h-5 " />
                  <p>Create post</p>
                </div>

                <div
                  onClick={() => navigate("/myposts")}
                  className="flex items-center gap-2 text-[15px] cursor-pointer"
                >
                  <FaSignsPost className="w-5 h-5 " />
                  <p>My Posts</p>
                </div>

                <div className="w-full bg-foreground/10 h-[1px] mt-3"></div>
                <div
                  onClick={() => navigate("/contactus")}
                  className="flex items-center gap-2 text-[15px] cursor-pointer"
                >
                  <TbHeartHandshake className="w-5 h-5 " />
                  <p>Contact Us</p>
                </div>
                <div
                  onClick={() => navigate("/faqs")}
                  className="flex items-center gap-2 text-[15px] cursor-pointer"
                >
                  <FaQuestionCircle className="w-5 h-5 " />
                  <p>faqs</p>
                </div>
                <div
                  onClick={() => navigate("/blog")}
                  className="flex items-center gap-2 text-[15px] cursor-pointer"
                >
                  <BsCardList className="w-5 h-5 " />
                  <p>Blog</p>
                </div>

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
