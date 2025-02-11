import { IoIosSend, IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";

function HomeNavBar() {
  return (
    <div className="w-full flex h-fit px-4 lg:px-8 py-2 text-background">
      <div className="flex items-center w-full justify-between">
        <img
          src="Skillofin-Logo.png"
          alt="skillofin logo"
          className="cursor-pointer w-[40vw] lg:w-[10vw] max-w-xs"
        />
        <div className="items-center gap-5 lg:flex hidden">
          <IoIosSend className="p-2 cursor-pointer hover:scale-110 hover:bg-gray-800 rounded-full w-10 h-10" />
          <IoMdMail className="p-2 cursor-pointer hover:scale-110 hover:bg-gray-800 rounded-full w-10 h-10" />
          <MdLocalPhone className="p-2 cursor-pointer hover:scale-110 hover:bg-gray-800 rounded-full w-10 h-10" />
        </div>
      </div>
    </div>
  );
}

export default HomeNavBar;
