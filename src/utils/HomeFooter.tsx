import { Button } from "@/components/ui/button";
import { COMPANY_EMAIL } from "@/utiles/appUtils";
import { useNavigate } from "react-router-dom";

function HomeFooter() {
  const navigate = useNavigate();
  function handleEmailClick() {
    window.open(`mailto:${COMPANY_EMAIL}`);
  }
  return (
    <div className=" w-full bg-background flex flex-col gap-3 items-center justify-center  p-2">
      <div className="w-[90vw] flex lg:flex-row flex-col lg:gap-4 items-center justify-between">
        <p>© 2025 SkilloFin. All Rights Reserved.</p>
        <div className="flex">
          <Button
            onClick={() => {
              navigate("/faqs");
            }}
            variant={"link"}
          >
            Faqs
          </Button>
          <Button
            onClick={() => {
              navigate("/terms-and-conditions");
            }}
            variant={"link"}
          >
            Terms and conditions
          </Button>
          <Button
            onClick={() => {
              navigate("/privacy-policy");
            }}
            variant={"link"}
          >
            Privacy policy
          </Button>
        </div>
        <div className="flex items-center gap-2  ">
          <p>North American Company</p>
          <div
            onClick={handleEmailClick}
            className="border-b text-primary border-primary"
          >
            {COMPANY_EMAIL}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFooter;
