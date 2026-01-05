import React from "react"
import { Link } from "react-router-dom"

import farmerImg from "../assets/farmerImg.jpg"
import customerImg from "../assets/customerImg.jpg"
import agriexport from "../assets/agriexport.png"

const roles = [
  {
    key: "FARMER",
    title: "Farmer",
    image: farmerImg,
    description:
      "Sell crops, buy seeds, book vehicles, and get expert advice.",
    features: [
      "Sell vegetables",
      "Buy seeds & pesticides",
      "Book transport",
      "Consult experts",
    ],
  },
  {
    key: "CUSTOMER",
    title: "Customer",
    image: customerImg,
    description:
      "Buy fresh vegetables and crops directly from farmers.",
    features: [
      "Buy fresh produce",
      "Bulk ordering",
      "Track deliveries",
      "Quality assured",
    ],
  },
  {
    key: "AGRI_EXPERT",
    title: "Agri Expert",
    image: agriexport,
    description:
      "Provide consultations and help farmers with crop health.",
    features: [
      "Manage appointments",
      "Online consultations",
      "Earn from expertise",
      "Help farmers",
    ],
  },
]

const LoginSelection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-emerald-100 p-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-green-800 mb-2">
        Welcome to Kisan Mitra
      </h1>
      <p className="text-gray-600 mb-12 text-lg italic">
        Choose how you want to use the app
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {roles.map((role) => (
          <div
            key={role.key}
            className="bg-white rounded-2xl p-6 flex flex-col items-center text-center
                       shadow-md hover:shadow-xl transition-shadow"
          >
            <img
              src={role.image}
              alt={role.title}
              className="w-24 h-24 mb-4 object-contain"
            />

            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              {role.title}
            </h2>

            <p className="text-gray-600 mb-4 italic">
              {role.description}
            </p>

            <ul className="text-left text-gray-700 list-disc list-inside mb-6 space-y-1">
              {role.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {/* Pass role to register page */}
            <Link
              to="/register"
              state={{ role: role.key }}
              className="mt-auto bg-green-600 text-white px-6 py-2 rounded-lg
                         hover:bg-green-700 transition"
            >
              Register as {role.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoginSelection
