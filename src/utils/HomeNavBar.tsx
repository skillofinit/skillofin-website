import  { useState } from "react";
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
import { GiArmoredBoomerang } from "react-icons/gi";

interface HomeNavBarInterface {
  displayLogo?: boolean;
}

function HomeNavBar({}: HomeNavBarInterface) {
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
    <header className="relative">
      {/* Navbar */}
      <div className="w-full flex h-fit px-4 lg:px-8 py-2">
        <div
          className={`flex items-center w-full justify-end `}
        >
          {/* {displayLogo && (
            <img
              onClick={() => navigate("/")}
              src="Skillofin-Logo.png"
              alt="SkilloFin logo"
              className="cursor-pointer w-[40vw] lg:w-[10vw] max-w-xs md:w-[30vw]"
            />
          )} */}

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
            <Button variant="default" onClick={() => navigate("/login")}>
              <div className="flex items-center gap-2">
                <FiUser className="w-6 h-6" />
                <p>Login</p>
              </div>
            </Button>
            <Button variant="default" onClick={() => navigate("/signup")}>
              <div className="flex items-center gap-2">
                <FiUserPlus className="w-6 h-6" />
                <p>Sign Up</p>
              </div>
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <FiX className="w-8 h-8" />
              ) : (
                <FiMenu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed  w-[70vw] top-0 h-[100vh]  justify-between bg-white shadow p-6 z-50 flex flex-col gap-6 ">
          <div className="flex flex-col gap-10  ">
            <div className="flex items-center">
              <div className="mt-8">
                <h1 className="font-bold text-[30px]  font-serif">SkilloFin</h1>

                <div className="h-1 mt-[4vw] lg:mt-[2vw] bg-primary w-[40vw] lg:w-[15vw]"></div>
              </div>
              <GiArmoredBoomerang className=" w-7 h-7 -mt-2 ml-3" />
            </div>
            {/* Login & Sign Up Buttons */}
            <div className="flex flex-col gap-4 px-3">
              <Button
                variant="outline"
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
                variant="outline"
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <FiUserPlus className="w-6 h-6" />
                  <p>Sign Up</p>
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
