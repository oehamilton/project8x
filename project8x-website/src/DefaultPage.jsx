// src/DefaultPage.js
import React from "react";
import { 
  FaHeadset, 
  FaCogs, 
  FaChartLine, 
  FaRocket, 
  FaPhone, 
  FaFileAlt, 
  FaComments, 
  FaDatabase,
  FaCode,
  FaArrowRight
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const slideImage = "/Project8Xwt_tr.png";

function DefaultPage() {
  const navigate = useNavigate();
  
  const serviceOverview = [
    {
      icon: <FaHeadset className="text-2xl text-blue-400" />,
      title: "Contact Center Technology Consulting",
      description: "Expert consulting to optimize contact center operations and enhance customer experiences.",
      route: "/service/contact-center-technology-consulting"
    },
    {
      icon: <FaCogs className="text-2xl text-green-400" />,
      title: "System Integration & Deployment",
      description: "Seamless integration of contact center platforms including Genesys, Avaya, and Cisco systems.",
      route: "/service/system-integration-deployment"
    },
    {
      icon: <FaChartLine className="text-2xl text-yellow-400" />,
      title: "Real-Time Analytics & Dashboards",
      description: "Custom analytics dashboards using Power BI, Python, and JavaScript for operational visibility.",
      route: "/service/real-time-analytics-dashboard"
    },
    {
      icon: <FaRocket className="text-2xl text-purple-400" />,
      title: "DevOps & Automation",
      description: "Modern DevOps practices with CI/CD pipelines, Docker, and AI-driven automation tools.",
      route: "/service/devops-automation-implementation"
    },
    {
      icon: <FaPhone className="text-2xl text-red-400" />,
      title: "Telephony Project Management",
      description: "Complex telephony projects including ACD upgrades and multi-site rollouts.",
      route: "/service/telephony-project-management"
    },
    {
      icon: <FaFileAlt className="text-2xl text-indigo-400" />,
      title: "RFP Development & Vendor Selection",
      description: "Comprehensive RFP creation and vendor evaluation for technology acquisitions.",
      route: "/service/rfp-development-vendor-selection"
    },
    {
      icon: <FaComments className="text-2xl text-orange-400" />,
      title: "Multi-Channel Communication",
      description: "Unified customer experiences across voice, email, web chat, and collaboration tools.",
      route: "/service/multi-channel-communication-solutions"
    },
    {
      icon: <FaDatabase className="text-2xl text-teal-400" />,
      title: "Database Optimization",
      description: "Database optimizations, custom scripting, and secure environments using VMware and Oracle.",
      route: "/service/database-optimization-custom-development"
    },
    {
      icon: <FaCode className="text-2xl text-cyan-400" />,
      title: "Website Development",
      description: "Modern, responsive websites with omnichannel integration and contact center connectivity.",
      route: "/service/website-development-services"
    }
  ];

  return (
    <div className="bg-transparent p-6 text-gray-200 shadow-inner">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <img
            src={slideImage}
            className="w-64 h-auto object-contain"
            alt="Project8X Logo"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-200 drop-shadow-lg">
          Welcome to Project8X
        </h1>
        <p className="text-xl drop-shadow-md max-w-4xl mx-auto mb-8">
          Leading provider of contact center technology solutions, delivering innovative 
          implementations and expert consulting to Fortune 500 companies worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/CompanyServices"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Explore Our Services
            <FaArrowRight className="ml-2" />
          </Link>
          <Link
            to="/ContactUs"
            className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get In Touch
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-200 drop-shadow-lg">
          Our Service Offerings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceOverview.map((service, index) => (
            <div 
              key={index}
              onClick={() => navigate(service.route)}
              className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 shadow-lg text-center cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-200 drop-shadow-lg mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300 drop-shadow-md text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300 shadow-lg">
          <h3 className="text-xl font-bold text-gray-200 drop-shadow-lg mb-4">
            Why Choose Project8X?
          </h3>
          <ul className="space-y-3 text-gray-300 drop-shadow-md">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>35+ years of industry experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>Fortune 500 client portfolio</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>Proven track record of success</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>Cutting-edge technology solutions</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300 shadow-lg">
          <h3 className="text-xl font-bold text-gray-200 drop-shadow-lg mb-4">
            Our Expertise
          </h3>
          <ul className="space-y-3 text-gray-300 drop-shadow-md">
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Contact Center Technologies</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>System Integration & Deployment</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Real-Time Analytics & Reporting</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>DevOps & Automation</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Website Development</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300 shadow-lg">
          <h3 className="text-xl font-bold text-gray-200 drop-shadow-lg mb-4">
            Client Success
          </h3>
          <p className="text-gray-300 drop-shadow-md mb-4">
            Trusted by industry leaders including Bank of America, IBM, Lockheed Martin, 
            Expedia, and many more Fortune 500 companies.
          </p>
          <Link
            to="/ExecutiveLeadership"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
          >
            Meet Our Leadership
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DefaultPage;
