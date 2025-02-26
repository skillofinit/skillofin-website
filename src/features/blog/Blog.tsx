import HomeFooter from "@/utils/HomeFooter";
import HomeNavBar from "@/utils/HomeNavBar";
import { useEffect, useState } from "react";
import PostBlog from "./utils/PostBlog";
import AppSpiner from "@/utiles/AppSpiner";
import { useBlogs } from "@/hooks/userHooks";
import { timeAgo } from "@/utiles/appUtils";

function Blog() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { blog, isPending } = useBlogs();
  const [refresh, setRefresh] = useState<any>(undefined);
  const [allBlogs, setAllBlogs] = useState<any>(undefined);

  useEffect(() => {
    blog(undefined, {
      onSuccess(data) {
        if (data?.message === "SUCCESS") {
          console.log(data?.data);
          setAllBlogs(data?.data ?? []);
        }
      },
    });
  }, [refresh]);

  if (isPending) return <AppSpiner />;

  return (
    <div className="w-full h-[92vh] justify-between">
      <div className="flex h-full flex-col gap-2">
        <div>
          <HomeNavBar />
        </div>
        <div className="flex flex-col gap-2 w-full p-4 overflow-auto">
          <div className="w-full flex justify-end">
            {/* <Button
              onClick={() => {
                setOpenDialog(true);
              }}
              className="w-fit"
            >
              Post
            </Button> */}
          </div>
          {(allBlogs?.length === 0 || !allBlogs) && <div className="w-full flex items-center justify-center min-h-[60vh] text-2xl">No data!</div>}

          <div className="flex flex-col  items-center justify-center  gap-5 ">
            {allBlogs?.map(
              (
                post: {
                  profile: string;
                  title: string;
                  content: string;
                  createdAt: string;
                  emailId: string;
                  name: string;
                  image: string;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className=" border shadow-md p-4  lg:w-[30vw] rounded-lg bg-background flex flex-col gap-2 "
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10  rounded-full">
                      <img
                        className="rounded-full"
                        alt="profile"
                        src={"favicon.png"}
                      />
                    </div>
                    <div className="font-semibold">@{"Skillofin"}</div>
                    <div className="text-xs lg:text-sm  text-foreground/60">
                      • {timeAgo(post?.createdAt)}
                    </div>
                  </div>

                  <div className="text-lg font-medium text-foreground">
                    {post.title}
                  </div>
                  <div className="text-gray-600">{post.content}</div>
                  <div>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="post"
                        className=" h-fit max-h-[50vh] w-full object-fill rounded-lg"
                      />
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="h-fit">
        <HomeFooter />
      </div>
      {openDialog && (
        <PostBlog
          refresh={() => {
            setRefresh(!refresh);
          }}
          onClose={() => {
            setOpenDialog(false);
          }}
        />
      )}
    </div>
  );
}

export default Blog;
