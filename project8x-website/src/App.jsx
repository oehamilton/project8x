import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import DefaultPage from "./DefaultPage.jsx";
import Products from "./Products.jsx";
import ContactUs from "./ContactUs.jsx";
import CompanyServices from "./CompanyServices.jsx";
import ExecutiveLeadership from "./ExecutiveLeadership.jsx";
import ServiceDetail from "./ServiceDetail.jsx";
import Platforms from "./Platforms.jsx";
import AgentForge from "./AgentForge.jsx";
import Work from "./Work.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="sd-shell">
        <Header />
        <div className="sd-frame">
        <main id="main" className="sd-main">
          <Routes>
            <Route path="/" element={<DefaultPage />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/CompanyServices" element={<CompanyServices />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/agentforge" element={<AgentForge />} />
            <Route path="/AgentForge" element={<AgentForge />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<ExecutiveLeadership />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/ExecutiveLeadership" element={<ExecutiveLeadership />} />
            <Route path="/service/:serviceId" element={<ServiceDetail />} />
          </Routes>
        </main>
        <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
