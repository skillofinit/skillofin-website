/* eslint-disable @typescript-eslint/no-explicit-any */
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/utiles/AppContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "@/hooks/authHooks";
import { useNavigate } from "react-router-dom";

interface CreateAccountInterface {
  handleGoBackClick: () => void;
}

function CreateAccount({ handleGoBackClick }: CreateAccountInterface) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [step, setStep] = useState(0);

  const { temp } = useAppContext();
  const { isPending, signup } = useSignup();
  const navigate = useNavigate(); 

  function handleSignUp(e: any) {
    signup(
      {
        emailId: e.emailId,
        firstName: e.firstName,
        password: e.password,
        role: temp === "Client" ? "client" : "freelancer",
        lastName: e.lastName,
        otp: e?.otp ?? null,
      },
      {
        onSuccess(data) {
          if (data?.message === "OTP_SUCCESS") {
            setStep(1);
          }
        },
      }
    );
  }

  return (
    <div className="flex flex-col items-center justify-center lg:mt-10 p-4 lg:p-0">
      <div>
        <h3 className=" text-4xl font-serif text-center">
          Sign up to find work you love
        </h3>
      </div>
      <div className="w-fit">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="lg:w-[30vw] mt-10 flex flex-col gap-5 items-center"
        >
          {step === 0 ? (
            <div className="w-full flex flex-col lg:gap-5 gap-2">
              <div className="w-full flex lg:flex-row flex-col items-center lg:gap-4 gap-2 ">
                <Input
                  placeholder="First Name"
                  className="w-full "
                  mandatory
                  errorMessage={errors?.firstName?.message}
                  {...register("firstName", {
                    minLength: 3,
                    required: "Please enter First Name",
                  })}
                  iconName="firstName"
                />

                <Input
                  placeholder="Last Name"
                  className="w-full "
                  iconName="lastName"
                  {...register("lastName", {
                    required: false,
                  })}
                />
              </div>
              <Input
                placeholder="Email Id"
                className="w-full "
                mandatory
                iconName="emailId"
                errorMessage={errors?.emailId?.message}
                {...register("emailId", {
                  pattern: /^\S+@\S+\.\S+$/,

                  required: "Please enter Email ID",
                })}
              />
              <Input
                placeholder="Password (8 or more characters)"
                className="w-full "
                mandatory
                iconName="password"
                type="password"
                errorMessage={errors?.password?.message}
                {...register("password", {
                  required: "Please enter Password",
                })}
              />
              <div className="w-[98%]">
                <CountryDropdown
                  placeholder="Select country"
                  defaultValue="USA"
                />
              </div>{" "}
            </div>
          ) : (
            <div className="w-[90%] lg:w-[60%]">
              <Input
                placeholder="Enter OTP sended to email"
                className="w-full "
                mandatory
                iconName="enterOTP"
                errorMessage={errors?.otp?.message}
                {...register("otp", {
                  required: "Please enter otp sended to Email",
                })}
              />
            </div>
          )}
          <div className="lg:w-[60%] lg:mt-5">
            <Button isPending={isPending} className="py-6">
              {step === 0 ? "Create my account" : "Sign Up"}
            </Button>
          </div>
          <div className="flex items-center ml-4">
            <p className="text">Already have an account?</p>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              type="button"
              className="-ml-1"
              variant={"link"}
            >
              Log In
            </Button>
          </div>

          <div className="flex items-center ml-4 -mt-8">
            <p className="text">{`Not a ${temp} ?`}</p>
            <Button
              type="button"
              onClick={handleGoBackClick}
              className="-ml-1"
              variant={"link"}
            >
              Go Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
