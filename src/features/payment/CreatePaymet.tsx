import { useCreatePayment } from "@/hooks/jobHooks";
import AppSpiner from "@/utiles/AppSpiner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";
import { useAppContext } from "@/utiles/AppContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

function CreatePaymentPage() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const { isPending, createPayment } = useCreatePayment();
  const { state } = useLocation();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { dispatch } = useAppContext();
  const [pricing, setPricing] = useState<boolean>(false);
  const [plan, setPlan] = useState<boolean>();

  useEffect(() => {
    if (state?.pricing) {
      setPricing(true);
    }
    if (state?.plan) {
      setPlan(state?.plan);
    }

    if (
      state?.amount !== undefined &&
      !loaded &&
      (state?.emailId || state?.pricing)
    ) {
      dispatch({
        type: "setPaymentEmailId",
        payload: state?.emailId ?? undefined,
      });
      setLoaded(true);

      createPayment(
        {
          amount: state?.amount,
        },
        {
          onSuccess(data) {
            if (data?.clientSecret) {
              setClientSecret(data?.clientSecret);
            }
          },
        }
      );
    }
  }, [state, loaded]);

  if (isPending) return <AppSpiner />;

  return (
    <div className="w-full h-full">
      {clientSecret && (
        <div className="w-full h-full">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <CheckoutForm pricing={pricing} plan={plan as unknown as string} />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default CreatePaymentPage;
