/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { IoMdMail } from "react-icons/io";
import {
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaPinterest,
  FaAsterisk,
} from "react-icons/fa6";
import {
  COMPANY_FACEBOOK,
  COMPANY_INSTAGRAM,
  COMPANY_LINKEDIN,
  COMPANY_PINTEREST,
  COMPANY_TWITTER,
  COMPANY_EMAIL,
} from "@/utiles/appUtils";

import { FaFacebook } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { MdRefresh } from "react-icons/md";
import { useEffect, useState } from "react";
import { useContactUs } from "@/hooks/appHooks";

function ContactUs() {
  const { register, formState, handleSubmit, watch, reset } = useForm();
  const { errors } = formState;
  const [captha, setCaptha] = useState<string>("F7naP#");
  const { contactUs, isPending } = useContactUs();

  useEffect(() => {
    generateCaptha();
  }, []);
  function generateCaptha() {
    const string =
      "123456789abcdefgh123456789ijklmnop!@#$%&qrstuvwx123456789yzABCDEFGHIJK!@#$%&LMN123456789OPQRSTU!@#$%&VWXYZ123456789!@#$%&";
    let captha = "";
    for (let index = 0; index < 6; index++) {
      captha =
        captha + string.charAt(Math.floor(Math.random() * string?.length));
    }
    setCaptha(captha);
  }

  async function onSubmit(e: any) {
    contactUs(
      {
        emailId: e.emailIdFotter,
        fullName: e.fullNameFotter,
        phone: e.phoneFotter,
        message: e.message,
      },
      {
        onSuccess() {
          reset();
        },
      }
    );
  }

  function handleOpenLinks(type: string) {
    switch (type) {
      case "mail":
        window.open(`mailto:${COMPANY_EMAIL}`);
        break;
      case "linkedin":
        window.open(COMPANY_LINKEDIN);
        break;
      case "x":
        window.open(COMPANY_TWITTER);
        break;
      case "instagram":
        window.open(COMPANY_INSTAGRAM);
        break;
      case "pinterest":
        window.open(COMPANY_PINTEREST);
        break;
      case "facebook":
        window.open(COMPANY_FACEBOOK);
        break;
    }
  }

  return (
    <div className="bg-background pt-5 w-full ">
      <div className="flex flex-col items-center mt-[5vh]">
        <h6 className=" text-2xl lg:text-4xl font-bold font-serif">
          {" "}
          CONTACT US
        </h6>
        <div className="h-1 w-[20vw] lg:w-[6vw] bg-primary mt-[2vh]"></div>
      </div>
      <div className="items-center flex w-full justify-center mt-10 lg:mt-[10vh]">
        <div className="flex flex-col lg:flex-row justify-between w-[70vw] items-center">
          <div className="flex flex-col gap-4">
            <h5 className="font-mono text-2xl lg:text-4xl font-bold ">
              Get in Touch with SkilloFin 👋
            </h5>
            <p className="text-lg lg:max-w-[30vw]">
              Feel free to connect with us for any of your needs regarding our
              services. Our support team is ready to solve any of your issues.
              Just push a text to us and we will get back to you immediately.
            </p>
            <div className="flex items-center  justify-between mt-8 gap-2 lg:px-8">
              <IoMdMail
                title="Email"
                onClick={() => {
                  handleOpenLinks("mail");
                }}
                className="w-12 h-12 bg-gray-50 p-2 rounded-sm cursor-pointer 
              lg:hover:scale-110 lg:hover:bg-gray-100"
              />

              <FaFacebook
                title="Facebook"
                onClick={() => {
                  handleOpenLinks("facebook");
                }}
                className="w-12 h-12 bg-gray-50 p-2 rounded-sm cursor-pointer 
              lg:hover:scale-110 lg:hover:bg-gray-100"
              />
              <FaInstagram
                title="Instagram"
                onClick={() => {
                  handleOpenLinks("instagram");
                }}
                className="w-12 h-12 bg-gray-50 p-2 rounded-sm cursor-pointer 
              lg:hover:scale-110 lg:hover:bg-gray-100"
              />
              <FaXTwitter
                title="X"
                onClick={() => {
                  handleOpenLinks("x");
                }}
                className="w-12 h-12 bg-gray-50 p-2 rounded-sm cursor-pointer 
              lg:hover:scale-110 lg:hover:bg-gray-100"
              />
              <FaLinkedin
                title="LinkedIn"
                onClick={() => {
                  handleOpenLinks("linkedin");
                }}
                className="w-12 h-12 bg-gray-50 p-2 rounded-sm cursor-pointer 
              lg:hover:scale-110 lg:hover:bg-gray-100"
              />

              <FaPinterest
                title="Pinterest"
                onClick={() => {
                  handleOpenLinks("pinterest");
                }}
                className="w-12 h-12 bg-gray-50 p-2 rounded-sm cursor-pointer 
              lg:hover:scale-110 lg:hover:bg-gray-100"
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[90vw] lg:w-[40vw] max-w-sm flex flex-col gap-3 p-8"
          >
            <Input
              mandatory
              className="h-14"
              iconName="firstName"
              placeholder="Full Name"
              {...register("fullNameFotter", {
                minLength: 3,
                required: "Please enter your full name",
              })}
              errorMessage={errors?.fullNameFotter?.message}
            />
            <Input
              mandatory
              className="h-14"
              placeholder="Phone"
              iconName="phoneNumber"
              {...register("phoneFotter", {
                pattern: /^\+?[1-9]\d{6,14}$/,

                required: "Please enter your phone number",
              })}
              errorMessage={errors?.phoneFotter?.message}
            />
            <Input
              mandatory
              className="h-14"
              placeholder="Email Address"
              iconName="emailId"
              {...register("emailIdFotter", {
                pattern: /^\S+@\S+\.\S+$/,

                required: "Please enter your email",
              })}
              errorMessage={errors?.emailIdFotter?.message}
            />
            <div className="flex flex-col gap-1">
              <div>
                <div className="relative flex items-center gap-1">
                  <Textarea
                    placeholder="Message"
                    className="resize-none w-full border-foreground/60"
                    {...register("message", {
                      required: "Please enter message",
                    })}
                  />
                  <div>
                    <FaAsterisk className="text-destructive h-2 w-2" />
                  </div>
                </div>
                {errors.content && (
                  <div className=" ml-3 text-red-500">
                    {errors?.message?.message as string}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className=" -mt-4 text-xl border px-3 flex items-center justify-center h-10 rounded tracking-[0.4vw] border-foreground">
                <h3 className="w-[25vw] lg:w-[7vw]">{captha}</h3>
                <MdRefresh
                  onClick={generateCaptha}
                  className="ml-1 cursor-pointer hover:scale-110"
                />
              </div>
              <Input
                mandatory
                placeholder="Captha"
                {...register("captha", {
                  required: "Please complete captha",
                })}
                errorMessage={errors?.captha?.message}
              />
            </div>

            <Button
              disabled={!(captha === watch("captha")) || isPending}
              type="submit"
              className="py-6"
              isPending={isPending}
            >
              Contact Us
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
