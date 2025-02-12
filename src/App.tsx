import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./features/signup/Signup";
import Login from "./features/login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import Home from "./features/home/Home";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="w-[100vw] h-[100vh] flex bg-background ">
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
