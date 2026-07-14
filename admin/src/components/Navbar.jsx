import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center justify-between py-2 px-[4%] shadow-md">
      {/* Logo */}
      <img
        className="w-[max(10%,80px)]"
        src={assets.logo}
        alt="Logo"
      />

      {/* Logout Button */}
      <button onClick={()=>setToken('')} className="bg-gray-700 text-white px-6 py-1.5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-800 transition">
        Logout
      </button>
    </div>
  )
}

export default Navbar
