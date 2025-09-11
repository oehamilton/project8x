import React from "react";
import { FaRocket, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header({ toggleSidebar, isSidebarOpen }) {
  return (
    <header className="bg-gray-950/80 backdrop-blur-sm text-white flex items-center justify-between px-2 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-md relative z-40">
      <div className="flex items-center">
        <img
          src="/Project8Xwt_tr.png"
          alt="Project8X Logo"
          className="w-91 h-8 sm:w-63 sm:h-7 mr-1 sm:mr-2"
        />

        <span className="text-sm sm:text-lg font-bold text-gray-100 drop-shadow-lg"></span>
        <button
          onClick={toggleSidebar}
          className="ml-2 text-gray-200 hover:text-gray-50 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <FaBars className="text-xl" />
        </button>
        {/* Dropdown Menu (Bubble Overlay) */}
        {isSidebarOpen && (
          <div className="absolute left-0 top-full mt-2 w-64 bg-gray-800/90 backdrop-blur-sm text-white rounded-lg shadow-lg animate-slide-down z-50">
            <ul className="p-2">
              <li>
                <Link
                  to="/CompanyServices"
                  className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors"
                  onClick={toggleSidebar}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/Products"
                  className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors"
                  onClick={toggleSidebar}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/ExecutiveLeadership"
                  className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors"
                  onClick={toggleSidebar}
                >
                  Executive Leadership
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <nav className="flex space-x-2 sm:space-x-4">
        <Link
          to="/"
          className="hover:text-gray-200 transition-colors text-sm sm:text-base drop-shadow-md"
        >
          Home
        </Link>
        <Link
          to="/ContactUs"
          className="hover:text-gray-200 transition-colors text-sm sm:text-base drop-shadow-md"
        >
          Contact Us
        </Link>
        <a
          href="#"
          className="hover:text-gray-200 transition-colors text-sm sm:text-base drop-shadow-md"
        >
          Options
        </a>
      </nav>
    </header>
  );
}

// Animation for dropdown
const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-slide-down {
    animation: slideDown 0.3s ease-out;
  }
`;

export default Header;
