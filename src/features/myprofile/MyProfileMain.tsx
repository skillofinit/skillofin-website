import Profile from "./utils/Profile";
function MyProfileMain() {
  return (
    <div className="w-full flex flex-col overflow-auto">
      <div className="flex items-center justify-center h-fit mt-10">
        <Profile />
      </div>
    </div>
  );
}

export default MyProfileMain;
