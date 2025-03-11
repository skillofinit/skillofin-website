/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/components/ui/use-toast";
import { createPostAPI } from "@/services/postApi";
import { useMutation } from "@tanstack/react-query";

export function useCreatePost() {
  const { toast } = useToast();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: (data: any) => createPostAPI(data),
    
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
