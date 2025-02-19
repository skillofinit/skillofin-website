import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppDialog from "@/utiles/AppDilaog";
import { useCreatePost } from "@/hooks/userHooks";
import AppSpiner from "@/utiles/AppSpiner";

interface PostFormValues {
  title: string;
  content: string;
}

function CreatePost() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>();
  const { createPost, isPending } = useCreatePost();

  const onSubmit = (data: PostFormValues) => {
    createPost(data, {
      onSuccess(data) {
        if (data?.message === "SUCCESS") {
          navigate(-1);
        }
      },
    });
  };

  return (
    <AppDialog title="Create Post" onClose={() => navigate(-1)}>
        {
            isPending && <AppSpiner />
        }
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input
            iconName="text"
            placeholder="Enter post title"
            {...register("title", { required: "Title is required" })}
            errorMessage={errors.title?.message}
          />
        </div>

        {/* Content Textarea */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">Content</label>
          <div>
            <div className="relative">
              <Textarea
                placeholder="What's on your mind?"
                {...register("content", { required: "Content is required" })}
                className="pr-10"
              />
            </div>
            {errors.content && (
              <div className=" ml-3 text-red-500">{errors.content.message}</div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Post
        </Button>
      </form>
    </AppDialog>
  );
}

export default CreatePost;
