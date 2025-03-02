/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import AppDialog from "@/utiles/AppDilaog";
import { useBlogs } from "@/hooks/userHooks";
import { useUplaodImage } from "@/hooks/appHooks";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PostFormValues {
  title: string;
  // content is handled via ReactQuill state
}

interface PostBlogDialogInterface {
  onClose: () => void;
  refresh: () => void;
}

export default function StunningPostBlog({
  onClose,
  refresh,
}: PostBlogDialogInterface) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>();
  const { blog: postBlog, isPending } = useBlogs();
  const { isPending: uploadingImage } = useUplaodImage();
  // const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [content, setContent] = useState<string>("");

  const onSubmit = (data: PostFormValues) => {
    const postData = { ...data, content };
    postBlog(postData, {
      onSuccess(response) {
        if (response?.message === "SUCCESS") {
          refresh();
          onClose();
        }
      },
    });
    // if (selectedImage) {
    //   uploadImage(selectedImage, {
    //     onSuccess(url) {
    //       if (url) {
    //         postBlog({ ...postData, image: url }, {
    //           onSuccess(response) {
    //             if (response?.message === "SUCCESS") {
    //               refresh();
    //               onClose();
    //             }
    //           },
    //         });
    //       }
    //     },
    //   });
    // } else {

    // }
  };

  return (
    <AppDialog
      title="Create Blog Post"
      startFromRight
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6 w-[30vw]"
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
            className="rounded-md shadow-md"
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

        {/* Image Upload */}
        {/* <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold text-gray-700">Select Image</label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={(e: any) => {
              if (e?.target?.files?.[0]) {
                setSelectedImage(e.target.files[0]);
              }
            }}
          />
          <div className="flex items-center gap-4">
            <Button
              type="button"
              onClick={() => document.getElementById("fileInput")?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Select Image
            </Button>
            {selectedImage && (
              <div className="flex items-center gap-1 text-green-600">
                <VscVerified className="w-5 h-5" />
                <span>{selectedImage.name}</span>
              </div>
            )}
          </div>
        </div> */}

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            type="submit" 
            isPending={uploadingImage || isPending}
          >
            Post Blog
          </Button>
        </div>
      </form>
    </AppDialog>
  );
}
