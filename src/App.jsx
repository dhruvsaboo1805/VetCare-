import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Overview = lazy(() => import("./pages/Overview"));
const LandingPage = lazy(() => import("./pages/LandingPage"));

function App() {
  const location = useLocation(); // Get the current route path

  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"; // Check if it's Login or SignUp

  return (
    <div className="flex h-screen">
      {isLandingPage ? (
        // Show Landing Page only
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
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
      ) : (
        // Common Layout for other routes
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/overview" element={<Overview />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
