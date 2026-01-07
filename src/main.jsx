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
import MyDashboard from './pages/MyDashboard'
import PrivateRoute from './Routes/PrivateRoute'

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
   //{
  //   path:"/customer",
  //   element:<PrivateRoute><CustomerDashBoard/></PrivateRoute>
  //  },
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
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
