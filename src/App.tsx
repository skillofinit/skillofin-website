import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Home } from "lucide-react";
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}
export default App;
