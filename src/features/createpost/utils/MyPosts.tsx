/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMe } from "@/hooks/userHooks";
import { useAppContext } from "@/utiles/AppContext";
import AppSpiner from "@/utiles/AppSpiner";
import { timeAgo } from "@/utiles/appUtils";
import { MdDelete, MdEditNote } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { usePostedDelete } from "@/hooks/jobHooks";

function MyPosts() {
  const { userData } = useAppContext();
  const { deletePosted, isPending } = usePostedDelete();
  const { getMe, isPending: isLoading } = useGetMe();
  const navigate = useNavigate();

  function handleDeleteJob(id: string) {
    deletePosted(
      { method: "post", credentials: "include", id },
      {
        onSettled(data) {
          if (data?.message === "SUCCESS") {
            getMe(undefined);
          }
        },
      }
    );
  }
  function handleeditPostClick(post: any) {
    navigate("/createPost", {
      state: {
        post,
      },
    });
  }

  return (
    <div className="w-full h-full flex flex-col items-center ">
      {(isPending || isLoading) && <AppSpiner bgColor="bg-foreground/50" />}

      <div className="flex w-full justify-between px-4 lg:px-10 mt-3">
        {userData?.userData?.posts?.length > 0 && (
          <div className="flex ">
            <div className="text-2xl lg:text-3xl font-semibold ">My posts</div>
          </div>
        )}
        <Button
          onClick={() => {
            navigate("/createpost");
          }}
          className="w-fit px-10 py-6 "
          variant={"outline"}
        >
          Create Post
        </Button>
      </div>
      <div className="flex flex-col  w-fit justify-end px-4 lg:px-10 mt-5 gap-6">
        {userData?.userData?.posts?.length === 0 && (
          <div className="flex flex-col gap-4 items-center justify-center min-h-[60vh] w-full">
            <div className="text-3xl">No posts yet</div>
            <BsEmojiSmile className="h-20 w-20 text-constructive/40" />
          </div>
        )}

        {userData?.userData?.posts?.map(
          (
            post: {
              profile: string;
              title: string;
              content: string;
              createdAt: string;
              emailId: string;
              id: string;
              name: string;
              image: string;
            },
            index: number
          ) => (
            <div
              key={index}
              className=" border shadow-md p-4 lg:w-[30vw] rounded-lg bg-white flex flex-col gap-2"
            >
              <div className="flex items-center gap-3 justify-between  ">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full">
                    <img
                      alt="profile"
                      src={post?.profile ? post?.profile : "no-user.png"}
                    />
                  </div>
                  <div className="font-semibold">@{post?.name}</div>
                  <div className="text-xs lg:text-sm  text-gray-500">
                    • {timeAgo(post?.createdAt)}
                  </div>
                </div>
                <div className="flex gap-4">
                  <MdEditNote
                    onClick={() => {
                      handleeditPostClick(post);
                    }}
                    className="h-8 cursor-pointer w-8 p-1 rounded-full bg-primary text-background"
                  />
                  <MdDelete
                    onClick={() => {
                      handleDeleteJob(post?.id);
                    }}
                    className="text-destructive cursor-pointer bg-foreground/5 h-8 w-8 p-1 rounded-md"
                  />
                </div>
              </div>

              <div className="text-lg font-medium text-gray-900">
                {post.title}
              </div>
              <div className="text-gray-600">{post.content}</div>
              <div>
                <img
                  src={post.image}
                  alt="post"
                  className=" h-fit max-h-[50vh] w-full object-fill rounded-lg"
                />
              </div>

              {/* <div className="flex justify-between mt-2 text-gray-500">
                          <button className="flex items-center gap-1 hover:text-red-500">
                            <Heart size={18} /> Like
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-500">
                            <MessageCircle size={18} /> Comment
                          </button>
                          <button className="flex items-center gap-1 hover:text-green-500">
                            <Repeat2 size={18} /> Share
                          </button>
                        </div> */}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MyPosts;
