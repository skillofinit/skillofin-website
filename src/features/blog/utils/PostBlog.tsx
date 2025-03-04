/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import AppDialog from "@/utiles/AppDilaog";
import { useBlogs } from "@/hooks/userHooks";
import { useUplaodImage } from "@/hooks/appHooks";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VscVerified } from "react-icons/vsc";

interface PostBlogDialogInterface {
  onClose: () => void;
  refresh: () => void;
  editBlog?: any;
}

export default function StunningPostBlog({
  onClose,
  refresh,
  editBlog,
}: PostBlogDialogInterface) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { blog: postBlog, isPending } = useBlogs();
  const { isPending: uploadingImage, uploadImage } = useUplaodImage();
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (editBlog) {
      setValue("title", editBlog?.title);
      setContent(editBlog?.content);
      setValue("image", editBlog?.image);
    }
  }, [editBlog]);

  const onSubmit = (data: any) => {
    const postData = {
      ...data,
      content,
      edit: editBlog ? true : undefined,
      id: editBlog?._id,
    };

    if (selectedImage) {
      uploadImage(selectedImage, {
        onSuccess(url) {
          if (url) {
            postBlog(
              { ...postData, image: url },
              {
                onSuccess(response) {
                  if (response?.message === "SUCCESS") {
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
      postBlog(postData, {
        onSuccess(response) {
          if (response?.message === "SUCCESS") {
            refresh();
            onClose();
          }
        },
      });
    }
  };

  return (
    <AppDialog title="Create Blog Post" startFromRight onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 lg:p-6 lg:w-[30vw] mb-10 "
      >
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-gray-700">
            Blog Title
          </label>
          <Input
            placeholder="Enter your blog title"
            {...register("title", { required: "Title is required" })}
            errorMessage={errors.title?.message}
            className="shadow-md rounded-md"
          />
        </div>

        {/* Rich Text Editor for Blog Content */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-gray-700">
            Blog Content
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Write your content here..."
            className="rounded-md shadow-md "
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "align",
              "link",
            ]}
          />
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
              className=" px-8  py-2  w-fit rounded-md text-nowrap cursor-pointer flex  items-center gap-2 bg-blue-600 text-background"
              onClick={() => {
                document.getElementById("fileClick")?.click();
              }}
            >
              Select File
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              {" "}
              {selectedImage?.name}{" "}
              {selectedImage && (
                <div>
                  <VscVerified className="text-constructive mt-1" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 ">
          <Button
            type="submit"
            className="w-fit"
            isPending={uploadingImage || isPending}
          >
            {
              editBlog?"Edit Blog":"Post Blog"
            }
            
          </Button>
        </div>
      </form>
    </AppDialog>
  );
}
