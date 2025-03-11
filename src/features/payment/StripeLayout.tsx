import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

interface StripeLayoutInterface {
  children: ReactNode;
}

function StripeLayout({ children }: StripeLayoutInterface) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}

export default StripeLayout;
