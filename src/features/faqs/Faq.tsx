import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import HomeFooter from "@/utils/HomeFooter";
import HomeNavBar from "@/utils/HomeNavBar";
import { useNavigate } from "react-router-dom";

function Faq() {
    const navigate = useNavigate()
    const faqs =  [
        {
          question: "How can I reset my password?",
          answer: (
            <span>
              Go to the{" "}
              <button
                onClick={() => navigate("/forgotpassword")}
                className="text-blue-500 underline"
              >
                ForgotPassword
              </button>{" "}
              page and click on 'Reset Password'.
            </span>
          ),
        },
        {
          question: "How do I contact support?",
          answer: (
            <span>
              Visit our{" "}
              <button
                onClick={() => navigate("/contactus")}
                className="text-blue-500 underline"
              >
                Contact Us
              </button>{" "}
              page or email us at{" "}
              <a href="mailto:support@skillofin.com" className="text-blue-500">
                support@skillofin.com
              </a>
              .
            </span>
          ),
        },
        {
          question: "Where can I find the latest updates?",
          answer: (
            <span>
              Check our{" "}
              <button
                onClick={() => navigate("/blog")}
                className="text-blue-500 underline"
              >
                Blog
              </button>{" "}
              section for news and updates.
            </span>
          ),
        },
        {
          question: "How do I create a freelancer account?",
          answer: (
            <span>
              Click on{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-500 underline"
              >
                Sign Up
              </button>{" "}
              and select 'Freelancer' to get started.
            </span>
          ),
        },
        {
          question: "How do I post a job as a client?",
          answer: (
            <span>
              Go to your{" "}
              <button
                onClick={() => navigate("/feed")}
                className="text-blue-500 underline"
              >
                Dashboard
              </button>
              , click 'Post a Job', and fill in the details.
            </span>
          ),
        },
        {
          question: "How are payments handled?",
          answer: (
            <span>
              Payments are secured via escrow and released upon project completion.
            </span>
          ),
        },
        {
          question: "What are Skillofin’s service fees?",
          answer: (
            <span>
              Skillofin charges a small commission on successful transactions.
            </span>
          ),
        },
        {
          question: "Can I withdraw my earnings anytime?",
          answer: (
            <span>
              Yes, freelancers can withdraw their earnings after client approval.
            </span>
          ),
        },
        {
          question: "How do I get hired?",
          answer: (
            <span>
              Optimize your profile, showcase your skills, and bid on relevant{" "}
              <button
                onClick={() => navigate("/jobs")}
                className="text-blue-500 underline"
              >
                Jobs
              </button>
              .
            </span>
          ),
        },
      ];
      
  return (
    <div className="flex flex-col h-[100vh] w-[100vw] overflow-hidden">
      <HomeNavBar />
      <div className="flex-grow flex justify-center w-full overflow-y-auto">
        <div className="w-full lg:w-[30vw]  p-3">
          <div className=" ">
            <h1 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <Accordion type="single" collapsible className="border px-3 rounded-md  text-foreground bg-gray-50">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={index.toString()}>
                  <AccordionTrigger>{faq?.question}</AccordionTrigger>
                  <AccordionContent>{faq?.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default Faq;
