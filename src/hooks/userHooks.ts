/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  blogsAPI,
  getMeAPI,
  logoutAPI,
  resetPasswordAPI,
  updateProfileAPI,
  uplaodProfieImageAPI,
} from "@/services/userApi";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/utiles/AppContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useGetMe() {
  const { dispatch } = useAppContext();
  let providedEmailId: string | undefined = undefined;

  const {
    isPending,
    data,
    mutate: getMe,
  } = useMutation({
    mutationFn: (emailId?: string) => {
      providedEmailId = emailId;
      return getMeAPI(emailId);
    },
    onSuccess(data) {
      if (data?.message === "SUCCESS" && !providedEmailId) {
        dispatch({
          type: "setUser",
          payload: {
            loggedIn: true,
            data: data?.data,
          },
        });
      }
    },
  });

  return {
    isPending,
    data,
    getMe,
  };
}

export function useUpdateProfile() {
  const { dispatch } = useAppContext();
  const { toast } = useToast();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (data: any) => updateProfileAPI(data),
    onSuccess(data) {
      if (data?.message === "SUCCESS") {
        dispatch({
          type: "setUser",
          payload: {
            loggedIn: true,
            data: data?.data,
          },
        });
        toast({
          duration: 3000,
          variant: "constructive",
          title: "Success",
          description: "Successfully updated",
        });
      } else {
        toast({
          duration: 3000,
          variant: "destructive",
          title: "Please try again",
          description:
            "Something went wrong, Please try again after some time!",
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
  return { isPending, updateProfile };
}

export function useUplaodProfileImage() {
  const { dispatch } = useAppContext();
  const { toast } = useToast();

  const { mutate: uplaodProfileImage, isPending } = useMutation({
    mutationFn: (data: { image: string }) => uplaodProfieImageAPI(data),
    onSuccess(data) {
      if (data?.message === "SUCCESS") {
        dispatch({
          type: "setUser",
          payload: {
            loggedIn: true,
            data: data?.data,
          },
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
  return { isPending, uplaodProfileImage };
}
export function useLogout() {
  const { dispatch } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutAPI(),
    onSuccess(data) {
      if (data?.message === "SUCCESS") {
        localStorage.removeItem("emailId");
        dispatch({
          type: "setUser",
          payload: {
            loggedIn: false,
            data: undefined,
          },
        });
        navigate("/");
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
  return { isPending, logout };
}

export function useResetPassword() {
  const { toast } = useToast();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (data: any) => resetPasswordAPI(data),

    onError() {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Please try again",
        description: "Something went wrong, Please try again after some time!",
      });
    },
  });
  return { isPending, resetPassword };
}
export function useBlogs() {
  const { mutate: blog, isPending } = useMutation({
    mutationFn: (data?: any) => blogsAPI(data),
  });
  return { isPending, blog };
}
