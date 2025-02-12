import DashBoardHighlightCard from "./utils/DashBoardHighlightCard";
import DashboardNavBar from "./utils/DashboardNavBar";

function DashBoardMain() {
  return (
    <div className="w-full">
      <DashboardNavBar />
      <div className="px-4">
        <div className="pl-10 mt-10">
        <DashBoardHighlightCard />
        </div>
      </div>
    </div>
  );
}

export default DashBoardMain;
