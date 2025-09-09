import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import DefaultPage from "./DefaultPage.js";
import Products from "./Products.js";
import ContactUs from "./ContactUs.js";
import CompanyServices from "./CompanyServices.js";
import ExecutiveLeadership from "./ExecutiveLeadership.js";
import "./App.css"; // Import the CSS file

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="h-screen bg-gray-900 p-2 sm:p-4 flex flex-col gap-2 sm:gap-4 overflow-hidden relative" 
           style={{
             backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80")',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat',
             backgroundAttachment: 'fixed'
           }}>
        {/* Top Pane: Header with Navigation Toggle bg-gray-900 p-6 text-gray-200 shadow-inner*/}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Main Content: Full-width Main Pane */}
        <main className="flex-1 bg-gray-900/50 backdrop-blur-sm border rounded-lg shadow-md overflow-y-auto custom-scrollbar relative z-10">
          <Routes>
            <Route path="/" element={<DefaultPage />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/CompanyServices" element={<CompanyServices />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route
              path="/ExecutiveLeadership"
              element={<ExecutiveLeadership />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
