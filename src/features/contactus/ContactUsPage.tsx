import ContactUs from "@/utils/ContactUs";
import HomeFooter from "@/utils/HomeFooter";

function ContactUsPage() {
  return (
    <div className="flex flex-col h-[100vh] w-[100vw] overflow-hidden">
      <div className="flex-grow flex justify-center w-full overflow-y-auto">
        <div className="w-full max-w-5xl px-20">
          <ContactUs />
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default ContactUsPage;
