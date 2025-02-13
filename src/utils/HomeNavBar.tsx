import { IoMdMail } from "react-icons/io";
import {
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa6";
import {
  COMPANY_EMAIL,
  COMPANY_FACEBOOK,
  COMPANY_INSTAGRAM,
  COMPANY_LINKEDIN,
  COMPANY_PINTEREST,
  COMPANY_TWITTER,
} from "@/utiles/appUtils";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FiUser,FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface HomeNavBarInterface {
  displayLogo?: boolean;
}

function HomeNavBar({ displayLogo = false }: HomeNavBarInterface) {

  const navigate = useNavigate()



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

  // if(true) return <AppSpiner/>
  return (
    <div className="w-full flex h-fit px-4 lg:px-8 py-2 ">
      <div
        className={`flex items-center w-full ${
          displayLogo ? "justify-between" : "justify-end"
        } `}
      >
        {displayLogo && (
          <img onClick={()=>{navigate("/")}}
            src="Skillofin-Logo.png"
            alt="skillofin logo"
            className="cursor-pointer w-[40vw] lg:w-[10vw] max-w-xs md:w-[30vw]"
          />
        )}
        <div className="items-center gap-5 lg:flex hidden">
          <IoMdMail
            title="Email"
            onClick={() => {
              handleOpenLinks("mail");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />
          <FaFacebook
            title="Facebook"
            onClick={() => {
              handleOpenLinks("facebook");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />
          <FaInstagram
            title="Instagram"
            onClick={() => {
              handleOpenLinks("instagram");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />
          <FaXTwitter
            title="X"
            onClick={() => {
              handleOpenLinks("x");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />

          <FaLinkedin
            title="LinkedIn"
            onClick={() => {
              handleOpenLinks("linkedin");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />

          <FaPinterest
            title="Pinterest"
            onClick={() => {
              handleOpenLinks("pinterest");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />

          <Button variant={"ghost"} onClick={()=>{navigate("/login")}}>
            <div className="flex items-center gap-2">
              <FiUser className="w-6 h-6" />
              <p> Login</p>
            </div>
          </Button>
          
          <Button variant={"ghost"} onClick={()=>{navigate("/signup")}}>
            <div className="flex items-center gap-2">
              <FiUserPlus className="w-6 h-6" />
              <p>Sign Up</p>
            </div>
          </Button>

        </div>
      </div>
    </div>
  );
}

export default HomeNavBar;
