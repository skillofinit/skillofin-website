/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppDialog from "@/utiles/AppDilaog";
import { useBlogs } from "@/hooks/userHooks";
import { useUplaodImage } from "@/hooks/appHooks";
import { FaAsterisk } from "react-icons/fa6";
import { useState } from "react";
import { VscVerified } from "react-icons/vsc";

interface PostFormValues {
  title: string;
  content: string;
}

interface PostBlogDialogInterface {
  onClose: () => void;
  refresh: () => void;
}

function PostBlog({ onClose, refresh }: PostBlogDialogInterface) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>();
  const { blog: postBlog, isPending } = useBlogs();
  const { isPending: uplaodingImage, uploadImage } = useUplaodImage();
  const [selectedImage, setSelectedImage] = useState<File | undefined>();

  const onSubmit = (data: PostFormValues) => {
    if (selectedImage) {
      uploadImage(selectedImage, {
        onSuccess(url) {
          if (url) {
            postBlog(
              { ...data, image: url },
              {
                onSuccess(data) {
                  if (data?.message === "SUCCESS") {
                    refresh();
                    onClose();
                  }
                },
              }
            );
          }
        },
      });
    } else {
      postBlog(data, {
        onSuccess(data) {
          if (data?.message === "SUCCESS") {
            onClose();
            refresh();
          }
        },
      });
    }
  };

  return (
    <AppDialog
      title="Blog Post"
      startFromRight={true}
      onClose={() => onClose()}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4   w-[80vw] lg:w-[25vw] "
      >
        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Blog title
          </label>
          <Input
            mandatory
            iconName="text"
            placeholder="Enter blog title"
            {...register("title", { required: "Title is required" })}
            errorMessage={errors.title?.message}
          />
        </div>

        {/* Content Textarea */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            {" "}
            Blog content
          </label>
          <div>
            <div className="relative flex items-center gap-2">
              <Textarea
                placeholder="What's on your mind?"
                {...register("content", { required: "Content is required" })}
                className="pr-10 h-32"
              />
              <div className="h-2 w-2">
                <FaAsterisk className="text-destructive h-2 w-2" />
              </div>
            </div>
            {errors.content && (
              <div className=" ml-3 text-red-500">{errors.content.message}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground ">
            Select Image
          </label>
          <input
            type="file"
            className="hidden"
            id="fileClick"
            accept="image/*"
            onChange={(e: any) => {
              if (e?.target?.files[0]) setSelectedImage(e?.target?.files[0]);
            }}
          />
          <div className="flex lg:flex-row flex-col lg:items-center gap-2">
            <div
              className=" border px-3 border-foreground py-1 w-fit text-nowrap rounded-md cursor-pointer flex  items-center gap-2"
              onClick={() => {
                document.getElementById("fileClick")?.click();
              }}
            >
              Select File
              {selectedImage && (
                <div>
                  <VscVerified className="text-constructive" />
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500"> {selectedImage?.name} </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-20">
          <Button
            isPending={uplaodingImage || isPending}
            type="submit"
            className="w-full"
          >
            Post
          </Button>
        </div>
      </form>
    </AppDialog>
  );
}

export default PostBlog;
