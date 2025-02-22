import HomeNavBar from "@/utils/HomeNavBar";
import { useEffect, useState } from "react";
import HomeFooter from "@/utils/HomeFooter";
import SelectAccountType from "./SelectAccountType";
import CreateAccount from "./CreateAccount";
import { useAppContext } from "@/utiles/AppContext";

function SignUp() {
  const [selectedJoinType, setSelectedJoinType] = useState<
    "Client" | "Freelancer" | "Bank" | ""
  >("Client");
  const { dispatch, temp } = useAppContext();

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (temp) {
      setSelectedJoinType(temp);
    } else {
      setSelectedJoinType("");
    }
  }, []);

  function handleChangeJoinType(value: string) {
    setSelectedJoinType(value as "Client" | "Freelancer" | "Bank" | "");
    dispatch({
      type: "setTemp",
      payload: value,
    });
  }
  function triggerCreateAccountClick() {
    setStep(1);
  }
  function handleGoBackClick(){
    setStep(0)
    dispatch({
      type: "setTemp",
      payload: "",
    });

  }

  return (
    <div className="w-[100vw]  h-[100vh] text-foreground flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        <HomeNavBar  />
        {step === 0 ? (
          <SelectAccountType
            handleChangeJoinType={handleChangeJoinType}
            selectedJoinType={selectedJoinType}
            triggerCreateAccountClick={triggerCreateAccountClick}
          />
        ) : (
          <CreateAccount handleGoBackClick={handleGoBackClick} />
        )}
      </div>
      <div className="pb-4">
        <HomeFooter />
      </div>
    </div>
  );
}

export default SignUp;
