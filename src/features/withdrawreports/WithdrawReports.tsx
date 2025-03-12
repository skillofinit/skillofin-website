import { useAppContext } from "@/utiles/AppContext";
import { MdVerified } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import { VscClose } from "react-icons/vsc";
import { IoAlert } from "react-icons/io5";

function WithdrawReports() {
  const { userData } = useAppContext();

  function formatCreatedAt(createdAt: string): string {
    const date = new Date(createdAt);
    const weekday = date.toLocaleString("en-GB", { weekday: "long" });
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const formattedDate = `${weekday}, ${day}-${month}-${year}`;

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes}${ampm}`;

    return `${formattedDate} - ${formattedTime}`;
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="lg:w-[70vw] w-full px-3 mt-4 flex flex-col gap-10">
        <div className="font-medium text-2xl w-full   lg:text-4xl">Withdraw summary</div>
        {(userData?.userAccountData?.withdrawalHistory?.length === 0 ||
          !userData?.userAccountData?.withdrawalHistory) && <div className="flex flex-col gap-3 items-center justify-center text-xl lg:text-4xl"><IoAlert className="text-primary w-20 lg:w-32 h-20 lg:h-32" /> No reports yet</div>}
        {userData?.userAccountData?.withdrawalHistory?.length > 0 && (
          <div className="lg:px-10  w-full ">
            <div className="text-foreground text-xs lg:text-xl border-b border-black pb-4 px-1 font-semibold  flex items-center w-full   lg:w-fit">
              <div className="w-[40vw] lg:w-[30vw]">Payment grouped by day</div>
              <div className="w-[20vw] lg:w-[15vw] ">Payment type</div>
              <div className="w-[20vw] lg:w-[15vw] ">Payment amount</div>
              <div className="w-[20vw] lg:w-[10vw] ">Payment status</div>
            </div>
            {userData?.userAccountData?.withdrawalHistory?.map(
              (
                payment: {
                  paymentId: string;
                  amount: number;
                  date: string;
                  type: "WITHDRAWAL" | "DEPOSIT";
                  status: "COMPLETED" | "PENDING" | "FAILED";
                  _id: string;
                  createdAt: string;
                  updatedAt: string;
                },
                index: number
              ) => {
                return (
                  <div
                    key={index}
                    className="text-foreground/80 text-[10px] lg:text-xl border-b border-black py-2 px-1  flex items-center w-full   lg:w-fit"
                  >
                    <div className="w-[30vw] lg:w-[30vw] break-words text-wrap">
                      {formatCreatedAt(payment?.createdAt)}
                    </div>
                    <div className="w-[20vw] lg:w-[15vw] ">
                      {payment?.type?.toLowerCase()}
                    </div>
                    <div className="w-[20vw] lg:w-[15vw] ">
                      ${payment?.amount / 100} USD
                    </div>
                    <div
                      className={`w-[20vw] lg:w-[10vw]  flex  items-center font-semibold gap-2
                   ${
                     payment?.status === "COMPLETED"
                       ? "text-constructive"
                       : payment?.status === "PENDING"
                       ? "text-orange-400 "
                       : "text-destructive"
                   } 
                    
                    `}
                    >
                      {payment?.status}
                      <div className="lg:w-5 lg:h-5 w-3 h-3">
                      {payment?.status === "COMPLETED" ? (
                        <MdVerified className="text-constructive lg:w-5 lg:h-5 w-3 h-3" />
                      ) : payment?.status === "PENDING" ? (
                        <IoIosAlert className="text-orange-400 lg:w-5 lg:h-5 w-3 h-3" />
                      ) : (
                        <VscClose className="text-destructive lg:w-5 lg:h-5 w-3 h-3" />
                      )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WithdrawReports;

// paymentId
// "po_1R1hKbIJhmczZ2LJX1GIgzEo"
// amount
// 400
// date
// 2025-03-12T04:55:50.846+00:00
// type
// "WITHDRAWAL"
// status
// "COMPLETED"
// _id
// 67d113d6b6c1585f70565374
// createdAt
// 2025-03-12T04:55:50.847+00:00
// updatedAt
// 2025-03-12T04:55:51.868+00:00
