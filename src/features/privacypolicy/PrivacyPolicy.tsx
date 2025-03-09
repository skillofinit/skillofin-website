import { FaRegCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HomeFooter from "@/utils/HomeFooter";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const policies = [
    {
      title: "Data Collection",
      content:
        "We collect personal and professional information to provide better services. Your data is handled securely and never shared without consent.",
    },
    {
      title: "Usage of Information",
      content:
        "Your data is used for account verification, payment processing, and improving our platform experience. We never sell your data to third parties.",
    },
    {
      title: "Cookies and Tracking",
      content:
        "We use cookies to enhance user experience and track website analytics. You can manage cookie preferences in your browser settings.",
    },
    {
      title: "Third-Party Services",
      content:
        "We integrate secure third-party payment and verification services. Your data is shared only as necessary for transactions.",
    },
    {
      title: "User Rights",
      content:
        "You have the right to access, edit, or delete your account information. Navigate to ",
      navigateTo: "/profile",
      navigateText: "your profile",
    },
    {
      title: "Security Measures",
      content:
        "We implement encryption and other security protocols to protect your personal information from unauthorized access.",
    },
    {
      title: "Policy Updates",
      content:
        "This Privacy Policy may be updated periodically. Please check back to stay informed about any changes.",
    },
    {
      title: "Contact Us",
      content: "For privacy-related concerns, please visit our ",
      navigateTo: "/contactus",
      navigateText: "Contact Page",
    },
  ];

  return (
    <div className="flex flex-col h-[100vh] w-[100vw] overflow-hidden">
 
      <div className="flex-grow flex justify-center w-full overflow-y-auto">
        <div className="w-full lg:w-[30vw] p-3">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <ul className="list-none space-y-4">
            {policies.map((policy, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-5 h-5">
                  <FaRegCircle className="mt-1 text-blue-500" />
                </div>
                <div>
                  <h2 className="font-semibold">{policy.title}</h2>
                  <p>
                    {policy.content}
                    {policy.navigateTo && (
                      <>
                        {" "}
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => navigate(policy.navigateTo)}
                        >
                          {policy.navigateText}
                        </span>
                        .
                      </>
                    )}
                  </p>
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
