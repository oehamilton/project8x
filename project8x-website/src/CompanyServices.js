// src/DefaultPage.js
import React from "react";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon

function CompanyServices() {
  return (
    <div className="bg-gray-900 p-6 text-gray-200 shadow-inner">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">
        Welcome to Project8X Company Services
      </h2>
      <p className="text-lg">
        This is the default page. Use the{" "}
        <FaBars className="inline text-xl align-middle" /> menu to navigate to
        the website or other features.
      </p>
    </div>
  );
}

export default CompanyServices;
