/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadImageAPI } from "@/services/appApi";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

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
