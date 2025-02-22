/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetMe } from "@/hooks/userHooks";
import { useAppContext } from "@/utiles/AppContext";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import { BiLeftArrowAlt } from "react-icons/bi";
import AnimatedImage from "@/utils/AnimatedImage";
import { useLocation } from "react-router-dom";
import { truncateString } from "@/utiles/appUtils";
import AppDialog from "@/utiles/AppDilaog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FaAsterisk } from "react-icons/fa6";
import { useSendMessage } from "@/hooks/messagingHooks";

function Messaging() {
  const { userData } = useAppContext();
  const [selectedMessageUser, setSelectedMessageUser] =
    useState<any>(undefined);
  const [selectedMessageKey, setSelectedMessageKey] = useState("");

  const {
    register,
    formState,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    watch,
  } = useForm();
  const { errors } = formState;
  const { isPending, sendMessage } = useSendMessage();
  const messagesEndRef = useRef(null);
  const { getMe, isPending: isLoading } = useGetMe();

  const [messages, setMessages] = useState<any[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { state } = useLocation();
  const [userMessages, setUserMessages] = useState<any>([]);
  const [openDialog, setOpneDialog] = useState(false);

  useEffect(() => {
    if (state?.emailId) {
      setSelectedMessageKey(state?.emailId);
    }
  }, [state]);

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
    if (userData?.userData?.messages) {
      setSelectedMessageUser(
        userData?.userData?.messages[selectedMessageKey?.replace(/\./g, "_")]
      );
      setUserMessages(userData?.userData?.messages);
    }

    setTimeout(() => {
      if (messagesEndRef.current) {
        (messagesEndRef.current as any)?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 200);
    if (userData?.userData?.messages) {
      setMessages(
        userData?.userData?.messages[selectedMessageKey?.replace(/\./g, "_")]
          ?.messages ?? []
      );
    }
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

  function handleOpenCreateMilestoneDialog() {
    setOpneDialog(true);
  }

  function handleCreateMileStone(e: any) {
    console.log(e);
  }

  if (Object?.keys(userMessages ?? [])?.length === 0) {
    return (
      <div className="items-center flex justify-center w-full h-full min-h-[70vh]  text-center mt-10 text-xl">
        No Messages yet
      </div>
    );
  }

  return (
    <div className="h-[80vh]   lg:min-w-[70vw] flex  lg:border lg:shadow-lg">
      {/* Sidebar */}
      <div
        className={`lg:w-[25vw] w-full lg:border-r ${
          selectedMessageUser ? "hidden lg:block" : ""
        } `}
      >
        <h2 className="px-6 h-16 py-4 text-lg font-semibold border backdrop-blur-md shadow-md ">
          Messages
        </h2>

        {Object?.keys(userMessages ?? [])?.map((key: string, index: number) => (
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
                  userMessages[key]?.profile
                    ? userMessages[key]?.profile
                    : "no-user.webp"
                }
                alt="profile"
                className="h-12 w-12 rounded-full border object-cover"
              />

              <div className="flex justify-between w-full items-center">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">
                    {userMessages[key]?.name}
                  </h3>
                  {userMessages[key]?.messages?.length > 0 &&
                    (() => {
                      const rawHtml =
                        userMessages[key]?.messages[
                          userMessages[key]?.messages.length - 1
                        ]?.content || "";

                      const textOnly =
                        rawHtml.replace(/<[^>]*>/g, "").slice(0, 25) + "..."; // Remove HTML tags & slice

                      return <div className="text-sm">{textOnly}</div>;
                    })()}
                </div>
                {userMessages[key]?.messages?.length - userMessages[key]?.read >
                  0 && (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-background">
                    {userMessages[key]?.messages?.length -
                      userMessages[key]?.read}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`w-[100vw] lg:w-[60vw] h-[90vh] lg:h-full border-r ${
          !selectedMessageUser ? "hidden lg:flex" : "lg:flex"
        } `}
      >
        {/* Chat Section */}
        {selectedMessageUser && (
          <div className="flex flex-col justify-between w-full h-full">
            {/* Chat Header */}
            <div className="px-6 py-3 h-16 shadow-md border-b bg-background flex items-center gap-4">
              <BiLeftArrowAlt
                className=" lg:hidden p-2 bg-white shadow-md w-10 h-10 rounded-lg"
                onClick={() => {
                  setSelectedMessageUser(undefined);
                  setSelectedMessageKey("");
                }}
              />
              <AnimatedImage
                src={
                  selectedMessageUser?.profile
                    ? selectedMessageUser?.profile
                    : "no-user.webp"
                }
                alt="profile"
                className="h-12 w-12 rounded-full border object-cover"
              />
              <div>
                <h3 className="text-xl font-medium">
                  {selectedMessageUser?.name}
                </h3>

                <h3 className="text-foreground/50">{selectedMessageKey}</h3>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[30vh]">
              {messages?.map((msg: any, index: number) => (
                <div
                  key={index}
                  className={`p-2 w-fit rounded-lg ${
                    msg?.sender?.replace(/\_/g, ".") ===
                    userData?.userData?.emailId
                      ? "bg-primary text-white ml-auto"
                      : "bg-foreground/5 text-gray-800"
                  }`}
                >
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
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
                        disabled: openDialog,
                        required: "Please enter Message",
                      })}
                    />
                    <div className="text-destructive">
                      {errors?.message?.message as string}
                    </div>
                  </div>
                  {ws?.readyState === WebSocket.OPEN && selectedMessageKey && (
                    <Button
                      isPending={isPending || ws?.readyState !== WebSocket.OPEN}
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

      {selectedMessageUser && (
        <div className="w-[30vw] hidden lg:hidde h-full overflow-auto">
          <div className="flex flex-col w-full">
            <div className="border h-16 py-4 text-lg px-6 w-full shadow-md">
              Assiged project Details
            </div>

            <div className="p-3 flex flex-col">
              <div className="flex flex-col  gap-1 border-b pb-4">
                <div className="text-lg font-semibold">
                  {selectedMessageUser?.project?.title}
                </div>

                <div className="">
                  Project type :{" "}
                  {selectedMessageUser?.project?.projectType?.toLowerCase()}
                </div>

                <div className="text-foreground/50">
                  {truncateString(
                    selectedMessageUser?.project?.description,
                    100
                  )}
                </div>
                <div>
                  Budget : $
                  {`${
                    selectedMessageUser?.project.budget
                      ? `${selectedMessageUser?.project.budget} - Fixed price`
                      : `${selectedMessageUser?.project.costPerHour} /Hr`
                  }`}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {selectedMessageUser?.project?.skillsRequired?.map(
                    (item: string, index: number) => {
                      return (
                        <div
                          key={index}
                          className="bg-foreground/5 text-nowrap w-fit px-2 rounded-full py-1"
                        >
                          {item}
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="">
                  Assiged to -{" "}
                  {truncateString(
                    selectedMessageUser?.project?.assignedFreelancerEmail,
                    100
                  )}
                </div>
              </div>
              {/**
               * MileStone Ui
               */}

              <div>
                <div className="w-full flex justify-end mt-3">
                  <Button
                    onClick={() => {
                      handleOpenCreateMilestoneDialog();
                      setOpneDialog(true);
                    }}
                    className="text-xs"
                    variant={"constructive"}
                  >
                    Create Milestone
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openDialog && selectedMessageUser && (
        <AppDialog
          title="Create Milstone"
          onClose={() => {
            setOpneDialog(false);
            clearErrors();
          }}
        >
          <form
            onSubmit={handleSubmit(handleCreateMileStone)}
            className="flex flex-col gap-3"
          >
            <Input
              mandatory
              placeholder="Description"
              iconName="text"
              {...register("description", {
                required: "Please enter Description",
              })}
              errorMessage={errors?.description?.message as string}
            />

            <Input
              mandatory
              placeholder="Amout"
              type="number"
              iconName="dlr"
              {...register("description", {
                required: "Please enter Description",
              })}
              errorMessage={errors?.description?.message as string}
            />
            <div>
              <div className="flex items-center gap-2">
                <Popover
                  {...register("date", {
                    required: "Please select Date",
                  })}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[25vw]  justify-start text-left h-12 font-normal",
                        (!watch("date") as any) && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {(watch("date") as any) ? (
                        format(watch("date") as any, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={(watch("date") as any) ?? undefined}
                      onSelect={(date) => {
                        setValue("date", date);
                        clearErrors("date");
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <div className="h-2 w-2">
                  <FaAsterisk className="text-destructive h-2 w-2" />
                </div>
              </div>
              <div className="h-4 text-destructive ml-2 text-[12px]">
                {errors?.date?.message as string}
              </div>
            </div>

            <Button className="mt-10">Create</Button>
          </form>
        </AppDialog>
      )}
    </div>
  );
}

export default Messaging;
