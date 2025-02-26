import { useToast } from "@/components/ui/use-toast";
import { createPostAPI } from "@/services/postApi";
import { useMutation } from "@tanstack/react-query";

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
