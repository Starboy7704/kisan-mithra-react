import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import App from "./App.jsx";
import PublicRoute from "./Routes/PublicRoute";
import LoginSelection from "./pages/LoginSelection";
import CustomerDashboard from "./pages/Dasboards/CustomerDashboard/CustomerDashboard";
import DoctorDashboard from "./pages/Dasboards/DoctorDashboard/DoctorDashboard";
import FarmerDashboard from "./pages/Dasboards/FarmerDashboard/FarmerDashboard";
import AdminDashboard from "./pages/Dasboards/AdminDashboard/AdminDashboard";
import Herosection from "./pages/Herosection";
import PrivateRoute from "./Routes/PrivateRoute";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import AboutSection from "./pages/AboutSection";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  { path: "/", element: <App /> },

  { path: "/register", element: <SignupPage /> },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/customer",
    element: 
    (
      <PrivateRoute allowedRoles={["CUSTOMER"]}>
        <CustomerDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/doctor",
    element: (
      <PrivateRoute allowedRoles={["AGRI_EXPERT"]}>
        <DoctorDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/farmer",
    element: (
      <PrivateRoute allowedRoles={["FARMER"]}>
        <FarmerDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["ADMIN"]}>
        <AdminDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/herosection",
    element: <Herosection />,
  },
  {
    path: "/aboutsection",
    element: <AboutSection />,
  },
  {
    path: "/loginSelection",
    element: <LoginSelection />,
  },
]);
createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </>,
);
