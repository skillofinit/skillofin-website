import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { LiaUserLockSolid } from "react-icons/lia";
import { TbUserSearch } from "react-icons/tb";
import { TbUserDollar } from "react-icons/tb";

interface JoinCardInterface {
  type: "Client" | "Freelancer" | "Bank";
  desc: string;
  selectedType: "Client" | "Freelancer" | "Bank" | "";
  ontrigger: (type: "Client" | "Freelancer" | "Bank" | "") => void;
}

function JoinCard({ desc, type, selectedType, ontrigger }: JoinCardInterface) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (selectedType === type) {
      setValue(selectedType);
    } else {
      setValue("");
    }
  }, [selectedType]);

  function handleValueChange() {
    if (!value) {
      setValue(type);
    } else {
      setValue("");
    }
    ontrigger(value ? "" : type);
  }

  return (
    <div
      onClick={handleValueChange}
      className="rounded-md lg:hover:bg-gray-50 p-5 border-gray-800  border w-[80vw] lg:w-[25vw] cursor-pointer lg:hover:border-2  h-fit flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        {type === "Client" ? (
          <LiaUserLockSolid className="w-6 h-6" />
        ) : type === "Freelancer" ? (
          <TbUserSearch className="w-6 h-6" />
        ) : (
          <TbUserDollar className="w-6 h-6" />
        )}

        <div>
          <RadioGroup value={value}>
            <RadioGroupItem value={type} className="w-6 h-6" />
          </RadioGroup>
        </div>
      </div>
      <p className="text-2xl lg:w-[15vw] mt-2">{desc}</p>
    </div>
  );
}

export default JoinCard;
