import { useAppContext } from "@/utiles/AppContext";
import { CiBank } from "react-icons/ci";

function Loans() {
  const { userRole } = useAppContext();

  return (
    <div className="w-full h-[43vh] text-white border rounded-xl overflow-hidden shadow-md transition-all hover:shadow-purple-600/50 relative">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center gap-3 text-black rounded-t-xl text-xl font-semibold px-6 py-3">
        <CiBank className="text-2xl" />
        {userRole === "FREELANCER" ? "Loans for you" : "Recent loans"}
      </div>

      {/* Body */}
      <div className="text-foreground px-6 py-4">
        <p className="mb-3 text-lg font-medium ">
          Explore our exclusive loan options:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-md">
          <li>Personal Loan – Low interest rates</li>
          <li>Home Loan – Flexible repayment plans</li>
          <li>Education Loan – Empower your future</li>
        </ul>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-2 right-4 text-gray-400 text-sm font-semibold opacity-60">
        Coming Soon...
      </div>
    </div>
  );
}

export default Loans;
