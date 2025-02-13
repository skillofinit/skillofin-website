import { Button } from "@/components/ui/button";
import { MdEditNote, MdOutlineLocationOn } from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";

function Profile() {
  return (
    <div className="border mb-10  overflow-auto  w-[90vw] rounded-lg min-h-[100vh]  ">
      <div className="p-6 flex justify-between items-center">
        <div className="flex gap-5">
          <div className="relative">
            <img
              alt="profile"
              src="profile.jpg"
              className="w-28 h-28 rounded-full"
            />
            <div className="absolute rounded-full w-7 h-7 flex items-center justify-center bottom-1 right-2 bg-primary text-background cursor-pointer ">
              <TbPhotoEdit className="w-4 h-4 " />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h3 className="text-4xl font-semibold">Shaik Afrid</h3>
            <p className=" ml-1 text-foreground/60 text-lg">Freelancer</p>
            <div className="flex items-center mt-2 gap-2">
              <MdOutlineLocationOn className="w-4 h-4" />
              <p className="text-lg   ">
                Hyderabad, India – 3:01 am local time
              </p>
            </div>
          </div>
        </div>
        <div>
          <Button className="py-6 px-10">Account Settings</Button>
        </div>
      </div>

      <div className="h-[1px] w-full bg-foreground/20"></div>

      <div className="flex ">
        <div className="flex flex-col border-r border-foreground/20 min-h-[60vh] min-w-[25vw]">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex flex-col ">
              <h5 className="text-xl font-semibold">$50</h5>
              <p className="text-lg text-foreground/70">Total earnings</p>
            </div>
            <div className="flex flex-col ">
              <h5 className="text-xl font-semibold">1</h5>
              <p className="text-lg  text-foreground/70">Total jobs</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-foreground/10 "></div>
          <div className="p-5">
            <div className="p-5 gap-5 bg-gray-100 rounded-lg flex flex-col">
              <div className="text-xl ml-4 font-medium">Connects: 95</div>
              <div className="flex items-center justify-between">
                <Button variant={"link"}>View Details</Button>
                <div className="w-[1px] h-4 bg-foreground/10 "></div>
                <Button variant={"link"}>Buy connects</Button>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-foreground/10 "></div>

          <div className="p-7 flex flex-col mt-5">
            <div className="flex items-center justify-between">
              <div className="text-2xl">Cost per hour</div>
              <MdEditNote className="h-10 flex items-center justify-center pr-1 cursor-pointer w-10 p-2 rounded-full bg-primary text-background" />
            </div>
            <div className="text-xl ml-1 font-medium mt-1">$4.00/hr </div>
          </div>
          <div className="h-[1px] w-full bg-foreground/10 "></div>
          <div className="p-7 flex flex-col mt-5">
            <div className="flex items-center justify-between">
              <div className="text-2xl">Languages</div>
              <div className="flex gap-4">
                <FiPlus className="h-10 flex items-center justify-center  cursor-pointer w-10 p-2 rounded-full bg-primary text-background" />
                <MdEditNote className="h-10 flex items-center justify-center pr-1 cursor-pointer w-10 p-2 rounded-full bg-primary text-background" />
              </div>
            </div>
            <div className="text-lg   mt-4  flex flex-col gap-3 ">
              <div className="flex  items-center gap-4">
                <h5 className="w-20 text-nowrap flex items-center justify-between gap-3 ">
                  Telugu <span>:</span>
                </h5>
                <p className="text-foreground/60">Fluent</p>
              </div>
              <div className="flex  items-center gap-4">
                <h5 className="w-20 text-nowrap flex items-center justify-between gap-3 ">
                  Urdu <span>:</span>
                </h5>
                <p className="text-foreground/60">Native</p>
              </div>
              <div className="flex  items-center gap-4">
                <h5 className="w-20 text-nowrap flex items-center justify-between gap-3 ">
                  English <span>:</span>
                </h5>
                <p className="text-foreground/60">Fluent</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Profile;
