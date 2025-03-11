/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadImageAPI } from "@/services/appApi";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { contactUsAPI } from "@/services/emailApi";

export function useUplaodImage() {
  const { toast } = useToast();
  const { mutate: uploadImage, isPending } = useMutation({
    mutationFn: (image: any) => uploadImageAPI(image),
    onError() {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Please try again",
        description: "Something went wrong, Please try again after some time!",
      });
    },
  });
  return { isPending, uploadImage };
}
export function useContactUs() {
  const { toast } = useToast();
  const { mutate: contactUs, isPending } = useMutation({
    mutationFn: (data: any) => contactUsAPI(data),
    onSuccess() {
      toast({
        duration: 2000,
        variant: "constructive",
        title: "Contacted successfully",
        description:
          "We will get back to you soon as possible,Thaks for contacting us",
      });
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
  return { isPending, contactUs };
}
