import { useGetMe, usePostedDelete } from "@/hooks/userHooks";
import { useAppContext } from "@/utiles/AppContext";
import AppSpiner from "@/utiles/AppSpiner";
import { timeAgo } from "@/utiles/appUtils";
import DashboardNavBar from "@/utils/DashboardNavBar";
import { MdDelete } from "react-icons/md";

function MyPosts() {
  const { userData } = useAppContext();
  const { deletePosted, isPending } = usePostedDelete();
  const { getMe, isPending: isLoading } = useGetMe();

  function handleDeleteJob(id: string) {
    deletePosted(
      { method: "post", id },
      {
        onSettled(data) {
          if (data?.message === "SUCCESS") {
            getMe(undefined);
          }
        },
      }
    );
  }

  return (
    <div className="w-full h-full flex flex-col ">
      {(isPending || isLoading) && <AppSpiner bgColor="bg-foreground/50" />}

      <DashboardNavBar />
      <div className="flex flex-col items-start justify-end px-4 lg:px-10 mt-5 gap-6">
        {userData?.userData?.posts?.length === 0 && (
          <div className="flex  items-center justify-center min-h-[60vh] w-full">
            <div className="text-xl">No posts yet</div>
          </div>
        )}
        {userData?.userData?.posts?.length > 0 && (
          <div className="flex ">
            <div className="text-2xl lg:text-3xl font-semibold ">My posts</div>
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
                  <div className="font-semibold">@{post?.emailId}</div>
                  <div className="text-xs lg:text-sm  text-gray-500">
                    • {timeAgo(post?.createdAt)}
                  </div>
                </div>
                <div>
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
