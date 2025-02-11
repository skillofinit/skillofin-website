import { sendEmailAPI } from "@/api/EmailApi";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

export function useSendEmail() {
  const { toast } = useToast();

  const {
    data,
    isPending,
    mutate: sendEmail,
  } = useMutation({
    mutationFn: (values: {
      toEmail: string;
      body: string;
      title: string;
      subject: string;
    }) => sendEmailAPI(values),
    onSuccess(data) {
      if (data === "SUCCESS") {
        toast({
          variant: "constructive",
          title: "Success",
          description:
            "We will get back to you soon as possible,Thaks for contacting us",
          duration: 2000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something Went Wrong,Please try again after sometime",
          duration: 2000,
        });
      }
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something Went Wrong,Please try again after sometime",
        duration: 2000,
      });
    },
  });

  return { sendEmail, isPending, data };
}
