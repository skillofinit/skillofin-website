import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useVerifyPayment } from "@/hooks/jobHooks";
import { useAppContext } from "@/utiles/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const VerifyPayment = () => {
  const [status, setStatus] = useState("processing");
  const { isPending, verifyPayment } = useVerifyPayment();
  const { paymetEmailId } = useAppContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();


  useEffect(() => {
    const paymentIntent = state?.paymentIntent;
    const pricing = state?.pricing;
    const plan = state?.plan;

    verifyPayment(
      {
        paymentIntent,
        freelancerEmailId: paymetEmailId,
        pricing,
        plan,
      },
      {
        onSuccess(data) {
          if (data?.message === "PAYMENT_SUCCESS") {
            setStatus("success");
            if (pricing) {
              setTimeout(() => {
                navigate("/feed");
              }, 1000);
            } else {
              setTimeout(() => {
                navigate("/messages");
              }, 1000);
            }
            toast({
              duration: 3000,
              variant: "constructive",
              title: "Payment success",
              description: "Payment received Successfully ",
            });
          } else {
            setStatus("error");
          }
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {isPending && (
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-blue-500 mt-2">Processing Payment...</p>
        </div>
      )}
      {status === "success" && (
        <div className="flex flex-col items-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
          <p className=" text-3xl text-green-500 mt-2">Payment Successful!</p>
        </div>
      )}
      {status === "error" && (
        <div className="flex flex-col items-center">
          <XCircle className="w-10 h-10 text-red-500" />
          <p className=" text-3xl text-red-500 mt-2">Payment Failed!</p>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;
