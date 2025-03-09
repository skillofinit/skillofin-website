import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import {
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaPinterest,
  FaFacebook,
} from "react-icons/fa6";
import { FiUser, FiUserPlus, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  COMPANY_EMAIL,
  COMPANY_FACEBOOK,
  COMPANY_INSTAGRAM,
  COMPANY_LINKEDIN,
  COMPANY_PINTEREST,
  COMPANY_TWITTER,
} from "@/utiles/appUtils";
import Logo from "./Logo";
import { TbHeartHandshake } from "react-icons/tb";
import { MdLockReset, MdPrivacyTip } from "react-icons/md";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { LuListEnd } from "react-icons/lu";
import { BsCardList } from "react-icons/bs";
import { IoPricetagsOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

function HomeNavBar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      default:
        break;
    }
  }
  function handleNavigation(path: string) {
    navigate(path);
    setMobileMenuOpen(false);
  }

  const socialIcons = [
    { Icon: IoMdMail, title: "Email", link: "mail" },
    { Icon: FaFacebook, title: "Facebook", link: "facebook" },
    { Icon: FaInstagram, title: "Instagram", link: "instagram" },
    { Icon: FaXTwitter, title: "X", link: "x" },
    { Icon: FaLinkedin, title: "LinkedIn", link: "linkedin" },
    { Icon: FaPinterest, title: "Pinterest", link: "pinterest" },
  ];

  return (
    <header className="relative bg-background shadow-md  ">
      {/* Navbar */}
      <div className="w-full flex h-fit px-4 lg:px-8 py-4 lg:py-3">
        <div className={`flex items-center w-full justify-between `}>
          {/* {displayLogo && (
            <img
              onClick={() => navigate("/")}
              src="Skillofin-Logo.png"
              alt="SkilloFin logo"
              className="cursor-pointer w-[40vw] lg:w-[10vw] max-w-xs md:w-[30vw]"
            />
          )} */}
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <Logo />
          </div>

          <div className="flex items-center gap-10">
            {/* LG Navbar - remains unchanged */}
            <div className="items-center gap-5 lg:flex hidden">
              {localStorage?.getItem("emailId") && (
                <Button onClick={()=>{navigate("/feed")}} className="h-8" variant={"default"}>
                  Feed
                </Button>
              )}

              <IoMdMail
                title="Email"
                onClick={() => handleOpenLinks("mail")}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaFacebook
                title="Facebook"
                onClick={() => handleOpenLinks("facebook")}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaInstagram
                title="Instagram"
                onClick={() => handleOpenLinks("instagram")}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaXTwitter
                title="X"
                onClick={() => handleOpenLinks("x")}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaLinkedin
                title="LinkedIn"
                onClick={() => handleOpenLinks("linkedin")}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaPinterest
                title="Pinterest"
                onClick={() => handleOpenLinks("pinterest")}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              {/* Mobile Menu Icon */}
            </div>
            <div className=" flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex ">
          <div className="fixed lg:w-fit w-[80vw]  top-0 h-full bg-white shadow-xl p-6 -mt-2 z-50 flex flex-col justify-between animate-slide-in">
            {/* Logo & Menu Items */}
            <div className="flex flex-col gap-8 cursor-pointer">
              <div
                className=""
                onClick={() => {
                  navigate("/");
                }}
              >
                <Logo />
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col gap-3">
                {[
                  { label: "Home", icon: <FaHome />, path: "/" },
                  { label: "Login", icon: <FiUser />, path: "/login" },
                  { label: "Sign Up", icon: <FiUserPlus />, path: "/signup" },
                  {
                    label: "Contact Us",
                    icon: <TbHeartHandshake />,
                    path: "/contactus",
                  },

                  {
                    label: "Faqs",
                    icon: <FaQuestionCircle />,
                    path: "/faqs",
                  },
                  {
                    label: "Terms and conditions",
                    icon: <LuListEnd />,
                    path: "/terms-and-conditions",
                  },
                  {
                    label: "Privacy policy",
                    icon: <MdPrivacyTip />,
                    path: "/privacy-policy",
                  },

                  {
                    label: "Blog",
                    icon: <BsCardList />,
                    path: "/blog",
                  },

                  {
                    label: "Pricing",
                    icon: <IoPricetagsOutline />,
                    path: "/pricing",
                  },

                  {
                    label: "Reset Password",
                    icon: <MdLockReset />,
                    path: "/forgotpassword",
                    variant: "destructive",
                  },
                ].map(({ label, icon, path, variant }, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-3 px-5 py-2 rounded-lg lg:text-[15px]  font-medium transition-all duration-200 
                  ${
                    variant === "destructive"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gradient-to-r from-blue-600 to-purple-500 text-white hover:opacity-90"
                  }`}
                    onClick={() => handleNavigation(path)}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-4 items-center justify-center  lg:grid-cols-6 gap-3">
                {socialIcons.map(({ Icon, title, link }, index) => (
                  <Icon
                    key={index}
                    title={title}
                    className="p-2 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 transition-all duration-200"
                    onClick={() => handleNavigation(link)}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="text-center text-gray-600 text-sm items-center flex flex-col w-full ">
                <p>© 2025 SkilloFin. All Rights Reserved.</p>
                <p className="text-primary cursor-pointer border-b border-primary mt-2 w-fit">
                  support@skillofin.com
                </p>
              </div>
            </div>
          </div>
          <div
            className="w-full h-full z-10"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          ></div>
        </div>
      )}
    </header>
  );
}

export default HomeNavBar;
