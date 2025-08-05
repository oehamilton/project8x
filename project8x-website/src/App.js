import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import DefaultPage from "./DefaultPage.js";
import "./App.css"; // Import the CSS file

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="h-screen bg-gray-900 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 overflow-hidden">
        {/* Top Pane: Header with Navigation Toggle bg-gray-900 p-6 text-gray-200 shadow-inner*/}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Main Content: Full-width Main Pane */}
        <main className="flex-1 bg-gray-900 border rounded-lg shadow-md overflow-y-auto custom-scrollbar">
          <Routes>
            <Route path="/" element={<DefaultPage />} />
            <Route path="/custom1" element={<custom1 />} />
            <Route path="/custom2" element={<custom2 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
