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
import { Button } from "@/components/ui/button";
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
import { MdDashboard, MdLockReset } from "react-icons/md";

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

  // Helper for footer email click
  function handleEmailClick() {
    window.open(`mailto:${COMPANY_EMAIL}`);
  }

  return (
    <header className="relative bg-background shadow-md ">
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

          {/* LG Navbar - remains unchanged */}
          <div className="items-center gap-5 lg:flex hidden">
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
            <Button
              onClick={() => {
                navigate("/contactus");
                setMobileMenuOpen(false);
              }}
            >
              <div className="flex   gap-2">
                <FiUserPlus className="w-6 h-6" />
                <p>Contact Us</p>
              </div>
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
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

      {/* Mobile Slide Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed  w-[80vw] top-0 h-[100vh]  justify-between bg-white shadow p-6 z-50 flex flex-col gap-6 ">
          <div className="flex flex-col gap-10  ">
            <Logo />
            {/* Login & Sign Up Buttons */}
            <div className="flex flex-col gap-6 px-3">
              <Button
                variant="default"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <MdDashboard className="w-6 h-6" />
                  <p>Home</p>
                </div>
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <FiUser className="w-6 h-6" />
                  <p>Login</p>
                </div>
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex gap-2">
                  <FiUserPlus className="w-6 h-6" />
                  <p>Sign Up</p>
                </div>
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  navigate("/contactus");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex   gap-2">
                  <TbHeartHandshake className="w-6 h-6 mt-1" />
                  <p>Contact Us</p>
                </div>
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  navigate("/forgotpassword");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex gap-2">
                  <MdLockReset className="w-6 h-6" />
                  <p>Reset Password</p>
                </div>
              </Button>
            </div>

            {/* Grid of Social Icons */}
          </div>

          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-3 gap-4">
              <IoMdMail
                title="Email"
                onClick={() => {
                  handleOpenLinks("mail");
                  setMobileMenuOpen(false);
                }}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaFacebook
                title="Facebook"
                onClick={() => {
                  handleOpenLinks("facebook");
                  setMobileMenuOpen(false);
                }}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaInstagram
                title="Instagram"
                onClick={() => {
                  handleOpenLinks("instagram");
                  setMobileMenuOpen(false);
                }}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaXTwitter
                title="X"
                onClick={() => {
                  handleOpenLinks("x");
                  setMobileMenuOpen(false);
                }}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaLinkedin
                title="LinkedIn"
                onClick={() => {
                  handleOpenLinks("linkedin");
                  setMobileMenuOpen(false);
                }}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
              <FaPinterest
                title="Pinterest"
                onClick={() => {
                  handleOpenLinks("pinterest");
                  setMobileMenuOpen(false);
                }}
                className="p-2 cursor-pointer hover:scale-125 rounded-full w-10 h-10"
              />
            </div>
            {/* Mobile Footer */}
            <div className="mt-4">
              <div className=" mx-auto flex flex-col gap-4 items-center justify-between">
                <p>© 2025 SkilloFin. All Rights Reserved.</p>
                <div className="flex flex-col items-center gap-2">
                  <p>North American Company</p>
                  <div
                    onClick={handleEmailClick}
                    className="border-b text-primary border-primary cursor-pointer"
                  >
                    {COMPANY_EMAIL}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default HomeNavBar;
