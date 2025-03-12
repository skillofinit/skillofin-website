/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useWithdrawAmount } from "@/hooks/userHooks";
import { useAppContext } from "@/utiles/AppContext";
import AppSpiner from "@/utiles/AppSpiner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Withdraw() {
  const { userData } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [amount, setAmount] = useState<number>(0);
  const { isPending, withdrawAmount } = useWithdrawAmount();

  useEffect(() => {
    setAmount(userData?.userData?.amount ?? 0);
  }, [userData]);

  function handleWithdrawSubmit(e: any) {
    withdrawAmount(
      {
        amount: parseInt(e?.amount) ,
      },
      {
        onSuccess(data) {
          if (data?.message === "SUCCESS") {
            toast({
              duration: 3000,
              variant: "constructive",
              title: "Success",
              description:
                "Withdraw success",
            });
            setAmount(amount - (parseInt(watch("amount")) * 100));
          }
        },
      }
    );
  }

  return (
    <div className="  p-8 flex flex-row lg:gap-10 items-center w-full">
      {isPending && <AppSpiner />}
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
            <div className="text-lg text-constructive font-mono font-semibold ">
              ${amount / 100} USD
            </div>
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
                <Button
                  type="submit"
                  disabled={
                    !(userData?.userData?.onBoardStatus === "VERIFIED") ||
                    watch("amount") * 100 > amount ||
                    amount === 0
                  }
                  className="py-6 px-6"
                >
                  Withdraw
                </Button>
              </div>
            </form>
            <div>
              {(userData?.userData?.onBoardStatus === "STARTED" ||
                userData?.userData?.onBoardStatus === "PENDING" ||
                !userData?.userData?.onBoardStatus) && (
                <label className="text-destructive">
                  Complete the KYC in profile to withdraw amount
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <div className="flex flex-col ml-2 gap-4 ">
              <div className="w-full flex items-center justify-between">
                <div className="font-semibold ">Bank account details </div>

                {userData?.userData?.onBoardStatus !== "VERIFIED" && (
                  <div className="flex items-center gap-1">
                    <div
                      className={
                        userData?.userData?.onBoardStatus === "STARTED" ||
                        userData?.userData?.onBoardStatus === "PENDING" ||
                        !userData?.userData?.onBoardStatus
                          ? `text-orange-500`
                          : ""
                      }
                    >
                      Pending
                    </div>
                    {(userData?.userData?.onBoardStatus === "STARTED" ||
                      userData?.userData?.onBoardStatus === "PENDING" ||
                      !userData?.userData?.onBoardStatus) && (
                      <div>
                        <IoAlertCircleOutline className="text-orange-500 w-6 h-6" />
                      </div>
                    )}
                  </div>
                )}
                {userData?.userData?.onBoardStatus === "VERIFIED" && (
                  <div className="flex items-center gap-1 text-constructive">
                    <div className={""}>Verified</div>
                    {
                      <div>
                        <MdVerified className="text-constructive w-6 h-6" />
                      </div>
                    }
                  </div>
                )}
              </div>
              {userData?.userData?.onBoardStatus === "PENDING" && (
                <label className="text-xs text-destructive">
                  Need more information to complete KYC, Click on Complete KYC
                  to continue.
                </label>
              )}
              {(userData?.userData?.onBoardStatus === "STARTED" ||
                !userData?.userData?.onBoardStatus) && (
                <label className="text-xs text-destructive">
                  Complete kyc to withdraw funds to your account.
                </label>
              )}
              {userData?.userData?.onBoardStatus === "VERIFIED" && (
                <div className="w-full flex flex-col gap-3">
                  <div className="flex items-center gap-0 w-full justify-between  text-center text-xs lg:text-md">
                    <div className=" w-[40vw] lg:w-[10vw] py-1 font-semibold bg-foreground/5 px-2 justify-between flex itemcs-center rounded">
                      Account holder name
                    </div>
                    <div>
                      {userData?.userData?.bankAccountDetails
                        ?.accountHolderName ??
                        userData?.userData?.firstName +
                          " " +
                          (userData?.userData?.lastName ?? "")}
                    </div>
                  </div>
                  <div className="flex items-center gap-0 w-full justify-between  text-center text-xs lg:text-md">
                    <div className=" w-[40vw] lg:w-[10vw] py-1 font-semibold bg-foreground/5 px-2 justify-between flex itemcs-center rounded">
                      Bank name
                    </div>
                    <div>
                      {userData?.userData?.bankAccountDetails?.bankName ??
                        "Unknown"}
                    </div>
                  </div>
                  <div className="flex items-center gap-0 w-full justify-between  text-center text-xs lg:text-md">
                    <div className=" w-[40vw] lg:w-[10vw] py-1 font-semibold bg-foreground/5 px-2 justify-between flex itemcs-center rounded">
                      bank account number
                    </div>
                    <div>
                      {"**** **** **** " +
                        userData?.userData?.bankAccountDetails?.bankNumber}
                    </div>
                  </div>
                  <div className="flex items-center gap-0 w-full justify-between  text-center text-xs lg:text-md">
                    <div className=" w-[40vw] lg:w-[10vw] py-1 font-semibold bg-foreground/5 px-2 justify-between flex itemcs-center rounded">
                      Routing number
                    </div>
                    <div>
                      {userData?.userData?.bankAccountDetails
                        ?.bankRoutingNumber ?? "Unknown"}
                    </div>
                  </div>

                  <div className="flex items-center gap-0 w-full justify-between  text-center text-xs lg:text-md">
                    <div className=" w-[40vw] lg:w-[10vw] py-1 font-semibold bg-foreground/5 px-2 justify-between flex itemcs-center rounded">
                      Account currency
                    </div>
                    <div>
                      {userData?.userData?.bankAccountDetails
                        ?.accountCurrency ?? "Unknown"}
                    </div>
                  </div>
                </div>
              )}
              <Button
                className="py-3 mt-2"
                onClick={() => {
                  navigate("/kyc");
                }}
              >
                {userData?.userData?.onBoardStatus !== "VERIFIED"
                  ? "Complete KYC"
                  : "Edit Details"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
