// src/DefaultPage.js
import React from "react";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon

const slideImage = "/Project8Xwt_tr.png";

function DefaultPage() {
  return (
    <div className="bg-gray-900 p-6 text-gray-200 shadow-inner">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">
        Welcome to Project8X
      </h2>
      <p className="text-lg">
        This is the default page. Use the{" "}
        <FaBars className="inline text-xl align-middle" /> menu to navigate to
        the website or other features.
      </p>
      <div className="relative max-w-full max-h-full">
        <img
          src={slideImage}
          className="w-full h-auto object-contain"
          alt="slide image"
        />
      </div>
    </div>
  );
}

export default DefaultPage;
