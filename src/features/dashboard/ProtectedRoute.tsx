import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteInterface {
  children: ReactNode;
}
function ProtectedRoute({ children }: ProtectedRouteInterface) {
  const navigate = useNavigate();

  const encodedEmailId = localStorage.getItem("authToken");

  useEffect(() => {
    if (encodedEmailId) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <div className="h-full w-full">{children}</div>;
}

export default ProtectedRoute;
