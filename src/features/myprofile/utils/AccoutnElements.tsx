import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateProfile } from "@/hooks/userHooks";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaAsterisk } from "react-icons/fa6";
import { IoCloudDoneOutline } from "react-icons/io5";

function AccountElement() {
  const stripe = useStripe();
  const elements = useElements();
  const { isPending, updateProfile } = useUpdateProfile();
  const { toast } = useToast();

  async function onSubmit() {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const { token, error } = await stripe.createToken(cardElement, {
      currency: "usd",
    });

    if (error) {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      updateProfile(
        {
          method: "bank",
          data: {
            id: token?.id,
          },
        },
        {
          onSuccess(data) {
            if (data?.message === "SUCCESS") {
              toast({
                duration: 3000,
                variant: "constructive",
                title: "Success",
                description: "Successfully updated",
              });
            }
          },
        }
      );
    }
  }

  return (
    <div className="items-center flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2 w-full">
        <div
          className="w-full"
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  padding: "10px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
            }}
          />
        </div>
        <div className="h-2 w-2">
          <FaAsterisk className="text-destructive h-2 w-2" />
        </div>
      </div>
      <Button
        onClick={onSubmit}
        isPending={isPending}
        className="h-11 px-5 w-fit"
      >
        <div className="flex gap-3 items-center w-fit">
          <h4>Save</h4>
          <IoCloudDoneOutline />
        </div>
      </Button>
    </div>
  );
}

export default AccountElement;
