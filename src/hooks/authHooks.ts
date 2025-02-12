/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginApi, signupApi } from "@/api/authApi";
import { useToast } from "@/components/ui/use-toast";
import { userSignUpPayloadType } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    mutate: signup,
    isPending,
    data,
  } = useMutation({
    mutationFn: (values: userSignUpPayloadType) => signupApi(values),
    onSuccess(data) {
      if (data?.message === "OTP_SUCCESS") {
        toast({
          duration: 3000,
          variant: "constructive",
          title: "Otp Sent",
          description: "We Sent a OTP for given Email Id",
        });
      } else if (data?.message === "SUCCESS") {
        toast({
          duration: 3000,
          variant: "constructive",
          title: "Created successfully",
          description: "Your account created successfully",
        });
        navigate("/login");
      } else if (data?.message === "USER_EXISTS") {
        toast({
          duration: 3000,
          variant: "destructive",
          title: "User Exists",
          description: "User already exists!",
        });
      } else if (data?.message === "INVALID_OTP") {
        toast({
          duration: 3000,
          variant: "destructive",
          title: "Wrong Otp",
          description: "You entered invalid Otp!",
        });
      }
    },
    onError() {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Please try again",
        description: "Something went wrong, Please try again after some time!",
      });
    },
  });
  return { signup, isPending, data };
}

export function useLogin() {
  const {
    mutate: login,
    isPending,
    data,
  } = useMutation({ mutationFn: (values) => loginApi(values) });
  return { login, isPending, data };
}
