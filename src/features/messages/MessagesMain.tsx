import DashboardNavBar from "@/utils/DashboardNavBar";
import Messaging from "./utils/Messaging";

function MessagesMain() {
  return (
    <div className="w-full flex flex-col " >
      <DashboardNavBar />
      <div className="flex items-center mx-20 justify-center">
        <Messaging />
      </div>
    </div>
  );
}

export default MessagesMain;
