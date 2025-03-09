import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./features/signup/Signup";
import Login from "./features/login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import Home from "./features/home/Home";
import DashBoardMain from "./features/dashboard/DashBoardMain";
import MyProfileMain from "./features/myprofile/MyProfileMain";
import ProtectedLayout from "./features/dashboard/ProtectedRoute";
import MessagesMain from "./features/messages/MessagesMain";
import MyJobsMain from "./features/myjobs/MyJobsMain";
import JobsMain from "./features/jobs/JobsMain";
import CreatePost from "./features/createpost/CreatePost";
import MyPosts from "./features/createpost/utils/MyPosts";
import ForgotPassword from "./features/forogotpassword/ForgotPassword";
import ContactUsPage from "./features/contactus/ContactUsPage";
import CreatePaymentPage from "./features/payment/CreatePaymet";
import Faq from "./features/faqs/Faq";
import TermsAndConditions from "./features/termsconditions/TermsAndConditions";
import PrivacyPolicy from "./features/privacypolicy/PrivacyPolicy";
import VerifyPayment from "./features/verifypayment/VerifyPayemnt";
import Blog from "./features/blog/Blog";
import Withdraw from "./features/withdraw/Withdraw";
import Pricing from "./features/pricing/Pricing";
import CoursesPage from "./features/courses/Courses";
import LoansPage from "./features/loans/LoansPage";
import HomeLayout from "./utils/HomeLayout";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="w-[100vw] h-[100vh] flex bg-background ">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contactus" element={<ContactUsPage />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/faqs" element={<Faq />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/pricing" element={<Pricing />} />
            </Route>

            <Route element={<ProtectedLayout />}>
              <Route path="/feed" element={<DashBoardMain />} />
              <Route path="/myprofile" element={<MyProfileMain />} />
              <Route path="/profile" element={<MyProfileMain />} />
              <Route path="/messages" element={<MessagesMain />} />
              <Route path="/myjobs" element={<MyJobsMain />} />
              <Route path="/jobs" element={<JobsMain />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/myposts" element={<MyPosts />} />
              <Route path="/payment" element={<CreatePaymentPage />} />
              <Route path="/verify" element={<VerifyPayment />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/loans" element={<LoansPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}
export default App;
