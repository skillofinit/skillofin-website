/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

function ContactUs() {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="bg-background mt-[10vh] w-full ">
      <div className="flex flex-col items-center mt-[10vh]">
        <h6 className="text-4xl font-bold font-serif"> CONTACT US</h6>
        <div className="h-1 w-[20vw] lg:w-[6vw] bg-primary mt-[2vh]"></div>
      </div>
      <div className="items-center flex w-full justify-center mt-[10vh]">
        <div className="flex flex-col lg:flex-row justify-between w-[70vw] items-center">
          <div className="flex flex-col gap-4">
            <h5 className="font-mono text-4xl font-bold ">
              Get in Touch with SkilloFin 👋
            </h5>
            <p className="text-lg lg:max-w-[30vw]">
              Feel free to connect with us for any of your needs regarding our
              services. Our support team is ready to solve any of your issues.
              Just push a text to us and we will get back to you immediately.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[100vw] lg:w-[20vw] max-w-sm flex flex-col gap-3 p-8"
          >
            <Input
              iconName="firstName"
              placeholder="Full Name"
              {...register("fullNameFotter", {
                required: "Please enter your full name",
              })}
              errorMessage={errors?.fullNameFotter?.message}
            />
            <Input
              placeholder="Phone"
              iconName="phoneNumber"
              {...register("phoneFotter", {
                required: "Please enter your phone number",
              })}
              errorMessage={errors?.phoneFotter?.message}
            />
            <Input
              placeholder="Email Address"
              iconName="emailId"
              {...register("emailIdFotter", {
                required: "Please enter your email",
              })}
              errorMessage={errors?.emailIdFotter?.message}
            />
            <div className="flex flex-col gap-1 h-24">
              <Textarea
                placeholder="Message"
                {...register("messageFotter", {
                  required: "Please enter your message",
                })}
              />
              <div className="text-destructive pl-2 text-[12px]">
                {errors?.messageFotter?.message as any}
              </div>
            </div>
            <Button type="submit">Contact Us</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
