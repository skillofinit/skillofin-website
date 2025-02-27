/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import {  useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppDialog from "@/utiles/AppDilaog";
import { useGetMe } from "@/hooks/userHooks";
import { useUplaodImage } from "@/hooks/appHooks";
import { FaAsterisk } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { VscVerified } from "react-icons/vsc";
import { useCreatePost } from "@/hooks/postHooks";

interface PostFormValues {
  title: string;
  content: string;
  image: string;
  id:string
}

function CreatePost() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<PostFormValues>();
  const { createPost, isPending } = useCreatePost();
  const { isPending: uplaodingImage, uploadImage } = useUplaodImage();
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const { getMe, isPending: gettingMyDetails } = useGetMe();
  const { state } = useLocation();
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (state?.post) {
      setEdit(true);
      setValue("title", state?.post?.title);
      setValue("content", state?.post?.content.trim());
      setValue("image", state?.post?.image);
      setValue("id", state?.post?.id);
    }
  }, [state]);

  const onSubmit = (data: PostFormValues) => {
    if (selectedImage) {
      uploadImage(selectedImage, {
        onSuccess(url) {
          if (url) {
            createPost(
              { ...data, image: url, edit: edit ? true : undefined },
              {
                onSuccess(data) {
                  if (data?.message === "SUCCESS") {
                    getMe(undefined, {
                      onSuccess(data) {
                        if (data?.message === "SUCCESS") {
                          navigate("/myposts");
                        }
                      },
                    });
                  }
                },
              }
            );
          }
        },
      });
    } else {
      createPost({
        ...data,

      }, {
        onSuccess(data) {
          if (data?.message === "SUCCESS") {
            getMe(undefined, {
              onSuccess(data) {
                if (data?.message === "SUCCESS") {
                  navigate("/myposts");
                }
              },
            });
          }
        },
      });
    }
  };

  return (
    <AppDialog title="Create Post" onClose={() => navigate("/myposts")}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 w-[90vw] lg:w-[30vw]"
      >
        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input
            mandatory
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

        {watch("image") && !selectedImage && (
          <>
            <img
              src={watch("image")}
              className="rounded-md lg:w-[27vw] h-[30vh]"
            />
          </>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground ">
            {watch("image") ? "Replace Image" : "Select Image"}
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
              className=" border px-3 border-foreground py-1 w-fit rounded-md text-nowrap cursor-pointer flex  items-center gap-2"
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
        <Button
          isPending={uplaodingImage || isPending || gettingMyDetails}
          type="submit"
          className="w-full"
        >
          {edit ? "Edit" : "Post"}
        </Button>
      </form>
    </AppDialog>
  );
}

export default CreatePost;
