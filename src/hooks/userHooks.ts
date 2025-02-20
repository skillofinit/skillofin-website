/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  approveBidAPI,
  createPostAPI,
  deletePostedAPI,
  getJobsAPI,
  getMeAPI,
  logoutAPI,
  postJobAPI,
  sendMessageAPI,
  submitBidAPI,
  updateProfileAPI,
  uplaodProfieImageAPI,
} from "@/api/userApi";
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
export function useSendMessage() {
  const { dispatch } = useAppContext();
  const { toast } = useToast();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: (data: { message: string; receiver: string }) =>
      sendMessageAPI(data),
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
  return { isPending, sendMessage };
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
        localStorage.removeItem("authToken");
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
export function usePostJob() {
  const { toast } = useToast();

  const { mutate: postJob, isPending } = useMutation({
    mutationFn: (data: any) => postJobAPI(data),
    onSuccess(data) {
      if (data?.message === "SUCCESS") {
        toast({
          duration: 3000,
          variant: "constructive",
          title: "Success",
          description: "Job posted successfully",
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
  return { isPending, postJob };
}
export function useGetJobs() {
  const { toast } = useToast();

  const {
    mutate: getJobs,
    isPending,
    data,
  } = useMutation({
    mutationFn: () => getJobsAPI(),

    onError() {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Please try again",
        description: "Something went wrong, Please try again after some time!",
      });
    },
  });
  return { isPending, getJobs, data };
}

export function useSubmitBid() {
  const { toast } = useToast();

  const { mutate: submitBid, isPending } = useMutation({
    mutationFn: (data: any) => submitBidAPI(data),
    onSuccess(data) {
      if (data?.message === "SUCCESS") {
        toast({
          duration: 3000,
          variant: "constructive",
          title: "Success",
          description: "Bid submitted successfully",
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
  return { isPending, submitBid };
}
export function useCreatePost() {
  const { toast } = useToast();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: (data: any) => createPostAPI(data),
    onSuccess(data) {
      if (data?.message === "SUCCESS") {
        toast({
          duration: 3000,
          variant: "constructive",
          title: "Success",
          description: "Successfully uploaded post",
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
  return { isPending, createPost };
}
export function usePostedDelete() {
  const { toast } = useToast();

  const { mutate: deletePosted, isPending } = useMutation({
    mutationFn: (data: any) => deletePostedAPI(data),
    onSuccess(data) {
      if (data?.message === "SUCCESS") {
        toast({
          duration: 3000,
          variant: "constructive",
          title: "Success",
          description: `Successfully uploaded job post`,
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
  return { isPending, deletePosted };
}
export function useApproveBid() {
  const { toast } = useToast();

  const { mutate: approvebid, isPending } = useMutation({
    mutationFn: (data: { id: string; freelancerEmailId: string }) =>
      approveBidAPI(data),
    onSuccess(data) {
      if (data?.message === "SUCCESS") {
        toast({
          duration: 3000,
          variant: "constructive",
          title: "Success",
          description: `Successfully sent approve message`,
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
  return { isPending, approvebid };
}
