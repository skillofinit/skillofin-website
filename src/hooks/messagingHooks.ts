import { useToast } from "@/components/ui/use-toast";
import { sendMessageAPI } from "@/services/messageApi";
import { useAppContext } from "@/utiles/AppContext";
import { useMutation } from "@tanstack/react-query";

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
      } else if (data?.message === "CONTACT_INFO_NOT_ALLOWED") {
        toast({
          duration: 3000,
          variant: "destructive",
          title: "Suspicious Message",
          description: "Sharing contact details is not allowed.",
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
