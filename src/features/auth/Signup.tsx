/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/hooks/authHooks";
import { useToast } from "@/components/ui/use-toast";
import AppSpiner from "@/utiles/AppSpiner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { IoArrowForwardOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { signup, isPending } = useSignup();
  const { register, handleSubmit, formState, watch,setError,clearErrors } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const { toast } = useToast()


  function handleLoginClick() {
    navigate("/login");
  }
  function handleNextClick(values: any) {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }else if (step === 3){

      if(watch("password") === watch("reEnterPassword")){
        clearErrors("password")
        clearErrors("reEnterPassword")
        signup(values,{
          onSuccess(data) {
            if(data.message === "SUCCESS"){
              toast({
                title: "Success",
                description: "otp Sent success",
                variant:"constructive"
              })
              setStep(4)
            }else if(data.message === "ERROR"){
              toast({
                title: "Error",
                description: "otp not Sent! ",
                variant:"destructive"
              })

            }else if(data.message === "USER_EXISTS"){
              toast({
                title: "Error",
                description: "User already exists ",
                variant:"destructive"
              })
            }
            
            
          },onError(){
            toast({
              title: "Error",
              description: "Something went wrong!",
              variant:"destructive"
            })
            
          }
        })
        
        
      }else if(watch("password") !== watch("reEnterPassword")) {
        setError("reEnterPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        setError("password", {
          type: "manual",
          message: "Passwords do not match",
        });

      }}else if(step === 4){
        handleCreateAccount(values)
        

      }
        
  }

  function handleCreateAccount(values: any){
    signup(values,{
      onSuccess(data){
        if(data.message === "SUCCESS"){
          toast({
            title:"success",
            description:"Account Created",
            variant:"constructive"
          })
         
          navigate("/login")
        }else if (data.message === "ERROR" ){
          toast({
            title:"Error",
            description:"Failed to create acoount. Try again",
            variant:"destructive"
          })
        }
      },onError(){
        toast({
          title:"Error",
          description:"Something went wrong!",
          variant:"destructive"
        })
      }
    })
  }
  function handleBackClick() {
    setStep(step - 1);
  }

  return (
    
    <div className="flex flex-col items-center">
      
    {isPending && <AppSpiner/>}
      <div>
        <img src="login.png" className="h-[30vh]" />
        <div className="w-full flex flex-col items-center gap-3">
          <div className="text-3xl">Welcome 👋</div>
          <div className="text-lg">You can Signup now</div>
        </div>
      </div>
      <div className="w-[80vw] h-[50vh] items-center border border-black mt-16 rounded-lg flex  flex-col ">
        <div className="flex flex-row w-full h-fit items-center text-white  bg-blue-500 rounded-t-lg ">
          <div className="p-4 ml-7 flex font-bold text-xl">Create Account</div>
          <VscAccount className="w-5 h-5" />
        </div>
        <form
          onSubmit={handleSubmit((values) => {
            handleNextClick(values);
          })}
        >
          {step === 1 ? (
            <div className="w-[90%] gap-3  mt-10 flex flex-col items-center">
              <Input
                {...register("firstName", {
                  required: "please enter firstName",
                })}
                placeholder="First Name"
                iconName="firstName"
                mandatory={true}
                errorMessage={errors?.firstName?.message}
                value={watch("firstName") ?? ""}
              />
              <Input
                {...register("lastName", { required: false })}
                placeholder="LastName"
                iconName="lastName"
                mandatory={false}
                errorMessage={errors?.lastName?.message}
                value={watch("lastName") ?? ""}
              />
            </div>
          ) : step === 2 ? (
            <div className="w-[90%] gap-3  mt-10 flex flex-col items-center">
              <Input
                {...register("emailId", { required: "please enter emailId" })}
                placeholder="Email id"
                iconName="emailId"
                mandatory={true}
                errorMessage={errors?.emailId?.message}
                value={watch("emailId") ?? ""}
              />
              <Input
                {...register("phoneNumber", {
                  required: "please enter phone number",
                })}
                placeholder="Phone Number"
                iconName="phoneNumber"
                mandatory={true}
                errorMessage={errors?.phoneNumber?.message}
                value={watch("phoneNumber") ?? ""}
              />
            </div>
          ) : step === 3 ? (
            <div className="w-[90%] gap-3  mt-10 flex flex-col items-center">
              <Input
                {...register("password", { required: "please enter password" })}
                placeholder="Password"
                iconName="password"
                mandatory={true}
                errorMessage={errors?.password?.message}
                value={watch("password") ?? ""}
              />
              <Input
                {...register("reEnterPassword", {
                  required: "please re enter the password",
                })}
                placeholder="Re Enter Password"
                iconName="reEnterPassword"
                mandatory={true}
                errorMessage={errors?.reEnterPassword?.message}
                value={watch("reEnterPassword") ?? ""}
              />
            </div>
          ) : (
            <div className="w-[90%] gap-3  mt-10 flex flex-col items-center">
              <Input
                {...register("otp", { required: "please enter OTP" })}
                placeholder="Enter OTP"
                iconName="enterOTP"
                mandatory={true}
                errorMessage={errors?.otp?.message}
                value={watch("otp") ?? ""}
              />
            </div>
          )}
          <div className="w-full flex justify-between p-5 mt-5 gap-8">
            <Button
              className="w-full flex justify-center"
              disabled={step === 1 ? true : false}
              onClick={handleBackClick}
              type="button"
            >
              <IoMdArrowBack />
              Back
            </Button>
            <Button className="w-full flex justify-center" type="submit" >
              {step === 3 ? "Send OTP" : step === 4 ? "Signup" : "Next"}{" "}
              <IoArrowForwardOutline />
            </Button>
          </div>
        </form>

        <div className="flex flex-row w-full items-center justify-center  ">
          <div className="text-[10px]">Already have an account?</div>
          <div>
            <Button
              className="text-blue-700 border-b-0"
              variant={"link"}
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
