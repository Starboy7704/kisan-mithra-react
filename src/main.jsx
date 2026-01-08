import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import App from './App.jsx'
import PublicRoute from './Routes/PublicRoute'
import LoginSelection from './pages/LoginSelection'
import CustomerDashboard from './pages/Dasboards/CustomerDashboard/CustomerDashboard'
import DoctorDashboard from './pages/Dasboards/DoctorDashboard/DoctorDashboard'
import FarmerDashboard from './pages/Dasboards/FarmerDashboard/FarmerDashboard'
import Herosection from './pages/Herosection'
import AppwriteAccount from './Appwrite/Account.Services'
import MyDashboard from './pages/MyDashboard'
import PrivateRoute from './Routes/PrivateRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AboutSection from './pages/AboutSection'

console.log(typeof APPWRITE_ENDPOINT)

//instance
const appwriteAccount = new AppwriteAccount()
const user= await appwriteAccount.getAppwriteUser()
console.log(user)
const queryClient = new QueryClient()


const router=createBrowserRouter([
  { path: "/",
     element: <App/>
   },

  { path: "/register",
     element: <SignupPage/>
   },

  { path: "/login",
     element: <PublicRoute><LoginPage/></PublicRoute>
   },
   {
    path:"/customer",
    element:<CustomerDashboard/>
   },
   {
    path:"/doctor",
    element:<PrivateRoute><DoctorDashboard/></PrivateRoute>
   },
     {

      path:"/farmer",
      element:<FarmerDashboard/>
     },
     {
      path:"/herosection",
      element:<Herosection/>
     },
     {
      path:"/aboutsection",
      element:<AboutSection/>
     },
     {
      path:"/loginSelection",
      element:<LoginSelection/>
     },
     {
      path : "/mydashboard",
      element : <PrivateRoute><MyDashboard/></PrivateRoute>
     },
     {

      path:"/doctorDashboard",
      element: <PrivateRoute><DoctorDashboard/></PrivateRoute>
     }
])
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>//=React Context for TanStack Query
);
