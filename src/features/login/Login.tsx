/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/authHooks";
import HomeFooter from "@/utils/HomeFooter";
import HomeNavBar from "@/utils/HomeNavBar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [step, setStep] = useState<number>(0);
  const { isPending, login } = useLogin();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [stateNavigateTo, setStateNavigateTo] = useState<any>();

  useEffect(() => {
    if (state) {
      setStateNavigateTo(state);
    }
  }, [state]);

  function handleLoginClick(e: any) {
    login(
      {
        emailId: e.emailId,
        password: e.password,
        otp: e?.otp ?? null,
      },
      {
        onSuccess(data) {
          if (data?.message === "OTP_SUCCESS") {
            setStep(1);
          } else if (data?.message === "SUCCESS") {
            if (stateNavigateTo?.navigateTo) {
              navigate(stateNavigateTo?.navigateTo, {
                state: {
                  pricing: stateNavigateTo?.pricing,
                  amount: stateNavigateTo?.amount,
                  plan: stateNavigateTo?.plan,
                },
              });
            } else navigate("/feed");
          }
        },
      }
    );
  }

  return (
    <div className="w-full h-full   flex flex-col justify-between">
      <div className="flex flex-col h-full gap-5  w-full ">
        <HomeNavBar />

        <div className="w-full h-full flex  lg:flex-row flex-col items-center justify-center lg:gap-10 p-4 lg:p-0 ">
          <div className="lg:h-[40vh] lg:w-[30vw]">
            <img
              alt="login"
              src="login.jpg"
              className="lg:h-[40vh] lg:w-[30vw]  lg:flex"
            />
          </div>
          <div className="bg-foreground w-[1px] h-[70%] hidden lg:flex"></div>
          <div className=" rounded-xl border-foreground/10 lg:px-10 lg:py-7 px-0 py-0 flex flex-col items-center gap-8">
            <h3 className="text-4xl px-10 lg:px-0  text-center font-serif ">
              Log in to SkilloFin
            </h3>
            <form
              onSubmit={handleSubmit(handleLoginClick)}
              className="flex flex-col gap-3  lg:w-[25vw] items-center lg:mt-6"
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
                    type="password"
                    iconName="password"
                    placeholder="Password"
                    mandatory
                    errorMessage={errors?.emailId?.message}
                    {...register("password", {
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
              <Button
                className="py-6 px-10 lg:px-0 lg:w-[10vw]"
                isPending={isPending}
              >
                Log In
              </Button>
              <div className="flex flex-col items-center gap-3  lg:mt-10 ">
                <div className="text flex gap-3 items-center">
                  <div className="h-[1px] bg-foreground w-3 lg:w-10"></div>
                  <p>Don't have an SkilloFin account</p>
                  <div className="h-[1px] bg-foreground w-3 lg:w-10"></div>
                </div>
                <Button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  type="button"
                  className="px-10 "
                  variant={"outline"}
                >
                  Sign Up
                </Button>
              </div>
            </form>

            <div className="flex items-center">
              Forgot your password?{" "}
              <Button
                variant={"link"}
                onClick={() => navigate("/forgotpassword")}
              >
                Reset here
              </Button>
            </div>
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
