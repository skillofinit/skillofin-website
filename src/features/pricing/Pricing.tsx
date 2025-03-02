/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeFooter from "@/utils/HomeFooter";
import HomeNavBar from "@/utils/HomeNavBar";
import { Button } from "@/components/ui/button"; // shadcn button component
import { MdCheck, MdClose } from "react-icons/md";

function SkilloFinPricing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Freelancers");

  // Freelancer Plans Data
  const freelancerPlans = [
    {
      plan: "Free",
      monthlyFee: "$0",
      features: [
        { label: "Service Fee (Commission on Earnings)", value: "10%" },
        { label: "# of Proposals Allowed", value: "20/month" },
        { label: "Premium Job Access", value: "No" },
        { label: "AI-Based Job Matching", value: "No" },
        { label: "Profile Boosting", value: "No" },
        { label: "Skill Certification Badge", value: "No" },
        { label: "Premium Customer Support", value: "No" },
        { label: "Payment Protection", value: "Yes" },
        { label: "Loan Eligibility", value: "No" },
      ],
    },
    {
      plan: "Pro",
      monthlyFee: "$7.99",
      features: [
        { label: "Service Fee (Commission on Earnings)", value: "5%" },
        { label: "# of Proposals Allowed", value: "50/month" },
        { label: "Premium Job Access", value: "Yes (3-day early access)" },
        { label: "AI-Based Job Matching", value: "Yes" },
        { label: "Profile Boosting", value: "Yes (2X visibility)" },
        { label: "Skill Certification Badge", value: "Yes" },
        { label: "Premium Customer Support", value: "Yes" },
        { label: "Payment Protection", value: "Yes" },
        { label: "Loan Eligibility", value: "Yes (up to $5K)" },
      ],
    },
    {
      plan: "Elite",
      monthlyFee: "$14.99",
      features: [
        { label: "Service Fee (Commission on Earnings)", value: "3%" },
        { label: "# of Proposals Allowed", value: "Unlimited" },
        { label: "Premium Job Access", value: "Yes (7-day early access)" },
        { label: "AI-Based Job Matching", value: "Yes" },
        { label: "Profile Boosting", value: "Yes (3X visibility)" },
        { label: "Skill Certification Badge", value: "Yes" },
        { label: "Premium Customer Support", value: "Yes" },
        { label: "Payment Protection", value: "Yes" },
        { label: "Loan Eligibility", value: "Yes (up to $10K)" },
      ],
    },
    {
      plan: "VIP Exclusive",
      monthlyFee: "$49.99",
      features: [
        { label: "Service Fee (Commission on Earnings)", value: "0%" },
        { label: "# of Proposals Allowed", value: "Unlimited" },
        { label: "Premium Job Access", value: "Yes (Exclusive jobs)" },
        { label: "AI-Based Job Matching", value: "Yes" },
        { label: "Profile Boosting", value: "Yes (Top-tier ranking)" },
        { label: "Skill Certification Badge", value: "Yes" },
        { label: "Premium Customer Support", value: "Yes" },
        { label: "Payment Protection", value: "Yes" },
        { label: "Loan Eligibility", value: "Yes (up to $50K)" },
      ],
    },
  ];

  // Business (Clients) Plans Data
  const businessPlans = [
    {
      plan: "Free",
      monthlyFee: "$0",
      features: [
        { label: "Job Posting Limit", value: "2 jobs/month" },
        { label: "Freelancer Bidding Fees", value: "3%" },
        { label: "AI-Powered Matching", value: "No" },
        { label: "Access to Verified Talent", value: "No" },
        { label: "Bulk Hiring Features", value: "No" },
        { label: "Priority Support", value: "No" },
        { label: "Financial Institution Partnership Access", value: "No" },
        { label: "Hiring Analytics & Reports", value: "No" },
      ],
    },
    {
      plan: "Growth",
      monthlyFee: "$19.99",
      features: [
        { label: "Job Posting Limit", value: "10 jobs/month" },
        { label: "Freelancer Bidding Fees", value: "2%" },
        { label: "AI-Powered Matching", value: "Yes" },
        { label: "Access to Verified Talent", value: "Yes" },
        { label: "Bulk Hiring Features", value: "No" },
        { label: "Priority Support", value: "Yes" },
        { label: "Financial Institution Partnership Access", value: "Yes" },
        { label: "Hiring Analytics & Reports", value: "Yes" },
      ],
    },
    {
      plan: "Enterprise",
      monthlyFee: "$59.99",
      features: [
        { label: "Job Posting Limit", value: "Unlimited" },
        { label: "Freelancer Bidding Fees", value: "1%" },
        { label: "AI-Powered Matching", value: "Yes" },
        { label: "Access to Verified Talent", value: "Yes" },
        { label: "Bulk Hiring Features", value: "Yes" },
        { label: "Priority Support", value: "Yes" },
        { label: "Financial Institution Partnership Access", value: "Yes" },
        { label: "Hiring Analytics & Reports", value: "Yes" },
      ],
    },
    {
      plan: "VIP Corporate",
      monthlyFee: "Custom",
      features: [
        { label: "Job Posting Limit", value: "Unlimited" },
        { label: "Freelancer Bidding Fees", value: "0%" },
        { label: "AI-Powered Matching", value: "Yes" },
        { label: "Access to Verified Talent", value: "Yes" },
        { label: "Bulk Hiring Features", value: "Yes" },
        { label: "Priority Support", value: "Yes" },
        { label: "Financial Institution Partnership Access", value: "Yes" },
        { label: "Hiring Analytics & Reports", value: "Yes" },
      ],
    },
  ];

  // Financial Institutions Plans Data
  const institutionPlans = [
    {
      plan: "Basic",
      monthlyFee: "$999",
      features: [
        { label: "Access to Business Hiring Data", value: "Yes" },
        { label: "Freelancer Loan Matching System", value: "Yes" },
        { label: "Exclusive Lending Rights for Verified Users", value: "No" },
        {
          label: "Premium Advertising to Businesses & Freelancers",
          value: "No",
        },
        { label: "AI-Driven Creditworthiness Assessment", value: "No" },
        { label: "API Integration for Loan Services", value: "No" },
      ],
    },
    {
      plan: "Premium",
      monthlyFee: "$2,499",
      features: [
        { label: "Access to Business Hiring Data", value: "Yes" },
        { label: "Freelancer Loan Matching System", value: "Yes" },
        { label: "Exclusive Lending Rights for Verified Users", value: "Yes" },
        {
          label: "Premium Advertising to Businesses & Freelancers",
          value: "Yes",
        },
        { label: "AI-Driven Creditworthiness Assessment", value: "Yes" },
        { label: "API Integration for Loan Services", value: "No" },
      ],
    },
    {
      plan: "Enterprise",
      monthlyFee: "$4,999",
      features: [
        { label: "Access to Business Hiring Data", value: "Yes" },
        { label: "Freelancer Loan Matching System", value: "Yes" },
        { label: "Exclusive Lending Rights for Verified Users", value: "Yes" },
        {
          label: "Premium Advertising to Businesses & Freelancers",
          value: "Yes",
        },
        { label: "AI-Driven Creditworthiness Assessment", value: "Yes" },
        { label: "API Integration for Loan Services", value: "Yes" },
      ],
    },
  ];

  const earlyDeals: any = {
    Freelancers: "50% discount on paid plans for 6 months.",
    Businesses:
      "First 3 job postings free + 0% hiring fees for the first 2 hires.",
    "Financial Institutions":
      "1-month free trial for premium data insights & API access.",
  };

  function renderIcon(value: string) {
    const trimmed = value.trim();
    if (trimmed.startsWith("Yes")) {
      return <MdCheck className="text-green-600 inline-block mr-2" />;
    } else if (trimmed.startsWith("No")) {
      return <MdClose className="text-red-600 inline-block mr-2" />;
    }
    return null;
  }

  // Get plans based on the active tab
  const getPlans = () => {
    if (activeTab === "Freelancers") return freelancerPlans;
    if (activeTab === "Businesses") return businessPlans;
    if (activeTab === "Financial Institutions") return institutionPlans;
    return [];
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br overflow-x-hidden">
      <HomeNavBar />
      <main className="flex-grow px-4 py-5 md:px-12 ">
        <div className="text-center mb-12 flex  flex-col items-center">
          <h1 className="text-2xl lg:text-4xl sm:text-3xl font-semibold text-foreground drop-shadow-xl animate-fadeIn">
            SkilloFin: A Better Pricing Model
          </h1>
          <p className="text-foreground lg:text-lg lg:w-[80vw] mt-4 animate-fadeIn delay-200">
            Outperforming every other platform by lowering upfront costs,
            incentivizing early adopters, ensuring long-term revenue stability,
            and encouraging financial institutions to invest more.
          </p>
        </div>
        {/* Early Adopter Deal */}
        <div className="my-4 p-5 bg-green-50 border  border-green-200 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-green-700 mb-2">
            Special Early Adopter Deals
          </h3>
          <p className="text-green-600 font-medium">{earlyDeals[activeTab]}</p>
        </div>
        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-10">
          {["Freelancers", "Businesses", "Financial Institutions"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full border border-primary font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-white "
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
        {/* Card Container (using flex for centering) */}
        <div className="flex flex-wrap justify-center gap-8">
          {getPlans().map((plan) => (
            <div
              key={plan.plan}
              className="relative bg-white text-gray-800 border border-gray-200 rounded-tl-md rounded-b-md p-6 sm:p-8 shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out w-full md:max-w-sm"
            >
              {/* Decorative Ribbon */}
              <div className="absolute -top-0 right-0 bg-gradient-to-r from-primary to-blue-500 text-white font-semibold px-3 sm:px-4 py-1 rounded-bl-xl shadow-lg">
                {plan.plan}
              </div>
              {/* Price Section */}
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-primary">
                  {plan.monthlyFee}
                  <span className="text-base font-normal text-gray-500 ml-2">
                    /user/month
                  </span>
                </h2>
              </div>
              {/* Features */}
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    {renderIcon(feature.value)}
                    <span>
                      <strong>{feature.label}:</strong> {feature.value}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <Button className="w-full  text-white py-3 rounded shadow-lg">
                  Choose Plan
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-3 rounded shadow-lg"
                  onClick={() => navigate("/contactus")}
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}

export default SkilloFinPricing;
