/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetMe, useSendMessage } from "@/hooks/userHooks";
import { useAppContext } from "@/utiles/AppContext";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import { BiLeftArrowAlt } from "react-icons/bi";
import AnimatedImage from "@/utils/AnimatedImage";
import { useLocation } from "react-router-dom";

function Messaging() {
  const { userData } = useAppContext();
  const [selectedMessageUser, setSelectedMessageUser] =
    useState<any>(undefined);
  const [selectedMessageKey, setSelectedMessageKey] = useState("");

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { isPending, sendMessage } = useSendMessage();
  const messagesEndRef = useRef(null);
  const { getMe, isPending: isLoading } = useGetMe();

  const [messages, setMessages] = useState<any[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const {state} = useLocation()

  useEffect(()=>{
    if(state?.emailId){
      setSelectedMessageKey(state?.emailId)
    }

  },[state])



  useEffect(() => {
    if (selectedMessageKey && messages !== undefined) {
      const socketUrl = `wss://websocketconnect-b5o4.onrender.com/?senderEmail=${userData?.userData?.emailId}&receiverEmail=${selectedMessageKey}`;
      const socket = new WebSocket(socketUrl);
      socket.onopen = () => {
        setWs(socket);
      };
      socket.onmessage = (event: MessageEvent) => {
        const [sender, msgContent] = event.data.split(":");
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: sender.replace(/\./g, "_"),
            receiver: userData?.userData?.emailId,
            content: msgContent,
          },
        ]);
        setTimeout(() => {
          if (messagesEndRef.current) {
            (messagesEndRef.current as any)?.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }
        }, 200);
      };

      return () => {
        socket.close();
      };
    }
  }, [selectedMessageKey, messages]); // This can be optimized as mentioned below

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
    setMessages(
      userData?.userData?.messages[selectedMessageKey?.replace(/\./g, "_")]
        ?.messages ?? []
    );
  }, [userData, selectedMessageKey]);


  function handleMessageUserClick(key: string) {
    setSelectedMessageKey(key.replace(/\_/g, "."));
  }

  function handleOnSubmitClick(e: any) {
    sendMessage(
      {
        message: e?.message,
        receiver: selectedMessageKey,
      },
      {
        onSuccess(data) {
          if (data?.message === "SUCCESS") {
            if (ws) {
              const messageToSend = `${userData?.userData?.emailId}:${e?.message}`;
              ws.send(messageToSend);
            }
            reset();
          }
        },
      }
    );
  }

  return (
    <div className="h-[80vh] w-[100vw]  lg:min-w-[80vw] flex  lg:border lg:shadow-lg">
      {/* Sidebar */}
      <div
        className={`lg:w-[25vw] w-full lg:border-r ${
          selectedMessageUser ? "hidden lg:block" : ""
        } `}  
      >
        <h2 className="px-6 py-4 text-lg font-semibold lg:border-b ">
          Messages
        </h2>
        {Object?.keys(userData?.userData?.messages ?? [])?.map(
          (key: string, index: number) => (
            <div
              onClick={() => {
                handleMessageUserClick(key);
              }}
              key={index}
              className="px-6 py-3 cursor-pointer hover:bg-foreground/5 lg:border-b flex justify-between items-center w-[100vw] lg:w-full bg-foreground/5 lg:bg-background"
            >
              <div className="flex items-center gap-4 relative w-full">
                <AnimatedImage
                  src={
                    userData?.userData?.messages[key]?.profile ?? "no-user.webp"
                  }
                  alt="profile"
                  className="h-12 w-12 rounded-full border object-cover"
                />

                <div className="flex justify-between w-full items-center">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium">
                      {userData?.userData?.messages[key]?.name}
                    </h3>
                    <p className={``}>
                      {userData?.userData?.messages[key]?.messages[
                        userData?.userData?.messages[key]?.messages?.length - 1
                      ]?.content && userData?.userData?.messages[key]?.messages[
                        userData?.userData?.messages[key]?.messages?.length - 1
                      ]?.content?.slice(0, 25) + "..."}
                    </p>
                  </div>
                  {userData?.userData?.messages[key]?.messages?.length -
                    userData?.userData?.messages[key]?.read >
                    0 && (
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-background">
                      {userData?.userData?.messages[key]?.messages?.length -
                        userData?.userData?.messages[key]?.read}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div
        className={`w-[100vw] lg:w-full h-[90vh] lg:h-full ${
          !selectedMessageUser ? "hidden lg:flex" : "lg:flex"
        } `}
      >
        {/* Chat Section */}
        {selectedMessageUser && (
          <div className="flex flex-col justify-between w-full h-full">
            {/* Chat Header */}
            <div className="px-6 py-3 shadow-md border-b bg-background flex items-center gap-4">
              <BiLeftArrowAlt
                className=" lg:hidden p-2 bg-white shadow-md w-10 h-10 rounded-lg"
                onClick={() => {
                  setSelectedMessageUser(undefined);
                  setSelectedMessageKey("");
                }}
              />
              <AnimatedImage
                src={selectedMessageUser?.profile ?? "no-user.webp"}
                alt="profile"
                className="h-12 w-12 rounded-full border object-cover"
              />
              <h3 className="text-xl font-medium">
                {selectedMessageUser?.name}
              </h3>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[30vh]">
              {messages?.map((msg: any, index: number) => (
                <div
                  key={index}
                  className={`p-3 w-fit rounded-lg ${
                    msg?.sender?.replace(/\_/g, ".") ===
                    userData?.userData?.emailId
                      ? "bg-primary text-white ml-auto"
                      : "bg-foreground/5 text-gray-800"
                  }`}
                >
                  <p className="text-sm ">{msg?.content}</p>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit(handleOnSubmitClick)}>
              <div className="px-5 py-2 border-t  gap-2 bg-background flex flex-col  items-center">
                {ws?.readyState !== WebSocket.OPEN && (
                  <div>
                    <Button
                      type="button"
                      onClick={() => {
                        getMe(undefined);
                      }}
                      variant={"outline"}
                      isPending={isLoading}
                      className=" p-2 rounded-md h-7 "
                    >
                      <div className="flex items-center gap-2">
                        <IoIosRefresh className={"animate-spin"} />
                      </div>
                    </Button>
                  </div>
                )}

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
                  {ws?.readyState === WebSocket.OPEN && selectedMessageKey && (
                    <Button
                    
                      isPending={isPending || (ws?.readyState !== WebSocket.OPEN)}
                      className=" text-white p-2 rounded-md "
                    >
                      Send <IoSend size={20} />
                    </Button>
                  )}
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
    </div>
  );
}

export default Messaging;
