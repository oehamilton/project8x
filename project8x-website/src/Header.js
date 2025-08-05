import React from "react";
import { FaRocket, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header({ toggleSidebar, isSidebarOpen }) {
  return (
    <header className="bg-gray-950 text-white flex items-center justify-between px-2 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-md relative">
      <div className="flex items-center">
        <img
          src="/Project8Xwt_tr.png"
          alt="Project8X Logo"
          className="w-205 h-15 sm:w-116 sm:h-16 mr-1 sm:mr-2"
        />

        <span className="text-sm sm:text-lg font-bold text-gray-100"></span>
        <button
          onClick={toggleSidebar}
          className="ml-2 text-gray-200 hover:text-gray-50 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <FaBars className="text-xl" />
        </button>
        {/* Dropdown Menu (Bubble Overlay) */}
        {isSidebarOpen && (
          <div className="absolute left-0 top-full mt-2 w-64 bg-gray-800 text-white rounded-lg shadow-lg animate-slide-down z-10">
            <ul className="p-2">
              <li>
                <Link
                  to="/Services"
                  className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors"
                  onClick={toggleSidebar}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/Clients"
                  className="block px-4 py-2 hover:bg-gray-700 rounded transition-colors"
                  onClick={toggleSidebar}
                >
                  Clients
                </Link>
              </li>
              <li>
                <Link
                  to="/Executive_Leadership"
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
          className="hover:text-gray-200 transition-colors text-sm sm:text-base"
        >
          Home
        </Link>
        <a
          href="#"
          className="hover:text-gray-200 transition-colors text-sm sm:text-base"
        >
          Options
        </a>
        <a
          href="#"
          className="hover:text-gray-200 transition-colors text-sm sm:text-base"
        >
          Help
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
