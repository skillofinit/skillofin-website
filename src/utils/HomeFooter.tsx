import { COMPANY_EMAIL } from "@/utiles/appUtils";

function HomeFooter() {
  function handleEmailClick() {
    window.open(`mailto:${COMPANY_EMAIL}`);
  }
  return (
    <div className="pt-[10vh] pb-10 w-full bg-background flex justify-center ">
      <div className="w-[90vw] flex lg:flex-row flex-col gap-4 items-center justify-between">
        <p>© 2025 SkilloFin. All Rights Reserved.</p>
        <div className="flex items-center gap-2 flex-col ">
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
