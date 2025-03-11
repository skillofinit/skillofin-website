import { Button } from "@/components/ui/button";
import JoinCard from "./JoinCard";
import { useNavigate } from "react-router-dom";

interface SelectAccountTypeInterface {
  selectedJoinType: "Client" | "Freelancer" | "Bank" | "";
  handleChangeJoinType: (value: "" | "Client" | "Freelancer" | "Bank") => void;
  triggerCreateAccountClick: () => void;
}
function SelectAccountType({
  selectedJoinType,
  handleChangeJoinType,
  triggerCreateAccountClick,
}: SelectAccountTypeInterface) {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center  mt-10 p-4 lg:p-0">
      <h3 className="text-4xl font-medium  font-serif">
        Join as a client,freelancer or bank
      </h3>
      <div className="flex lg:flex-row flex-col items-center gap-5 lg:gap-10 mt-10">
        <JoinCard
          desc="I’m a client, hiring for a project"
          type="Client"
          selectedType={selectedJoinType}
          ontrigger={handleChangeJoinType}
        />

        <JoinCard
          desc="I’m a freelancer, looking for work"
          type="Freelancer"
          selectedType={selectedJoinType}
          ontrigger={handleChangeJoinType}
        />
      </div>
      <div className="mt-5">
        <JoinCard
          desc="I’m bank, looking to give funds"
          type="Bank"
          selectedType={selectedJoinType}
          ontrigger={handleChangeJoinType}
        />
      </div>

      <div className="mt-10 ">
        <Button
          onClick={triggerCreateAccountClick}
          className="py-6 px-10"
          disabled={!selectedJoinType}
        >
          {selectedJoinType
            ? `Join as a ${selectedJoinType}`
            : "Create Account"}
        </Button>
      </div>
      <div className="flex items-center pl-4">
        <p className="text">Already have an account?</p>
        <Button
          onClick={() => {
            navigate("/login");
          }}
          className="-ml-1"
          variant={"link"}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}

export default SelectAccountType;
