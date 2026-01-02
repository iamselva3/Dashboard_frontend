import React from 'react';
import { FiHeart, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-2">
      <div className="container mx-auto px-6">
        <div className=" pt-1">
           {/* <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <h2 className="text-xl font-bold">Blackcoffer Analytics</h2>
            </div> */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="/docs" className="text-gray-400 hover:text-white text-sm">
                Documentation
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact
              </a>
            </div>
          </div>

          {/* <div className="mt-4 text-center text-gray-500 text-sm">
            <p className="flex items-center justify-center">
              Made with <FiHeart className="mx-1 text-red-500" /> by the Blackcoffer Team
            </p>
            <p className="mt-1">Data last updated: {new Date().toLocaleDateString()}</p>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;