/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row  w-full h-full lg:px-20">
      <div className="flex flex-row w-full ">
        <div>
          <img alt="Payment" src="payment.jpg" className="lg:h-[70vh]" />
        </div>
        <div className="hidden lg:flex h-full w-[1px] bg-foreground/40"></div>
      </div>

      <div className="lg:w-full flex items-center justify-center h-full">
        <div className="w-[90vw] lg:w-[30vw]  lg:max-h-[70vh] overflow-auto">
          <form onSubmit={handleSubmit} className="flex flex-col items-center ">
            <PaymentElement />
            <Button disabled={!stripe} className="mt-10 w-fit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
