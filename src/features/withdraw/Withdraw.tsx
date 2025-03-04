/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/utiles/AppContext";
import { useForm } from "react-hook-form";
import { FaRegBuilding } from "react-icons/fa"; // Import icons

function Withdraw() {
  const { userData } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleWithdrawSubmit(e: any) {
    console.log(e);
  }

  return (
    <div className="  p-8 flex flex-row lg:gap-10 items-center w-full">
      <div className="bg-red-400">
        <img src="payment.jpg" className="hidden lg:flex w-[50vw] " />
      </div>
      <div className="w-[1px] h-full bg-foreground/40 min-h-[70vh] hidden lg:flex"></div>
      <div className=" flex flex-col lg:ml-20 w-full lg:w-fit  ">
        <div className="flex items-center gap-2 ">
          <h2 className="text-2xl font-bold">Withdraw funds</h2>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="balance" className="font-medium text-lg">
              Available Balance
            </label>
            <div className="text-lg text-gray-600">${0}</div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount" className="font-medium text-lg">
              Withdrawal Amount
            </label>
            <form
              onSubmit={handleSubmit(handleWithdrawSubmit)}
              className="lg:w-[30vw] flex lg:flex-row  lg:gap-4 flex-col items-center"
            >
              <Input
                type="number"
                iconName="dlr"
                id="amount"
                className="h-12"
                errorMessage={errors?.amount?.message}
                mandatory
                placeholder="Enter amount to withdraw"
                {...register("amount", {
                  required: "Please enter amount",
                  min: { value: 1, message: "Amount must be at least $1" },
                })}
              />
              <div className="flex lg:-mt-4 justify-center ">
                <Button type="submit" disabled className="py-6 px-6">
                  Withdraw
                </Button>
              </div>
            </form>
          </div>

          {Object.keys(userData?.userData?.bankAccountDetails || {})?.length >
            0 && (
            <div className="flex flex-col mt-6">
              <label className="font-medium text-lg ">
                Transfer to Account Details
              </label>
              <div className="flex gap-6 mt-2">
                <div
                  className={`flex items-center gap-2 cursor-pointer p-2 border rounded-md 
                    bg-primary/5 border-primary
            `}
                >
                  <FaRegBuilding className="w-5 h-5 text-primary" />
                  <span className="">Bank Account</span>
                </div>
              </div>
            </div>
          )}
          {Object.keys(userData?.userData?.bankAccountDetails || {})?.length >
            0 && (
            <div className="text-lg flex flex-col gap-3">
              {Object.keys(userData?.userData?.bankAccountDetails || {}).map(
                (key) => {
                  const value = userData?.userData?.bankAccountDetails[key];
                  if (value) {
                    return (
                      <div key={key} className="flex items-center gap-4">
                        <h5 className="text-xs w-36 justify-between flex items-center gap-3">
                          {key
                            ?.replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/^./, (str) => str.toUpperCase())}{" "}
                          <span>:</span>
                        </h5>
                        <p className="text-foreground/60 text-xs">{value}</p>
                      </div>
                    );
                  }
                  return null;
                }
              )}
            </div>
          )}
          {Object.keys(userData?.userData?.bankAccountDetails || {})?.length ===
            0 && (
            <div className="text-destructive">
              Please add bank account details to withdray
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
