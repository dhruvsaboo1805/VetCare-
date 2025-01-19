import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Overview = lazy(() => import("./pages/Overview"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Profile = lazy(() => import("./pages/Profile"));
const Analytics = lazy(() => import("./pages/Analytics"));
const PetSidebar = lazy(() => import("./pages/PetSidebar"));
const PetDashboard = lazy(() => import("./pages/PetDashboard"));
const DailyTracking = lazy(() => import("./pages/DailyTracking"));
const Reminder = lazy(() => import("./pages/Reminder"));
const Calender = lazy(() => import("./pages/Calender"));
// const DailyTracking = lazy(() => import("./pages/DailyTracking")); // New route for DailyTracking
// const VetVisits = lazy(() => import("./pages/VetVisits")); // New route for VetVisits
// const PetProfile = lazy(() => import("./pages/PetProfile")); // New route for PetProfile

function App() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isPetSidebarPage = location.pathname.startsWith("/petsidebar/"); // Check if the path starts with `/petsidebar/`

  return (
    <div className="flex h-screen">
      {isLandingPage || location.pathname === "/blogs" ? (
        // Show Landing Page and Blogs page without Navbar and Sidebar
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </Suspense>
      ) : isAuthPage ? (
        // Show Login or SignUp pages without Navbar and Sidebar
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      ) : isPetSidebarPage ? (
        // PetSidebar Layout for `/petsidebar/` paths
        <div className="flex flex-1">
          <PetSidebar />
          <div className="flex-1 p-4">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/petsidebar/:pet_id" element={<PetSidebar />} />
                <Route path="/petsidebar/dashboard" element={<PetDashboard />} />
                <Route path="/petsidebar/dailytrack" element={<DailyTracking />} />
                <Route path="/petsidebar/reminder" element={<Reminder />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      ) : (
        // Common Layout for other routes
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/overview" element={<Overview />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/calender" element={<Calender />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;