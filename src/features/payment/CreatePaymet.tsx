import { useCreatePayment } from "@/hooks/jobHooks";
import AppSpiner from "@/utiles/AppSpiner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51QuEIcQ9qBqxEsVwX7kVNzPaUJyhzIYbnjaEuS4ugh82zpnFxqItyZ8dyaV958lrtAJrX1mTotWRXlYuyw6v2q8v004F5fOcAt"
);

function CreatePaymentPage() {
  const [clientSecret, setClientSecret] = useState<string>("");

  const { isPending, createPayment } = useCreatePayment();

  useEffect(() => {
    createPayment(
      {
        amount: "100",
      },
      {
        onSettled(data) {
          if (data?.clientSecret) {
            setClientSecret(data?.clientSecret);
          }
        },
      }
    );
  }, []);

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
