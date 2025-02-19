import { Button } from "@/components/ui/button";
import { useAppContext } from "@/utiles/AppContext";
import DashBoardHighlightCard from "./DashBoardHighlightCard";
import { timeAgo } from "@/utiles/appUtils";
import HomeFooter from "@/utils/HomeFooter";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { userData } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="w-full  h-full flex flex-col gap-10">
      <div className="flex flex-row  px-4 mt-10 lg:mt-0 lg:px-20 gap-10 justify-between">
        <div className=" lg:w-[80%]  min-h-[100vh] flex flex-col gap-4">
          <DashBoardHighlightCard />

          <div className="grid grid-cols-1 gap-5">
            {userData?.posts?.map(
              (
                post: {
                  profile: string;
                  title: string;
                  content: string;
                  createdAt: string;
                  emailId: string;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className=" border shadow-md p-4 lg:w-[30vw] rounded-lg bg-white flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
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

        <div className="w-[30%] gap-4 h-fit p-4 lg:flex flex-col border rounded-lg hidden">
          <div className="text-xl font-semibold">Quick Links</div>
          <div className="gap-3 grid grid-cols-3  ">
            <Button
              className="w-[10vw]"
              variant="outline"
              onClick={() => {
                navigate("/createpost");
              }}
            >
              Create Post
            </Button>


            <Button
              className="w-[10vw]"
              variant="outline"
              onClick={() => {
                navigate("/myjobs");
              }}
            >
              My jobs
            </Button>

            <Button onClick={()=>{navigate("/myprofile")}} className="w-[10vw]" variant="outline">
              My Profile
            </Button>
            <Button className="w-[10vw]" variant="outline" onClick={()=>{navigate("/messages")}} >
              Messages
            </Button>
          </div>
        </div>
      </div>
      <div className="pb-5">
        <HomeFooter />
      </div>
    </div>
  );
}

export default Dashboard;
