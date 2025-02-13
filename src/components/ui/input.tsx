/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { cn } from "@/lib/utils";
import { MdOutlineEmail, MdOutlinePhoneInTalk ,MdFormatColorText} from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { LiaUserSolid } from "react-icons/lia";
import { RiLockPasswordLine, RiUserAddLine } from "react-icons/ri";
import { TbPassword } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { FaDollarSign, FaAsterisk } from "react-icons/fa";
import { BiMinusBack } from "react-icons/bi";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconName?: string;
  mandatory?: boolean;
  errorMessage?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconName, mandatory, errorMessage, ...props }, ref) => {
    function getIcon(): any {
      if (iconName === "emailId") {
        return <MdOutlineEmail className="w-4 h-4 text-foreground" />;
      } else if (iconName === "password") {
        return <IoKeyOutline className="w-4 h-4 text-foreground" />;
      } else if (iconName === "firstName") {
        return <LiaUserSolid className="w-4 h-4 text-foreground" />;
      } else if (iconName === "lastName") {
        return <RiUserAddLine className="w-4 h-4 text-foreground" />;
      } else if (iconName === "phoneNumber") {
        return <MdOutlinePhoneInTalk className="w-4 h-4 text-foreground" />;
      } else if (iconName === "reEnterPassword") {
        return <RiLockPasswordLine className="w-4 h-4 text-foreground" />;
      } else if (iconName === "enterOTP") {
        return <TbPassword className="w-4 h-4 text-foreground" />;
      } else if (iconName === "dlr") {
        return <FaDollarSign className="w-4 h-4 text-foreground" />;
      } 
      else if (iconName === "search") {
        return <CiSearch className="w-4 h-4 text-foreground" />;
      }
      else if (iconName === "text") {
        return <MdFormatColorText className="w-4 h-4 text-foreground" />;
      }
      
      else if (iconName === "skill") {
        return <BiMinusBack className="w-4 h-4 text-foreground" />;
      }

    }

    return (
      <div className="w-full">
        <div className="flex flex-row w-full items-center gap-1">
          <div className=" flex items-center gap-2 border border-foreground/60 rounded-md w-full px-2  focus-within:ring-1 focus-within:ring-ring ">
            <div> {iconName && getIcon()}</div>
            <div className="w-full">
              <input
                type={type}
                className={cn(
                  "flex w-full h-10  outline-none text-foreground ",
                  className
                )}
                ref={ref}
                {...props}
              />
            </div>
          </div>
          <div className="h-2 w-2">
            {mandatory ? (
              <FaAsterisk className="text-destructive h-2 w-2" />
            ) : null}
          </div>
        </div>

        <div className="h-4 text-destructive ml-2 text-[12px]">
          {errorMessage}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
