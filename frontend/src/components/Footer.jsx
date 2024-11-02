import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Campus College Tracker</h2>
          <p className="text-sm text-gray-400">Track your classes and attendance effortlessly</p>
        </div>

        <nav className="flex space-x-4 mb-4 md:mb-0">
          <a href="#" className="text-gray-400 hover:text-white">Home</a>
          <a href="#" className="text-gray-400 hover:text-white">About</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact</a>
        </nav>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Campus College Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
