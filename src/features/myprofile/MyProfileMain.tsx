import Profile from "./utils/Profile";
import { useGetMe } from "@/hooks/userHooks";
import { useEffect } from "react";
import AppSpiner from "@/utiles/AppSpiner";

function MyProfileMain() {
  const { data, getMe, isPending } = useGetMe();
  useEffect(() => {
    if (!data) {
      getMe(undefined);
    }
  }, []);

  return (
    <div className="w-full h-[90vh] flex flex-col overflow-auto">
      {isPending && <AppSpiner bgColor="bg-foreground/50" />}

      <div className="flex items-center justify-center h-fit mt-10">
        <Profile />
      </div>
    </div>
  );
}

export default MyProfileMain;
