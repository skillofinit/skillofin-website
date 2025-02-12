/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HomeFooter from "@/utils/HomeFooter";
import HomeNavBar from "@/utils/HomeNavBar";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [step, setStep] = useState<number>(0);

  function handleLoginClick(e: any) {
    console.timeLog(e);
    setStep(1);
  }

  return (
    <div className="w-full h-full   flex flex-col justify-between">
      <div className="flex flex-col h-full gap-5 items-center">
        <HomeNavBar displayLogo={true} />

        <div className="w-full h-full flex items-center justify-center p-4 lg:p-0 ">
          <div className="lg:border rounded-xl border-foreground/10 lg:px-10 lg:py-7 px-0 py-0 flex flex-col items-center gap-8">
            <h3 className="text-4xl px-10 lg:px-0  text-center">Log in to SkilloFin</h3>
            <form
              onSubmit={handleSubmit(handleLoginClick)}
              className="flex flex-col gap-3  lg:w-[25vw] items-center mt-6"
            >
              {step === 0 ? (
                <div className="flex flex-col w-full">
                  <Input
                    iconName="emailId"
                    placeholder="Email Id"
                    mandatory
                    errorMessage={errors?.emailId?.message}
                    {...register("emailId", {
                      required: "Plese enter your Email Id",
                    })}
                  />

                  <Input
                    iconName="password"
                    placeholder="Password"
                    mandatory
                    errorMessage={errors?.emailId?.message}
                    {...register("emailId", {
                      required: "Plese enter your Password",
                    })}
                  />
                </div>
              ) : (
                <Input
                  iconName="enterOTP"
                  placeholder="OTP"
                  mandatory
                  errorMessage={errors?.otp?.message}
                  {...register("otp", {
                    required: "Plese enter OTP",
                  })}
                />
              )}
              <Button className="py-6 px-10 lg:px-0 lg:w-[10vw]  ">
                Log In
              </Button>
              <div className="flex flex-col items-center gap-3  mt-10 ">
                <div className="text flex gap-3 items-center">
                  <div className="h-[1px] bg-foreground w-3 lg:w-10"></div>
                  <p className="lg:text-lg ">Don't have an SkilloFin account</p>
                  <div className="h-[1px] bg-foreground w-3 lg:w-10"></div>
                </div>
                <Button type="button" className="px-10 " variant={"outline"}>
                  Sign Up
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

export default Login;
