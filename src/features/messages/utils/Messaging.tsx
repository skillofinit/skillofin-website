/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetMe, useSendMessage } from "@/hooks/userHooks";
import { useAppContext } from "@/utiles/AppContext";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";

function Messaging() {
  const { userData } = useAppContext();
  const [selectedMessageUser, setSelectedMessageUser] =
    useState<any>(undefined);
  const [selectedMessageKey, setSelectedMessageKey] = useState("");

  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { isPending, sendMessage } = useSendMessage();
  const messagesEndRef = useRef(null);
  const { getMe, isPending: isLoading } = useGetMe();

  useEffect(() => {
    setSelectedMessageUser(
      userData?.userData?.messages[selectedMessageKey?.replace(/\./g, "_")]
    );
    setTimeout(() => {
      if (messagesEndRef.current) {
        (messagesEndRef.current as any)?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 200);
  }, [userData, selectedMessageKey]);

  function handleMessageUserClick(key: string) {
    setSelectedMessageKey(key.replace(/\_/g, "."));
  }

  function handleOnSubmitClick(e: any) {
    console.log(e);
    sendMessage({
      message: e?.message,
      receiver: selectedMessageKey,
    });
  }

  return (
    <div className="h-[80vh] min-w-[80vw] flex  border shadow-lg">
      {/* Sidebar */}
      <div className="w-[25vw] border-r ">
        <h2 className="px-6 py-4 text-lg font-semibold border-b ">Messages</h2>
        {Object?.keys(userData?.userData?.messages ?? [])?.map(
          (key: string, index: number) => (
            <div
              onClick={() => {
                handleMessageUserClick(key);
              }}
              key={index}
              className="px-6 py-3 cursor-pointer hover:bg-foreground/5 border-b flex justify-between items-center"
            >
              <div className="flex items-center gap-4 relative">
                <img
                  alt="profile"
                  src={
                    userData?.userData?.messages[key]?.profile ?? "no-user.webp"
                  }
                  className="w-12 h-12 rounded-full border object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">
                    {userData?.userData?.messages[key]?.name}
                  </h3>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Chat Section */}
      {selectedMessageUser && (
        <div className="flex flex-col justify-between w-full h-full">
          {/* Chat Header */}
          <div className="px-6 py-3 shadow-md border-b bg-background flex items-center gap-4">
            <img
              alt="profile"
              src={selectedMessageUser?.profile ?? "no-user.webp"}
              className="w-12 h-12 rounded-full border object-cover"
            />
            <h3 className="text-xl font-medium">{selectedMessageUser?.name}</h3>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[30vh]">
            {selectedMessageUser?.messages.map((msg: any, index: number) => (
              <div
                key={index}
                className={`p-3 w-fit rounded-lg ${
                  msg?.receiver.replace(/\_/g, ".") !==
                  userData?.userData?.emailId
                    ? "bg-primary text-white ml-auto"
                    : "bg-foreground/5 text-gray-800"
                }`}
              >
                <p className="text-sm ">{msg?.content}</p>
              </div>
            ))}

            {/* Anchor point to make sure it scrolls to the bottom */}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit(handleOnSubmitClick)}>
            <div className="px-5 py-2 border-t  gap-2 bg-background flex flex-col  items-center">
              <div>
                <Button
                  type="button"
                  onClick={() => {
                    getMe();
                  }}
                  variant={"outline"}
                  isPending={isLoading}
                  className=" p-2 rounded-md h-7 "
                >
                  <div className="flex items-center gap-2">
                    Refresh <IoIosRefresh />
                  </div>
                </Button>
              </div>
              <div className="flex  w-full items-center gap-4">
                <div className="flex flex-col w-full">
                  <Textarea
                    className="resize-none flex-1 border rounded-md p-2"
                    placeholder="Type a message..."
                    {...register("message", {
                      required: "Please enter Message",
                    })}
                  />
                  <div className="text-destructive">
                    {errors?.message?.message as string}
                  </div>
                </div>
                <Button
                  isPending={isPending}
                  className=" text-white p-2 rounded-md "
                >
                  Send <IoSend size={20} />
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      {!selectedMessageUser && (
        <div className="w-full h-full text-xl  flex items-center justify-center">
          Start Messaging by selecting user
        </div>
      )}
    </div>
  );
}

export default Messaging;
