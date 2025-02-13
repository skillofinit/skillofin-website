import DashboardNavBar from "@/utils/DashboardNavBar";
import Profile from "./utils/Profile";

function MyProfileMain() {
  return (
    <div className="w-full h-[100vh] flex flex-col overflow-auto">
      <DashboardNavBar />

      <div className="flex items-center justify-center h-fit mt-10">
        <Profile />

      </div>


    </div>
  );
}

export default MyProfileMain;
