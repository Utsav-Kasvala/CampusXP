import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">CampusXP</h2>
        </div>

        

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} CampusXP. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
