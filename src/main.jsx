import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import App from './App.jsx'
import PublicRoute from './Routes/PublicRoute'
import LoginSelection from './pages/LoginSelection'

import DoctorDashboard from './pages/Dasboards/DoctorDashboard/DoctorDashboard'
import FarmerDashboard from './pages/Dasboards/FarmerDashboard/FarmerDashboard'
import Herosection from './pages/Herosection'
import AppwriteAccount from './Appwrite/Account.Services'

console.log(typeof APPWRITE_ENDPOINT)

//instance
const appwriteAccount = new AppwriteAccount()
const user= await appwriteAccount.getAppwriteUser()
console.log(user)


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

      path:"/farmer",
      element:<FarmerDashboard/>
     },
     {
      path:"/herosection",
      element:<Herosection/>

     },
     {
      path:"/loginSelection",
      element:<LoginSelection/>
     },
     {

      path:"/doctorDashboard",
      element:<DoctorDashboard/>
     }
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
