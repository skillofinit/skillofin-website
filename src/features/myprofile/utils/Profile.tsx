/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdEditNote, MdOutlineLocationOn } from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import ConfigureDialog from "./ConfigureDialog";
import { useToast } from "@/components/ui/use-toast";
import { useGetMe, useUplaodProfileImage } from "@/hooks/userHooks";
import AppSpiner from "@/utiles/AppSpiner";

import { useLocation } from "react-router-dom";
import { useAppContext } from "@/utiles/AppContext";

function Profile() {
  const [openDialog, setOpendilog] = useState<boolean>(false);
  const [method, setMethod] = useState<"add" | "edit" | undefined>(undefined);
  const [comp, setComp] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const { isPending, uplaodProfileImage } = useUplaodProfileImage();
  const [uplaoding, setUploading] = useState<boolean>(false);

  const [userData, setUserData] = useState<any>();
  const [userRole, setUserRole] = useState<any>();

  const { state } = useLocation();
  const { getMe, isPending: gettingUserDetails } = useGetMe();
  const [loadedFromState, setLaodedFromState] = useState<boolean>(false);
  const { userData: myData } = useAppContext();

  useEffect(() => {
    if (state?.emailId && !loadedFromState) {
      getMe(state?.emailId, {
        onSuccess(data) {
          setLaodedFromState(true);
          if (data?.message === "SUCCESS") {
            setUserData(data?.data);
            setUserRole(data?.data?.userData?.role);
          }
        },
      });
    }
  }, [state]);

  useEffect(() => {
    if (myData && !state?.emailId) {
      setUserData(myData);
      setUserRole(myData?.userData?.role);
    }
  }, [myData]);

  function handleConfigureClick(method: "add" | "edit", comp: string) {
    setMethod(method);
    setComp(comp);
    setOpendilog(!openDialog);
  }
  function handleOnClose() {
    setOpendilog(false);
    setComp(undefined);
    setMethod(undefined);
  }

  async function uploadImage(img: any) {
    setUploading(true);
    const data = new FormData();
    data.set("key", "2d02bdbd0d5aba83f256929d809f7752");
    data.append("image", img);

    const a = await fetch("https://api.imgbb.com/1/upload", {
      method: "post",
      body: data,
    });
    const url = await (a.json() as any);

    if (url?.data?.url) {
      uplaodProfileImage(
        {
          image: url.data.url,
        },
        {
          onSuccess() {
            getMe(undefined);
          },
        }
      );
      setUploading(false);
    } else {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Please try again",
        description: "Something went wrong, Please try again after some time!",
      });
      setUploading(false);
    }
  }

  return (
    <div className="border  w-[95vw] lg:w-[80vw] rounded-lg h-full">
      {(isPending || uplaoding || gettingUserDetails) && (
        <AppSpiner bgColor="bg-foreground/50" />
      )}
      <div className="p-6 flex justify-between items-center lg:flex-row flex-col gap-4">
        <div className="flex gap-5">
          <div className="relative ">
            <img
              alt="profile"
              src={`${
                userData?.userData?.profile
                  ? userData?.userData?.profile
                  : "no-user.png"
              }`}
              className="h-20 w-20 lg:w-28 lg:h-28 rounded-full"
            />
            {!state?.emailId && (
              <div className="absolute rounded-full w-7 h-7 flex items-center justify-center bottom-1 right-2 bg-primary text-background cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  id="fileClick"
                  accept="image/*"
                  onChange={(e: any) => {
                    if (e?.target?.files[0]) uploadImage(e?.target?.files[0]);
                  }}
                />
                <TbPhotoEdit
                  className="w-4 h-4"
                  onClick={() => {
                    document.getElementById("fileClick")?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h3 className=" text-xl lg:text-4xl font-semibold">
              {userData?.userData?.firstName +
                " " +
                userData?.userData?.lastName}
            </h3>
            <p className="ml-1 text-foreground/60 text-lg">
              {userData?.userData?.role?.charAt(0).toUpperCase() +
                userData?.userData?.role?.slice(1).toLowerCase()}
            </p>
            <div className=" items-center mt-2 gap-2 hidden lg:flex">
              <MdOutlineLocationOn className="w-4 h-4" />
              <p className="text-lg">
                {userData?.userData?.countryName.split("-")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-foreground/20"></div>

      <div className="flex  lg:flex-row flex-col-reverse  ">
        {/* Left Sidebar */}
        <div className="flex flex-col border-r  border-foreground/20  min-w-[25vw] ">
          {/* Earnings & Jobs */}
          <div className=" lg:hidden h-[1px] w-full bg-foreground/10"></div>
          <div className="px-8 py-5 flex items-center justify-between ">
            <div className="flex flex-col">
              <h5 className="text-xl font-semibold">
                ${userData?.userAccountData?.earnings ?? 0}
              </h5>
              <p className="text-lg text-foreground/70">
                {userRole === "CLIENT" ? "Total Spends" : "Total earnings"}
              </p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-xl font-semibold">0</h5>
              <p className="text-lg text-foreground/70">Total jobs</p>
            </div>
          </div>
          {userRole === "FREELANCER" && (
            <div className="h-[1px] w-full bg-foreground/10"></div>
          )}
          {/* Connects */}
          {/* {userRole === "FREELANCER" && (
            <div className="p-5">
              <div className="p-5 gap-5 bg-background shadow-sm border rounded-lg flex flex-col">
                <div className="text-xl ml-4 font-medium">
                  Connects: {userData?.userAccountData?.connects ?? 0}
                </div>
                <div className="flex items-center justify-between">
                  <Button variant={"link"}>View Details</Button>
                  <div className="w-[1px] h-4 bg-foreground/10"></div>
                  <Button variant={"link"}>Buy connects</Button>
                </div>
              </div>
            </div>
          )} */}
          {/* {userRole === "FREELANCER" && (
            <div className="h-[1px] w-full bg-foreground/10"></div>
          )} */}
          {/* Cost per Hour */}
          {userRole === "FREELANCER" && (
            <div className="p-7 flex flex-col mt-5">
              <div className="flex items-center justify-between">
                <div className="text-2xl">Cost per hour</div>
                {!state?.emailId && (
                  <MdEditNote
                    onClick={() => {
                      handleConfigureClick("edit", "costPerHour");
                    }}
                    className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                  />
                )}
              </div>
              <div className="text-xl ml-1 font-medium mt-1">
                ${userData?.userAccountData?.hourlyRate ?? 0}/hr
              </div>
            </div>
          )}
          {userRole === "FREELANCER" && (
            <div className="h-[1px] w-full bg-foreground/10"></div>
          )}
          {/* Languages */}
          {userRole === "FREELANCER" && (
            <div className="p-7 flex flex-col mt-5 ">
              <div className="flex items-center justify-between">
                <div className="text-2xl">Languages</div>
                <div className="flex gap-4">
                  {!state?.emailId && (
                    <FiPlus
                      onClick={() => {
                        handleConfigureClick("add", "languages");
                      }}
                      className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                    />
                  )}
                </div>
              </div>
              <div className="text-lg mt-4 flex flex-col gap-3">
                {userData?.userAccountData?.languages?.map(
                  (
                    lang: {
                      name: string;
                      level: string;
                    },
                    index: number
                  ) => (
                    <div key={index} className="flex items-center gap-4">
                      <h5 className="w-20 flex items-center gap-3">
                        {lang.name} <span>:</span>
                      </h5>
                      <p className="text-foreground/60">
                        {lang.level?.charAt(0).toUpperCase() +
                          lang.level?.slice(1).toLowerCase()}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {userRole === "FREELANCER" && (
            <div className="h-[1px] w-full bg-foreground/10"></div>
          )}
          {userRole === "FREELANCER" && (
            <div className="p-7 flex flex-col mt-5 ">
              <div className="flex items-center justify-between">
                <div className="text-2xl">Bank account details</div>
                <div className="flex gap-4">
                  {!state?.emailId && (
                    <FiPlus
                      onClick={() => {
                        handleConfigureClick("add", "bank");
                      }}
                      className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                    />
                  )}
                </div>
              </div>
              <div className="text-lg mt-4 flex flex-col gap-3">
                {
                  <div className="text-lg mt-4 flex flex-col gap-3">
                    {Object.keys(
                      userData?.userData?.bakAccountDetails || {}
                    ).map((key) => {
                      const value = userData?.userData?.bakAccountDetails[key];
                      // Only show keys with non-empty values
                      if (value) {
                        return (
                          <div key={key} className="flex items-center gap-4">
                            <h5 className="text-xs w-36 justify-between flex items-center gap-3">
                              {key
                                ?.replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase
                                .replace(/^./, (str) => str.toUpperCase())}{" "}
                              <span>:</span>
                            </h5>
                            <p className="text-foreground/60 text-xs">{value}</p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                }
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-7 w-full">
          {/* Title & Summary */}
          <div className="px-7 py-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-3xl ">
                {userRole === "CLIENT"
                  ? userData?.userAccountData?.companyName ?? "Add company name"
                  : userData?.userAccountData?.title ?? "Add a headline"}
              </h3>
              <div>
                {!state?.emailId && (
                  <MdEditNote
                    onClick={() => {
                      handleConfigureClick("edit", "title");
                    }}
                    className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                  />
                )}
              </div>
            </div>
            <p className="text-lg pr-5 mt-3">
              {userData?.userAccountData?.description
                ? userData?.userAccountData?.description
                : userRole === "CLIENT"
                ? "Add summary about company."
                : "Add summary about yourself."}
            </p>
          </div>
          {userRole === "FREELANCER" && (
            <div className="h-[1px] w-full bg-foreground/10"></div>
          )}

          {/* Skills */}
          {userRole === "FREELANCER" && (
            <div className="px-7 pb-5">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-3xl">Skills</h3>

                <div className="flex items-center gap-4">
                  {!state?.emailId && (
                    <FiPlus
                      onClick={() => {
                        handleConfigureClick("add", "skills");
                      }}
                      className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2  lg:grid-cols-4 gap-2 mt-3">
                {userData?.userAccountData?.skills?.map(
                  (skill: { name: string }, index: number) => (
                    <div
                      key={index}
                      className="px-5 py-1 rounded-full  border bg-background shadow-sm text-lg h-fit max-h-20 lg:w-[9vw] text-wrap break-words"
                    >
                      {skill?.name}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {userRole === "FREELANCER" && (
            <div className="h-[1px] w-full bg-foreground/10"></div>
          )}

          {/* Portfolio */}
          {userRole === "FREELANCER" && (
            <div className="px-7 pb-5">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-3xl">Projects</h3>
                <div className="flex gap-4">
                  {!state?.emailId && (
                    <FiPlus
                      onClick={() => {
                        handleConfigureClick("add", "project");
                      }}
                      className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                    />
                  )}
                </div>
              </div>
              <div className="mt-3 grid lg:grid-cols-2 gap-5">
                {userData?.userAccountData?.projects?.map(
                  (
                    project: {
                      title: string;
                      description: string;
                    },
                    index: number
                  ) => {
                    return (
                      <div
                        key={index}
                        className="border rounded-lg p-4  bg-background shadow-sm lg:w-[25vw]"
                      >
                        <h4 className="font-semibold text-lg ">
                          {project.title}
                        </h4>
                        <p className=" text-foreground/70 mt-2">
                          {project.description}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
          {userRole === "FREELANCER" && (
            <div className="h-[1px] w-full bg-foreground/10 "></div>
          )}
          {/* Employment History */}
          {userRole === "FREELANCER" && (
            <div className="px-7 pb-5">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-3xl">Employment History</h3>
                <div className="flex gap-4">
                  {!state?.emailId && (
                    <FiPlus
                      onClick={() => {
                        handleConfigureClick("add", "employment");
                      }}
                      className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                    />
                  )}
                </div>
              </div>
              <div className="mt-3 grid lg:grid-cols-2 gap-3">
                {userData?.userAccountData?.employmentHistory?.map(
                  (
                    company: {
                      companyName: string;
                      description: string;
                      startDate: string;
                      endDate: string;
                    },
                    index: number
                  ) => {
                    return (
                      <div
                        key={index}
                        className=" border rounded-lg p-4 bg-background shadow-sm lg:w-[25vw]"
                      >
                        <h4 className="font-semibold text-xl">
                          {company?.companyName}
                        </h4>
                        <p className=" text-foreground/80">
                          Jan 2022 - Present{" "}
                          {`${company?.startDate} - ${
                            company.endDate ?? "Present"
                          }`}
                        </p>
                        <p className=" text-foreground/80 mt-2">
                          {company.description}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
          {userRole === "FREELANCER" && (
            <div className="h-[1px] w-full bg-foreground/10"></div>
          )}

          {/* Education */}
          {userRole === "FREELANCER" && (
            <div className="px-7 pb-5">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-3xl">Education</h3>
                <div className="flex gap-4">
                  {!state?.emailId && (
                    <FiPlus
                      onClick={() => {
                        handleConfigureClick("add", "education");
                      }}
                      className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                    />
                  )}
                </div>
              </div>
              <div className="mt-3 grid lg:grid-cols-2 gap-2 ">
                {userData?.userAccountData?.educationHistory?.map(
                  (
                    item: {
                      name: string;
                      description: string;
                      startDate: string;
                      endDate: string;
                    },
                    index: number
                  ) => {
                    return (
                      <div
                        key={index}
                        className="border lg:w-[25vw] rounded-lg p-4  bg-background shadow-sm"
                      >
                        <h4 className="font-semibold text-xl">{item?.name}</h4>
                        <p className=" text-foreground/80">{`${item?.startDate} - ${item.endDate} `}</p>
                        <p className=" text-foreground/80 mt-2">
                          {item?.description}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {openDialog && comp && method && (
        <ConfigureDialog method={method} comp={comp} onClose={handleOnClose} />
      )}
    </div>
  );
}

export default Profile;
