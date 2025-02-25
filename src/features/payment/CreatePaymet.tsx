import { useCreatePayment } from "@/hooks/jobHooks";
import AppSpiner from "@/utiles/AppSpiner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import {  useLocation } from "react-router-dom";



const env = await import.meta.env;

const stripePromise = loadStripe(env?.VITE_STRIPE_KEY as string);

function CreatePaymentPage() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const { isPending, createPayment } = useCreatePayment();
  const { state } = useLocation();
  const [loaded,setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (state?.amount && !loaded) {
      setLoaded(true)
      createPayment(
        {
          amount: state?.amount,
        },
        {
          onSettled(data) {
            if (data?.clientSecret) {
              setClientSecret(data?.clientSecret);
            }
          },
        }
      );
    }
  }, [state,loaded]);

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
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default CreatePaymentPage;
