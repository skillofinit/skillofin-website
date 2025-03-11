import { useReAuth } from "@/hooks/userHooks";
import AppSpiner from "@/utiles/AppSpiner";
import { useEffect } from "react";
import { ImSpinner11 } from "react-icons/im";

function ResubmitKYC() {
  const { isPending, reauth } = useReAuth();

  useEffect(() => {
    reauth(undefined, {
      onSuccess(data) {
        window.location.replace(data?.url);
      },
    });
  }, []);

  return (
    <div className="w-full h-full flex">
      {isPending && <AppSpiner bgColor="bg-background/50" />}
      <div className="w-full h-full flex items-center justify-center text-xl">
        <ImSpinner11 className="animate-spin" />
      </div>
    </div>
  );
}

export default ResubmitKYC;
