/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreatePost } from "@/hooks/postHooks";
import { useAppContext } from "@/utiles/AppContext";
import AppSpiner from "@/utiles/AppSpiner";
import { timeAgo } from "@/utiles/appUtils";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";

function Dashboard() {
  const { userData } = useAppContext();
  const [allPosts, setAllPosts] = useState<any>();
  const [commentInput, setCommentInput] = useState<string>("");
  const [openCommentSectionIndex, setOpenCommentSectionIndex] = useState<
    undefined | number
  >(undefined);
  const { createPost, isPending } = useCreatePost();

  useEffect(() => {
    setAllPosts(userData?.allPosts);
  }, [userData]);

  function handleLikePost(index: number) {
    setAllPosts((prevPosts: any) => {
      if (!prevPosts) return prevPosts;
      const updatedPosts = [...prevPosts];
      const userFullName =
        userData?.userData?.firstName +
        " " +
        (userData?.userData?.lastName ?? "");
      const isLiked = updatedPosts[index]?.likes?.includes(userFullName);
      if (isLiked) {
        updatedPosts[index].likes = updatedPosts[index]?.likes?.filter(
          (like: string) => like !== userFullName
        );
      } else {
        updatedPosts[index].likes = [
          ...(updatedPosts[index]?.likes ?? []),
          userFullName,
        ];
      }
      return updatedPosts;
    });
  }

  function handleAddComment(index: number) {
    if (commentInput.trim() === "") return;
    setAllPosts((prevPosts: any) => {
      if (!prevPosts) return prevPosts;
      const updatedPosts = [...prevPosts];
      const newComment = {
        name:
          userData?.userData?.firstName + " " + userData?.userData?.lastName,
        commentText: commentInput,
      };
      updatedPosts[index].comments = [
        ...(updatedPosts[index]?.comments ?? []),
        newComment,
      ];
      return updatedPosts;
    });

    setCommentInput("");
  }

  return (
    <div className="w-full h-full flex flex-col gap-10">
      {
        isPending && <AppSpiner bgColor="bg-foreground/50" />
      }
      <div className="flex flex-row items-center px-4 mt-10 lg:mt-0 lg:px-20 gap-10 justify-center">
        <div className="lg:w-fit min-h-[75vh] flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-5">
            {allPosts?.map(
              (
                post: {
                  profile: string;
                  title: string;
                  content: string;
                  createdAt: string;
                  emailId: string;
                  name: string;
                  image: string;
                  likes: [string];
                  comments: {
                    name: string;
                    commentText: string;
                    profile: string;
                  }[];
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="border shadow-md p-4 lg:w-[30vw] rounded-lg bg-background flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        className="rounded-full"
                        alt="profile"
                        src={post?.profile ? post?.profile : "no-user.png"}
                      />
                    </div>
                    <div className="font-semibold">@{post?.name}</div>
                    <div className="text-xs lg:text-sm text-foreground/60">
                      • {timeAgo(post?.createdAt)}
                    </div>
                  </div>

                  <div className="text-lg font-medium text-foreground">
                    {post.title}
                  </div>
                  <div className="text-gray-600">{post.content}</div>

                  {post.image && (
                    <img
                      src={post.image}
                      alt="post"
                      className="h-fit max-h-[50vh] w-full object-fill rounded-lg"
                    />
                  )}

                  <div className="flex justify-between mt-2 text-gray-500 px-10">
                    <div
                      className="flex items-center gap-1 hover:scale-105 cursor-pointer"
                      onClick={() => {
                        handleLikePost(index);
                      }}
                    >
                      <FaHeart
                        size={18}
                        className={`${
                          post?.likes?.filter((name) =>
                            name.includes(userData?.userData?.firstName)
                          )?.length > 0
                            ? "text-destructive"
                            : ""
                        }`}
                      />{" "}
                      Like{` (${post?.likes?.length})`}
                    </div>
                    <div
                      className={`flex items-center gap-1 hover:scale-105 cursor-pointer ${
                        openCommentSectionIndex === index && "text-blue-500"
                      }`}
                      onClick={() => {
                        if (openCommentSectionIndex !== index) {
                          setOpenCommentSectionIndex(index);
                        } else {
                          setOpenCommentSectionIndex(undefined);
                        }
                      }}
                    >
                      <MessageCircle size={18} /> Comment
                    </div>
                  </div>

                  {/* Comment Section */}
                  {index === openCommentSectionIndex && (
                    <div className="mt-4">
                      <div className="text-foreground/80 font-medium">
                        Comments:
                      </div>
                      {post.comments?.length === 0 && (
                        <div className="mt-2">No comemnts Yet!</div>
                      )}
                      <div className="space-y-2 mt-2  max-h-[20vh] overflow-auto">
                        {post.comments?.map((comment, idx) => (
                          <div
                            key={idx}
                            className="text-sm flex  text-left items- gap-3 text-foreground/60  p-3 rounded-md border"
                          >
                            <div className="h-10  w-10">
                              <img
                                alt="profile"
                                src={`${
                                  comment?.profile
                                    ? comment?.profile
                                    : "no-user.png"
                                }`}
                                className="h-8 w-8 lg:w-8 lg:h-8 rounded-full border"
                              />
                            </div>

                            <div className="flex flex-col w-[20vw]">
                              <p className="text-foreground text-nowrap">
                                {comment.name}
                              </p>
                              {comment.commentText}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <input
                          type="text"
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Write a comment..."
                          className="p-2 w-full border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleAddComment(index)}
                          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
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
