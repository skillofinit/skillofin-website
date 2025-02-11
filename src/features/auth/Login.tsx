/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "@/hooks/authHooks";
import { useToast } from "@/components/ui/use-toast";
import AppSpiner from "@/utiles/AppSpiner";

function Login() {
  const { register, handleSubmit, formState,watch} = useForm();
  const{login,isPending}= useLogin()
  const { errors } = formState;
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();
  const {toast} = useToast()
  
  function handelSignupClick() {
    navigate("/signup");
  }

 function handelSendOtpClick(values:any){
  if(step===1){
    //ALREADY_LOGGED_IN
    login(values,{
      onSuccess(data){
        if(data.message === "SUCCESS"){
          toast({
            title: "Success",
            description:"OTP sent!",
            variant:"constructive"
          })
          setStep(2)
        }else if (data.message === "INVALID_PASSWORD") {
          toast({
            title: "Error",
            description:"Wrong password!",
            variant:"destructive"
          })
        }else if (data.message === "USER_NOT_FOUND") {
          toast({
            title: "Error",
            description:"User not found!",
            variant:"destructive"
          })

      }
   } })
  }else if(step === 2){
    handleLoginClick(values)
  }
 }

 function handleLoginClick(values:any){
  login(values,{
    onSuccess(data){
      if(data.message === "ERROR"){
        toast({
          title: "Error",
          description:"Invalid OTP!",
          variant:"destructive"
        })

      }else if(data.message === "SUCCESS"){
        localStorage.setItem("emailId", values?.emailId);
       const emailId= localStorage.getItem("emailId");
       console.log(emailId)
        
      }
    }
  })
 }


  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      {isPending && <AppSpiner/>}
      

      <div>
        <img src="login.png" className="h-[30vh]" />
      </div>
      <div className="flex w-full justify-center font-semibold text-3xl">
        Welcome Back 👋
      </div>
      <div className="flex w-full justify-center mt-2 text-lg">
        Login To Your Account
      </div>
      <div className="w-[80vw] h-[40vh] border border-black  mt-16 rounded-lg flex flex-col items-center gap-4 justify-between pb-6">
        <div className=" text-lg rounded-t-lg w-full py-2 flex justify-center text-background font-semibold  bg-blue-500">
          LOGIN HERE 👇
        </div>

        <form
          className="gap-3 flex flex-col w-[90%]"
          onSubmit={handleSubmit((values) => {
            handelSendOtpClick(values);
          })}
        >{
          step ===1 ?<div>
            <Input
              {...register("emailId", { required: "Please enter Email Id" })}
              className="w-full "
              placeholder="Email Id"
              iconName="emailId"
              mandatory={true}
              errorMessage={errors?.emailId?.message}
              value={watch("emailId") ?? ""}
            />
            <Input
              {...register("password", { required: "please enter password" })}
              className="w-full "
              placeholder="Password"
              iconName="password"
              mandatory={true}
              errorMessage={errors?.password?.message}
              value={watch("password") ?? ""}
            />
          </div>:<div>
            <Input {...register("otp", { required: "please enter OTP" })}
              className="w-full "
              placeholder="Enter OTP"
              iconName="enterOTP "
              mandatory={true}
              errorMessage={errors?.otp?.message}
              value={watch("otp") ?? ""}/>
              
          </div>
          
        }
          <div className="w-full h-full flex justify-center mt-3">
            <Button className="w-[70%] shadow-xl drop-shadow-xl" type="submit">
              {step === 1 ? "Send OTP" : "Login"}
            </Button>
          </div>
          <div className="flex flex-row w-full h-full justify-center items-center">
            <div className="text-[10px]">Don't have an account?</div>
            <div>
              <Button
                className="text-blue-700 border-b-0 "
                variant={"link"}
                onClick={handelSignupClick}
                type="button"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
