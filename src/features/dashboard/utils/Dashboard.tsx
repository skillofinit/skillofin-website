import { useAppContext } from "@/utiles/AppContext";
import { timeAgo } from "@/utiles/appUtils";

function Dashboard() {
  const { userData } = useAppContext();

  return (
    <div className="w-full  h-full flex flex-col gap-10">
      <div className="flex flex-row items-center px-4 mt-10 lg:mt-0 lg:px-20 gap-10 justify-center">
        <div className=" lg:w-fit   min-h-[75vh] flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-5 ">
            {userData?.allPosts?.map(
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
                  className=" border shadow-md p-4 lg:w-[30vw] rounded-lg bg-background flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10  rounded-full">
                      <img
                        className="rounded-full"
                        alt="profile"
                        src={post?.profile ? post?.profile : "no-user.png"}
                      />
                    </div>
                    <div className="font-semibold">@{post?.name}</div>
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
      </div>
    </div>
  );
}

export default Dashboard;
