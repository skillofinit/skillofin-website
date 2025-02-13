import { Button } from "@/components/ui/button";
import { MdEditNote, MdOutlineLocationOn } from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { useAppContext } from "@/utiles/AppContext";
import { useState } from "react";
import ConfigureDialog from "./ConfigureDialog";

function Profile() {
  const { userData } = useAppContext();
  const [openDialog, setOpendilog] = useState<boolean>(false);
  const [method, setMethod] = useState<"add" | "edit" | undefined>(undefined);
  const [comp, setComp] = useState<string | undefined>(undefined);

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

  return (
    <div className="border mb-10 overflow-auto w-[80vw] rounded-lg min-h-[100vh]">
      <div className="p-6 flex justify-between items-center">
        <div className="flex gap-5">
          <div className="relative">
            <img
              alt="profile"
              src={`${
                userData?.userData?.profile ? "profile.jpg" : "no-user.png"
              }`}
              className="w-28 h-28 rounded-full"
            />
            <div className="absolute rounded-full w-7 h-7 flex items-center justify-center bottom-1 right-2 bg-primary text-background cursor-pointer">
              <TbPhotoEdit className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h3 className="text-4xl font-semibold">
              {userData?.userData?.firstName +
                " " +
                userData?.userData?.lastName}
            </h3>
            <p className="ml-1 text-foreground/60 text-lg">
              {userData?.userData?.role?.charAt(0).toUpperCase() +
                userData?.userData?.role?.slice(1).toLowerCase()}
            </p>
            <div className="flex items-center mt-2 gap-2">
              <MdOutlineLocationOn className="w-4 h-4" />
              <p className="text-lg">Hyderabad, India – 3:01 am local time</p>
            </div>
          </div>
        </div>
        <div>
          <Button className="py-6 px-10">Account Settings</Button>
        </div>
      </div>

      <div className="h-[1px] w-full bg-foreground/20"></div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="flex flex-col border-r border-foreground/20 min-h-[60vh] min-w-[25vw]">
          {/* Earnings & Jobs */}
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex flex-col">
              <h5 className="text-xl font-semibold">
                ${userData?.userAccountData?.earnings ?? 0}
              </h5>
              <p className="text-lg text-foreground/70">Total earnings</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-xl font-semibold">1</h5>
              <p className="text-lg text-foreground/70">Total jobs</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-foreground/10"></div>

          {/* Connects */}
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
          <div className="h-[1px] w-full bg-foreground/10"></div>

          {/* Cost per Hour */}
          <div className="p-7 flex flex-col mt-5">
            <div className="flex items-center justify-between">
              <div className="text-2xl">Cost per hour</div>
              <MdEditNote
                onClick={() => {
                  handleConfigureClick("edit", "costPerHour");
                }}
                className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
              />
            </div>
            <div className="text-xl ml-1 font-medium mt-1">
              ${userData?.userAccountData?.hourlyRate ?? 0}/hr
            </div>
          </div>
          <div className="h-[1px] w-full bg-foreground/10"></div>

          {/* Languages */}
          <div className="p-7 flex flex-col mt-5">
            <div className="flex items-center justify-between">
              <div className="text-2xl">Languages</div>
              <div className="flex gap-4">
                <FiPlus
                  onClick={() => {
                    handleConfigureClick("add", "languages");
                  }}
                  className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                />
                <MdEditNote
                  onClick={() => {
                    handleConfigureClick("edit", "languages");
                  }}
                  className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                />
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
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-7 w-full">
          {/* Title & Summary */}
          <div className="px-7 py-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-3xl">
                {userData?.userAccountData?.title ?? "Add a headline"}
              </h3>
              <MdEditNote
                onClick={() => {
                  handleConfigureClick("edit", "title");
                }}
                className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
              />
            </div>
            <p className="text-lg pr-5 mt-3">
              {userData?.userAccountData?.description ??
                "Add summary about yourself."}
            </p>
          </div>
          <div className="h-[1px] w-full bg-foreground/10"></div>

          {/* Skills */}
          <div className="px-7 pb-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-3xl">Skills</h3>

              <div className="flex items-center gap-4">
                <FiPlus
                  onClick={() => {
                    handleConfigureClick("add", "skills");
                  }}
                  className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                />
                <MdEditNote
                  onClick={() => {
                    handleConfigureClick("add", "skills");
                  }}
                  className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 mt-3">
              {userData?.userAccountData?.skills?.map(
                (skill: { name: string }, index: number) => (
                  <div
                    key={index}
                    className="px-5 py-1 rounded-full  border bg-background shadow-sm text-lg w-fit"
                  >
                    {skill?.name}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="h-[1px] w-full bg-foreground/10"></div>

          {/* Portfolio */}
          <div className="px-7 pb-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-3xl">Projects</h3>
              <div className="flex gap-4">
                <FiPlus className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background" />
                <MdEditNote className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-5">
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
                      className="border rounded-lg p-4  bg-background shadow-sm w-[25vw]"
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
          <div className="h-[1px] w-full bg-foreground/10 "></div>

          {/* Employment History */}
          <div className="px-7 pb-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-3xl">Employment History</h3>
              <div className="flex gap-4">
                <FiPlus className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background" />
                <MdEditNote className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
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
                      className=" border rounded-lg p-4 bg-background shadow-sm w-[25vw]"
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
          <div className="h-[1px] w-full bg-foreground/10"></div>

          {/* Education */}
          <div className="px-7 pb-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-3xl">Education</h3>
              <div className="flex gap-4">
                <FiPlus className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background" />
                <MdEditNote className="h-10 cursor-pointer w-10 p-2 rounded-full bg-primary text-background" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 ">
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
                      className="border w-[25vw] rounded-lg p-4  bg-background shadow-sm"
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
        </div>
      </div>
      {openDialog && comp && method && (
        <ConfigureDialog method={method} comp={comp} onClose={handleOnClose} />
      )}
    </div>
  );
}

export default Profile;
