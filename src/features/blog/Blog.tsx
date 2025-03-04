/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeFooter from "@/utils/HomeFooter";
import HomeNavBar from "@/utils/HomeNavBar";
import { useEffect, useState } from "react";
import PostBlog from "./utils/PostBlog";
import AppSpiner from "@/utiles/AppSpiner";
import { useBlogs } from "@/hooks/userHooks";
import { timeAgo } from "@/utiles/appUtils";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function Blog() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { blog, isPending } = useBlogs();
  const [refresh, setRefresh] = useState<any>(undefined);
  const [allBlogs, setAllBlogs] = useState<any>(undefined);
  const [editBlog, setEditBlog] = useState<any>();
  const [expandedPosts, setExpandedPosts] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    blog(undefined, {
      onSuccess(data) {
        if (data?.message === "SUCCESS") {
          setAllBlogs(data?.data ?? []);
        }
      },
    });
  }, [refresh]);

  function handleDeleteBlogClick(id: string) {
    blog(
      { id },
      {
        onSuccess(data) {
          if (data?.message === "SUCCESS") {
            setAllBlogs(data?.data ?? []);
          }
        },
      }
    );
  }

  const toggleReadMore = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (isPending) return <AppSpiner />;

  return (
    <div className="w-full justify-between overflow-auto h-full">
      <div className="flex h-full flex-col gap-2">
        <div>
          <HomeNavBar />
        </div>
        <div className="flex flex-grow flex-col gap-2 w-full p-4">
          <div className="w-full flex justify-end">
            {localStorage.getItem("emailId") ===
              (import.meta.env.VITE_ADMIN_EMAILID as string) && (
              <Button
                onClick={() => setOpenDialog(true)}
                className="w-fit"
              >
                Post blog
              </Button>
            )}
          </div>
          {(allBlogs?.length === 0 || !allBlogs) && (
            <div className="w-full flex items-center justify-center min-h-[60vh] lg:text-xl text-center">
              <p>No blogs available at the moment. Please check back later for updates!</p>
            </div>
          )}

          <div className="grid lg:grid-cols-1 gap-5">
            {allBlogs?.map((post:any, index:number) => {
              const wordLimit = 200;
              const words = post.content.split(" ");
              const isExpanded = expandedPosts[post._id] ?? false;
              const truncatedContent = words.slice(0, wordLimit).join(" ") + "...";

              return (
                <div
                  key={index}
                  className="p-4 border shadow-md rounded-lg bg-background flex flex-col gap-2"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full">
                        <img className="rounded-full" alt="profile" src={"favicon.png"} />
                      </div>
                      <div className="font-semibold">@{"Skillofin"}</div>
                      <div className="text-xs lg:text-sm text-foreground/60">
                        • {timeAgo(post.updatedAt)}
                      </div>
                    </div>
                    {localStorage.getItem("emailId") ===
                      (import.meta.env.VITE_ADMIN_EMAILID as string) && (
                      <div className="flex items-center gap-3">
                        <FaRegEdit
                          className="h-7 w-7 p-1 rounded-md bg-foreground/5 cursor-pointer"
                          onClick={() => {
                            setOpenDialog(true);
                            setEditBlog(post);
                          }}
                        />
                        <MdDelete
                          className="h-8 w-8 p-1 rounded-md bg-foreground/5 text-destructive cursor-pointer"
                          onClick={() => handleDeleteBlogClick(post._id)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="text-lg font-medium text-foreground">
                    {post.title}
                  </div>

                  <div className="custom-blog-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: isExpanded ? post.content : truncatedContent,
                      }}
                    />
                  </div>

                  {words.length > wordLimit && (
                    <button
                      onClick={() => toggleReadMore(post._id)}
                      className="text-blue-500 text-sm font-medium mt-2"
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                  )}

                  {post.image && (
                    <img
                      src={post.image}
                      alt="post"
                      className="h-fit max-h-[50vh] w-full object-fill rounded-lg"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-fit">
          <HomeFooter />
        </div>
      </div>

      {openDialog && (
        <PostBlog
          refresh={() => setRefresh(!refresh)}
          onClose={() => {
            setOpenDialog(false);
            setEditBlog(undefined);
          }}
          editBlog={editBlog}
        />
      )}
    </div>
  );
}

export default Blog;
