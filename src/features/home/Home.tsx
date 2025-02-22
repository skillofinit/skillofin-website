/* eslint-disable @typescript-eslint/no-explicit-any */
import { contactUsAPI } from "@/api/emailApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendEmail } from "@/hooks/emailHooks";
import { COMPANY_EMAIL } from "@/utiles/appUtils";
import ContactUs from "@/utils/ContactUs";
import HomeFooter from "@/utils/HomeFooter";
import HomeNavBar from "@/utils/HomeNavBar";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { GiArmoredBoomerang } from "react-icons/gi";
import { MdConnectWithoutContact, MdExpandMore } from "react-icons/md";

function Home() {
  const { formState, handleSubmit, register, reset } = useForm();
  const { errors } = formState;

  const whomRef = useRef(null);
  const contactRef = useRef(null);
  const { isPending, sendEmail } = useSendEmail();

  async function handleContactUs(e: any) {
    sendEmail(
      {
        body: `New message recived from  ${e.fullName} with email - ${e.emailId} and phone - ${e.phone}`,
        subject: "New Message from SkilloFin chat",
        title: "New Message from SkilloFin",
        toEmail: COMPANY_EMAIL,
      },
      {
        onSuccess(data) {
          if (data === "SUCCESS") {
            reset();
          }
        },
      }
    );
    await contactUsAPI({
      emailId: e.emailId,
      fullName: e.fullName,
      phone: e.phone,
    });
  }

  function handleReadMoreClick() {
    (whomRef?.current as any)?.scrollIntoView({ behavior: "smooth" });
  }
  
  function handleContactUsClick() {
    (contactRef?.current as any)?.scrollIntoView({ behavior: "smooth" });
  }


  return (
    <div className="w-full h-full flex flex-col relative bg-primary/5 text-foreground overflow-x-hidden">
      <div className="relative w-full h-[100vh]">
        <img
          alt="banner-image"
          src="beams.png"
          className="object-cover w-full h-[120vh] lg:h-[100vh]"
        />
        <svg
          className="absolute top-10 right-10 hidden lg:flex"
          width="200"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <circle cx="40" cy="40" r="5" fill="rgba(0, 0, 0, 1)" />
          <circle cx="100" cy="40" r="5" fill="rgba(0, 0, 0, 1)" />
          <circle cx="160" cy="40" r="5" fill="rgba(0, 0, 0, 1)" />
          <line
            x1="40"
            y1="40"
            x2="100"
            y2="40"
            stroke="rgba(0, 0, 0, 0.5)"
            stroke-width="2"
          />
          <line
            x1="100"
            y1="40"
            x2="160"
            y2="40"
            stroke="rgba(0, 0, 0, 0.5)"
            stroke-width="2"
          />
        </svg>
      </div>

      <div className="z-[400]  absolute h-full inset-0 items-center w-full flex flex-col ">
        <div className=" w-full text-foreground">
          <HomeNavBar />
        </div>

        <div className="text-foreground items-center flex flex-col w-full px-4 md:flex-row   lg:w-[90vw]    justify-between  pt-[10vw]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col  gap-5 relative">
              <div className="flex items-center">
                <div className="mt-8">
                  <h1 className="font-bold text-[50px] md:text-[30px] lg:text-[70px] font-serif">
                    SkilloFin
                  </h1>

                  <div className="h-1 mt-[4vw] lg:mt-[2vw] bg-primary w-[40vw] lg:w-[15vw]"></div>
                </div>
                <GiArmoredBoomerang className=" w-10 h-10 lg:w-20 lg:h-20 lg:-mt-10 lg:ml-5 -mt-5 ml-3 " />
              </div>
              <div className="flex items-center gap-4 ">
                <div>
                  <img
                    src="working.png"
                    className="w-[40vw] h-[5vh] lg:h-[10vh] lg:w-[10vw] rounded-full"
                  />
                </div>
                <div>
                  <img
                    src="connect.jpg"
                    className=" w-[50vw] h-[5vh]  lg:w-[20vw] lg:h-[10vh]  rounded-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-4xl lg:pt-2 md:text-2xl lg:text-2xl">
                Projects - Hiring - Funding - Networking - Empowering Your Work
              </p>
            </div>

            {/* <div className="text-lg">
              <span className="font-semibold text-2xl mr-1">Join now :</span>{" "}
              Zero commission fees for first 100 freelancers in any category for
              one year !
            </div> */}
            <div className=" hidden lg:flex justify-end -mt-8">
              <svg
                width="300"
                height="8"
                viewBox="0 0 300 8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="4"
                  x2="290"
                  y2="4"
                  stroke="black"
                  stroke-width="2"
                />
                <polygon points="290,0 300,4 290,8" fill="black" />
              </svg>
            </div>
            <div className="w-fit flex flex-col lg:flex-row  items-center gap-2 lg:gap-10  mt-[5vw]">
              <Button
                variant={"outline"}
                onClick={handleReadMoreClick}
                className="w-fit py-6 px-10 "
              >
                <div className="flex items-center gap-1">
                  Read More
                  <div>
                    <MdExpandMore />
                  </div>
                </div>
              </Button>
              <Button
                variant={"outline"}
                onClick={handleContactUsClick}
                className="w-fit py-6 px-10 "
              >
                <div className="flex   gap-1 items-center">
                  Contact Us
                  <MdConnectWithoutContact className="h-10 w-10" />
                </div>
              </Button>
            </div>
          </div>
          <div>
            <img
              src="freelancer.webp"
              className="h-[60vh] lg:w-[30vw] lg:mt-[0vw] mt-[10vw] object-cover lg:rounded-tr-[13vw] lg:rounded-bl-[13vw] rounded-sm "
            />
          </div>

          {/* <div className="flex flex-col bg-background rounded-lg mt-10 lg:mt-0">
            <form
              className=" lg:w-[30vw] w-[90vw] flex flex-col gap-3 p-8"
              onSubmit={handleSubmit(handleContactUs)}
            >
              <Input
                mandatory={true}
                className="h-12"
                iconName="firstName"
                placeholder="Full Name"
                {...register("fullName", {
                  minLength: 3,
                  required: "Please enter your full name",
                })}
                errorMessage={errors?.fullName?.message}
              />
              <Input
                mandatory={true}
                className="h-12"
                placeholder="Phone"
                iconName="phoneNumber"
                {...register("phone", {
                  pattern: /^\+?[1-9]\d{6,14}$/,
                  required: "Please enter your phone number",
                })}
                errorMessage={errors?.phone?.message}
              />
              <Input
                mandatory={true}
                className="h-12"
                placeholder="Email Address"
                iconName="emailId"
                {...register("emailId", {
                  pattern: /^\S+@\S+\.\S+$/,
                  required: "Please enter your email",
                })}
                errorMessage={errors?.emailId?.message}
              />
              <Button className="py-6" isPending={isPending}>
                Contact Us
              </Button>
            </form>
          </div> */}
        </div>

        <div className=" lg:w-[80vw] flex lg:flex-row lg:h-[70vw] mt-[12vh] lg:mt-[27vh]  ">
          <div className=" flex md:flex-row flex-col lg:h-[70vh] gap-6  ">
            <img
              src="about-us.webp"
              alt="about us"
              className=" h-[60vh] lg:w-[20vw] lg:h-full object-cover"
            />

            <div className="h-full bg-background lg:w-[60vw] flex flex-col items-center justify-center p-10  gap-4 lg:gap-10">
              <div className="flex flex-col items-center gap-1  lg:gap-4 ">
                <h3 className=" text-2xl lg:text-4xl font-bold font-serif">
                  About SkilloFin
                </h3>
                <div className="h-1 bg-primary w-[20vw] lg:w-[10vw]"></div>
              </div>
              <p className="text-xl lg:p  x-20 text-center ">
                SkilloFin is dedicated to facilitating meaningful professional
                relationships. Our platform connects individuals with projects
                to earn, industry leaders to hire, offering opportunities for
                career growth, funding and collaborating to grow more !
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[6vh]" ref={whomRef}>
          <div className="mt-[10vh] flex flex-col items-center">
            <h2 className="font-bold text-4xl text-center font-serif">
              FOR WHOM, WHY AND HOW ?
            </h2>
            <div className="h-1 w-[30vw] mt-2  lg:w-[6vw] bg-primary lg:mt-[4vh]"></div>
          </div>

          <div className="flex lg:flex-row flex-col gap-10 mt-[10vh] px-2">
            <div className=" bg-rounded-lg lg:w-[25vw] flex flex-col">
              <img
                src="man-with-work.jpg"
                alt="work "
                className="rounded-t-lg  h-[25vh] md:h-[40vh] lg:h-[25vh] object-cover"
              />
              <div className="flex flex-col gap-3 h-[39vh] bg-background p-4 ">
                <h6 className="text-2xl font-semibold ">
                  Freelancers/ Professionals/ Workers
                </h6>
                <p className="text-lg ml-2">
                  Network for jobs, bid on projects, contracts and get paid
                  safely, securely with guarantee from verified companies. It
                  will create better atmosphere to get hired easily in your
                  favorite companies. No more resumes.
                </p>
              </div>
            </div>

            <div className=" bg-rounded-lg lg:w-[25vw] flex flex-col">
              <img
                src="women-with-phone.jpg"
                alt="work "
                className="rounded-t-lg  h-[25vh] md:h-[40vh] lg:h-[25vh] object-cover"
              />
              <div className="flex flex-col gap-3 h-[39vh] bg-background p-4 ">
                <h6 className="text-2xl font-semibold ">
                  Businesses/ HR professionals/ MNC’s
                </h6>
                <p className="text-lg ml-2">
                  Small businesses or MNC recruiters can hire with confidence
                  with verified profiles having proof of work and result driven
                  candidates. No more guesswork.
                </p>
              </div>
            </div>
            <div className="gap- bg-rounded-lg lg:w-[25vw] flex flex-col">
              <img
                src="man-with-fund.jpg"
                alt="work "
                className="rounded-t-lg  h-[25vh] md:h-[40vh] lg:h-[25vh] object-cover"
              />
              <div className="flex flex-col gap-3 h-[39vh] bg-background p-4 ">
                <h6 className="text-2xl font-semibold ">
                  Banks/ Credit Unions/ Funding{" "}
                </h6>
                <p className="text-lg ml-2">
                  For individuals and companies: Funding options come to your
                  inbox as you display proof of revenue generation with your
                  hard work. Banks, lenders, investors will get proof of revenue
                  which will help in smooth application processing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[10vh] relative">
          <div>
            <img
              className="w-[100vw] h-[100vh] object-cover"
              src="money-growth.jpg"
              alt="money growth"
            />
          </div>
          <div className="absolute inset-10 lg:inset-16 bg-background h-fit w-[80vw] lg:w-[30vw] p-9 flex flex-col gap-6">
            <div className="flex flex-col  gap-6">
              <h4 className="font-bold text-4xl ">
                Get funds easily to grow more !
              </h4>
              <div className="bg-primary h-1 w-[20vw] lg:w-[8vw]"></div>
            </div>
            <p className="text-lg ml-2">
              For workers and for companies : Showcase your traction in real,
              get funds to grow more !
            </p>
          </div>
        </div>

        <div className="mt-[5vh]">
          <div className=" mt-[5vh] flex flex-col ">
            <div className="flex flex-col items-center ">
              <h6 className="text-4xl font-bold font-serif"> TESTIMONIALS</h6>
              <div className="h-1 w-[20vw] lg:w-[6vw] bg-primary mt-[2vh]"></div>
            </div>

            <div className="flex flex-col mt-[10vh] items-center">
              <div className="items-center flex flex-col">
                <img
                  src="testimonials1.jpg"
                  alt="testimonials1"
                  className="w-[20vw] h-[20vw] rounded-full object-cover"
                />
                <div className="-mt-5 w-10 h-10 bg-primary rotate- flex items-center justify-center rounded-full text-3xl text-background">
                  <p className="-mt-6">,,</p>
                </div>
              </div>
              <div className="text-xl mt-10 max-w-[80vw]  lg:max-w-[50vw] text-center font-semibold">
                Thanks to SkiLLoFin, I have expand my professional Network and
                and has my first job based on proof of work hiring as a AI
                Marketer.
              </div>
              <div className="flex gap-2 mt-5">
                <FaStar className="text-orange-500 w-5 h-5" />
                <FaStar className="text-orange-500 w-5 h-5" />
                <FaStar className="text-orange-500 w-5 h-5" />
                <FaStar className="text-orange-500 w-5 h-5" />
                <FaStar className="text-orange-500 w-5 h-5" />
              </div>
              <h3 className="mt-[3vh] text-xl font-bold">JANE SMITH</h3>
              <h3 className=" font-thin">Freelancer</h3>
            </div>
          </div>
        </div>

        <div className="w-full" ref={contactRef}>
          <ContactUs />
        </div>
        <div className="pt-[10vh] w-full pb-10 bg-background ">
          <HomeFooter />
        </div>
      </div>
    </div>
  );
}

export default Home;
