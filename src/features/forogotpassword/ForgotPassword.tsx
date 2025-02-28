/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useResetPassword } from "@/hooks/userHooks";
import HomeFooter from "@/utils/HomeFooter";
import HomeNavBar from "@/utils/HomeNavBar";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState<number>(0);

  const { register, formState, handleSubmit, setError, clearErrors, watch } =
    useForm();
  const { errors } = formState;
  const { isPending, resetPassword } = useResetPassword();
  const { toast } = useToast();
  const navigate = useNavigate();

  function handleResetPassword(e: any) {
    resetPassword(e, {
      onSuccess(data) {
        if (data?.message === "OTP_SUCCESS" || data?.message === "SUCCESS") {
          if (step === 0) {
            setStep(1);
            toast({
              duration: 3000,
              variant: "constructive",
              title: "Success",
              description: `OTP successfully sent to entered Email id`,
            });
          } else if (step === 1) {
            setStep(2);
            toast({
              duration: 3000,
              variant: "constructive",
              title: "Success",
              description: `Please set your new password`,
            });
          } else {
            toast({
              duration: 3000,
              variant: "constructive",
              title: "Success",
              description: `Successfully reseted password`,
            });
            navigate("/login");
          }
        }
      },
    });

   
  }

  function validatePassword(e: any) {
    const password = e?.target?.value;

    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (regex.test(password)) {
      clearErrors("passwordOne");
    } else {
      setTimeout(() => {
        setError("passwordOne", {
          type: "manual",
          message:
            "Password must be 8 characters with at least one letter, one number, and one special character.",
        });
      }, 50);
    }
  }

  function handleCheckReEnterPassword(e: any) {
    const password = e?.target?.value;

    if (watch("passwordOne") === password) {
      clearErrors("passwordTwo");
    } else {
      setTimeout(() => {
        setError("passwordTwo", {
          type: "manual",
          message: "Passowrds doest match!",
        });
      }, 50);
    }
  }

  return (
    <div className="w-full h-full flex justify-between   flex-col">
      <div className="flex flex-col gap-4 h-full">
        <div>
          <HomeNavBar />
        </div>
        <div className="flex items-center  h-full   lg:w-[80vw]   lg:justify-between lg:flex-row flex-col">
          <div className="lg:w-[40vw] lg:h-[60vh] w-[90vw] h-[30vh]">
            <img
              alt="forgot password"
              src="forgotpassword.png"
              className="lg:w-[40vw] lg:h-[60vh] w-[90vw] h-[30vh]"
            />
          </div>
          <div className="bg-foreground w-[1px] min-h-[60vh] hidden lg:flex"></div>
          <div className="flex flex-col items-center">
            <label className="font-semibold text-4xl  ">Reset password</label>
            <form
              className=" w-[90vw]  lg:w-[20vw] mt-[6vh] items-center flex flex-col"
              onSubmit={handleSubmit(handleResetPassword)}
            >
              {step === 0 && (
                <Input
                  mandatory
                  placeholder="Email Id"
                  iconName="emailId"
                  {...register("emailId", {
                    required: "Please enter Email id",
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                  errorMessage={errors?.emailId?.message as string}
                />
              )}

              {step === 1 && (
                <Input
                  type="number"
                  mandatory
                  placeholder="OTP"
                  iconName="enterOTP"
                  {...register("otp", {
                    required: "Please enter Otp",
                  })}
                  errorMessage={errors?.otp?.message as string}
                />
              )}

              {step === 2 && (
                <div className="flex flex-col gap-7 w-full">
                  <Input
                    mandatory
                    placeholder="Password"
                    iconName="password"
                    {...register("passwordOne", {
                      required: "Please enter Password",
                      onChange: validatePassword,
                    })}
                    errorMessage={errors?.passwordOne?.message as string}
                  />
                  <Input
                    type="password"
                    mandatory
                    placeholder="Re enter password"
                    iconName="password"
                    {...register("passwordTwo", {
                      required: "Please Re enter password",
                      onChange: handleCheckReEnterPassword,
                      pattern:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    })}
                    errorMessage={errors?.passwordTwo?.message as string}
                  />
                </div>
              )}

              <div className="mt-6">
              <Button isPending={isPending} className="px-10 py-6   w-fit">
                {step === 0
                  ? "Send Otp"
                  : step === 1
                  ? "Validate"
                  : "Reset Password"}
              </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="pb-5">
        <HomeFooter />
      </div>
    </div>
  );
}

export default ForgotPassword;
