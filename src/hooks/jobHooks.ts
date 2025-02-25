/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/components/ui/use-toast";
import {
  approveBidAPI,
  createPaymentAPI,
  deletePostedAPI,
  getJobsAPI,
  postJobAPI,
  submitBidAPI,
  verifyPaymentAPI,
} from "@/services/jobApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

export function useApproveBid() {
  const { toast } = useToast();
  const Navigate = useNavigate();

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
        Navigate("/messages");
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

export function useCreatePayment() {
  const { toast } = useToast();

  const { mutate: createPayment, isPending } = useMutation({
    mutationFn: (data: { amount: string }) => createPaymentAPI(data),

    onError() {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Please try again",
        description: "Something went wrong, Please try again after some time!",
      });
    },
  });
  return { isPending, createPayment };
}
export function useVerifyPayment() {
  const { toast } = useToast();

  const { mutate: verifyPayment, isPending } = useMutation({
    mutationFn: (data: any) => verifyPaymentAPI(data),

    onError() {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Please try again",
        description: "Something went wrong, Please try again after some time!",
      });
    },
  });
  return { isPending, verifyPayment };
}
