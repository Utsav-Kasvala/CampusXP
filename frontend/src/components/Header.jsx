import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="bg-blue-300 shadow-md sticky top-0 z-50">
    <div className="max-w-[1050px] mx-auto flex justify-between items-center p-4">
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/home" className="text-gray-600 hover:text-green-500">Home</Link></li>
          <li><Link to="/login" className="text-gray-600 hover:text-green-500">Login</Link></li>
          <li><Link to="/register" className="text-gray-600 hover:text-green-500">Register</Link></li>
        </ul>
      </nav>
    </div>
  </header>
  )
}

