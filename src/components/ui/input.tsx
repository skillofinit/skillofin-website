/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { cn } from "@/lib/utils";
import { MdOutlineEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaAsterisk } from "react-icons/fa";
import { LiaUserSolid } from "react-icons/lia";
import { RiLockPasswordLine, RiUserAddLine } from "react-icons/ri";
import { TbPassword } from "react-icons/tb";
import { PiCurrencyInrBold } from "react-icons/pi";

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
      } else if (iconName === "INR") {
        return <PiCurrencyInrBold className="w-4 h-4 text-foreground" />;
      }
    }

    return (
      <div className="h-12">
        <div className="flex flex-row w-full h-10 items-center gap-1">
          <div className="h-9 flex items-center gap-2 border rounded-md w-full px-2  focus-within:ring-1 focus-within:ring-ring ">
            <div> {iconName && getIcon()}</div>
            <div className="w-full">
              <input
                type={type}
                className={cn(
                  "flex w-full h-full  outline-none text-foreground ",
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
        {
          <div className="text-destructive ml-2 text-[12px]">
            {errorMessage}
          </div>
        }
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
