/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginApi, signupApi } from "@/services/authApi";
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    data,
  } = useMutation({
    mutationFn: (values: { emailId: string; password: string; otp?: string }) =>
      loginApi(values),
    onSuccess(data) {
      if (data?.message === "OTP_SUCCESS") {
        toast({
          duration: 3000,
          variant: "constructive",
          title: "Otp Sent",
          description: "We Sent a OTP for given Email Id",
        });
      } else if (data?.message === "SUCCESS") {
        localStorage.setItem("authToken", data?.authToken);

        navigate("/dashboard  ");
      } else if (data?.message === "USER_NOT_FOUND") {
        toast({
          duration: 3000,
          variant: "destructive",
          title: "User Not Found",
          description: "User not found,Please sign up to use skillofin",
        });
      } else if (data?.message === "INVALID_OTP") {
        toast({
          duration: 3000,
          variant: "destructive",
          title: "Wrong Otp",
          description: "You entered invalid Otp!",
        });
      } else if (data?.message === "INVALID_PASSWORD") {
        toast({
          duration: 3000,
          variant: "destructive",
          title: "Wrong password",
          description: "You entered wrong password!",
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
  return { login, isPending, data };
}
