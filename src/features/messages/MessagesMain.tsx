import Messaging from "./utils/Messaging";
import { useGetMe } from "@/hooks/userHooks";
import { useEffect } from "react";
import AppSpiner from "@/utiles/AppSpiner";

function MessagesMain() {
  const { getMe, isPending } = useGetMe();
  useEffect(() => {
    getMe(undefined);
  }, []);
  return (
    <div className="w-full flex flex-col ">
      {isPending && <AppSpiner />}
      <div className="flex items-center mx-20 justify-center">
        <Messaging />
      </div>
    </div>
  );
}

export default MessagesMain;
