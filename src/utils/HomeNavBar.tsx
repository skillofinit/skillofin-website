import { IoMdMail } from "react-icons/io";
import {
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaPinterest
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

interface HomeNavBarInterface{

  displayLogo?:boolean
}


function HomeNavBar({displayLogo = false}:HomeNavBarInterface) {
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

  return (
    <div className="w-full flex h-fit px-4 lg:px-8 py-2 ">
      <div className={`flex items-center w-full ${displayLogo ?"justify-between":"justify-end"} `}>
      {
        displayLogo &&   <img
        src="Skillofin-Logo.png"
        alt="skillofin logo"
        className="cursor-pointer w-[40vw] lg:w-[10vw] max-w-xs md:w-[30vw]"
      />
      }
        <div className="items-center gap-5 lg:flex hidden">
          <IoMdMail title="Email" 
            onClick={() => {
              handleOpenLinks("mail");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />
          <FaFacebook title="Facebook"
            onClick={() => {
              handleOpenLinks("facebook");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />
           <FaInstagram title="Instagram"
            onClick={() => {
              handleOpenLinks("instagram");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />
          <FaXTwitter title="X"
            onClick={() => {
              handleOpenLinks("x");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />

          <FaLinkedin title="LinkedIn"
            onClick={() => {
              handleOpenLinks("linkedin");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />
          
          <FaPinterest title="Pinterest"
            onClick={() => {
              handleOpenLinks("pinterest");
            }}
            className="p-2 cursor-pointer hover:scale-125  rounded-full w-10 h-10"
          />
          
          
         
        </div>
      </div>
    </div>
  );
}

export default HomeNavBar;
