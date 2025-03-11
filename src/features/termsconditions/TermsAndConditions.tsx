import { FaCheckCircle } from "react-icons/fa";
import HomeFooter from "@/utils/HomeFooter";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
  const navigate = useNavigate();
  const terms = [
    {
      title: "Introduction",
      content: "Welcome to Skillofin. By using our platform, you agree to comply with our terms. Please read them carefully.",
    },
    {
      title: "Account Registration",
      content: (
        <>
          You must provide accurate details when registering. To create an account, go to
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>
            {" "}Sign Up
          </span>.
        </>
      ),
    },
    {
      title: "Payment and Transactions",
      content: "All transactions are securely processed. Clients and freelancers are responsible for agreed payments and disputes.",
    },
    {
      title: "Project and Bidding Rules",
      content: "Freelancers and clients must follow fair bidding practices. Any fraudulent activity will lead to account review.",
    },
    {
      title: "Privacy Policy",
      content: (
        <>
          We respect your privacy. For details on how we handle your data, check our
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/privacy-policy")}>
            {" "}Privacy Policy
          </span>.
        </>
      ),
    },
    {
      title: "Termination and Violations",
      content: "Violation of our terms may result in account suspension or permanent ban. Ensure compliance to continue using our platform.",
    },
  ];

  return (
    <div className="flex flex-col h-[100vh] w-[100vw] overflow-hidden">
      <div className="flex-grow flex justify-center w-full overflow-y-auto">
        <div className="w-full lg:w-[50vw] p-6">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          <ul className="space-y-4">
            {terms.map((term, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="h-5 w-5"><FaCheckCircle className="text-green-500 mt-2" /></div>
                <div>
                  <h2 className="text-xl font-semibold">{term.title}</h2>
                  <p className="text-gray-700">{term.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}