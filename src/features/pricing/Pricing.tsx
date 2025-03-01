import { useNavigate } from "react-router-dom";
import HomeFooter from "@/utils/HomeFooter";
import HomeNavBar from "@/utils/HomeNavBar";
import { Button } from "@/components/ui/button"; // shadcn button component
import { MdCheck } from "react-icons/md";

function Pricing() {
  const navigate = useNavigate();


  const plans = [
    {
      type: "Freelancer",
      description:
        "Empower your freelance career with premium features and exclusive gigs.",
      price: "$9.99",
      features: [
        "Unlimited job applications",
        "Featured profile listing",
        "Access to exclusive projects",
      ],
    },
    {
      type: "Client",
      description:
        "Streamline your hiring process with advanced tools and top-tier talent.",
      price: "$29.99",
      features: [
        "Unlimited job posts",
        "Premium candidate screening",
        "Advanced analytics dashboard",
      ],
    },
    {
      type: "Bank",
      description:
        "Partner with us to offer tailored financial solutions and exclusive opportunities.",
      price: "$49.99",
      features: [
        "Access to curated business data",
        "Co-branded marketing opportunities",
        "Customized financial solutions",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-x-hidden">
      {/* Header */}
      <HomeNavBar />
      {/* Main Content */}
      <main className="flex-grow px-4 py-6 md:px-12 md:py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-3xl font-extrabold text-background drop-shadow-xl animate-fadeIn">
            Discover Our Premium Plans
          </h1>
          <p className="text-lg  text-background mt-4 animate-fadeIn delay-200">
            Each plan is meticulously crafted to power your success. Choose the one that fits your journey.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {plans.map((plan) => (
            <div
              key={plan.type}
              className="relative bg-background text-background/90 border border-foreground/10  rounded-tl-md rounded-b-md p-6 sm:p-8 shadow-2xl backdrop-blur-md transform hover:scale-105 transition duration-500 ease-in-out w-full md:max-w-sm"
            >
              {/* Decorative Ribbon */}
              <div className="absolute -top-0 right-0 bg-gradient-to-br from-green-600 to-blue-600 text-background font-semibold px-3 sm:px-4 py-1 rounded-bl-xl shadow-lg">
                {plan.type}
              </div>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {plan.type} Plan
                </h2>
                <p className="text-gray-600 mt-2 text-base">
                  {plan.description}
                </p>
              </div>
              {/* Divider */}
              <div className="border-b border-gray-300 mb-6"></div>
              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-green-600">
                  {plan.price}
                </span>
                <span className="text-lg text-gray-500 ml-2">/user/month</span>
              </div>
              {/* Features */}
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <MdCheck className="text-green-600 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-background py-3 rounded shadow-lg"
                >
                  Choose Plan
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 rounded shadow-lg"
                  onClick={() => navigate("/contactus")}
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* Footer */}
      <HomeFooter />
    </div>
  );
}

export default Pricing;
