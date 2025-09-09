// src/Products.js
import React from "react";
import { 
  FaMobile, 
  FaShieldAlt, 
  FaEnvelope, 
  FaCloud, 
  FaBell, 
  FaArrowRight,
  FaSms
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Products() {
  const products = [
    {
      icon: <FaMobile className="text-3xl text-blue-400" />,
      name: "COMMS",
      tagline: "Secure Messaging for Technicians",
      description: "Android app that integrates with AWS and emails to provide clients with a secure and private, no spam, messaging system to technicians to receive alerts regarding EndPoint devices or any system that alerting is email enabled. Registration is completed via SMS for enhanced security.",
      features: [
        "Android mobile application",
        "AWS cloud integration",
        "Email alert integration",
        "SMS registration for security",
        "Secure and private messaging",
        "No spam messaging system",
        "Real-time technician alerts",
        "EndPoint device monitoring",
        "Email-enabled system alerts",
        "1024 character message limit"
      ],
      technologies: ["Android", "AWS", "SMS", "Email Integration", "Real-time Messaging"],
      status: "Available Now"
    },
    {
      icon: <FaSms className="text-3xl text-green-400" />,
      name: "EZ-SMS.NET",
      tagline: "Standard SMS Messaging Solution",
      description: "Similar to COMMS but delivers messages via standard SMS messaging directly to user's phones. Features the same inbound spam filtering as COMMS, providing secure and reliable SMS delivery for EndPoint device alerts and email-enabled system notifications.",
      features: [
        "Standard SMS delivery",
        "Direct phone messaging",
        "Same spam filtering as COMMS",
        "AWS cloud integration",
        "Email alert integration",
        "Secure message delivery",
        "No spam messaging system",
        "Real-time technician alerts",
        "EndPoint device monitoring",
        "Email-enabled system alerts",
        "160 character message limit"
      ],
      technologies: [".NET", "AWS", "SMS", "Email Integration", "Real-time Messaging"],
      status: "Available Now"
    }
  ];

  return (
    <div className="bg-transparent p-6 text-gray-200 shadow-inner">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-200 drop-shadow-lg">
          Project8X Products
        </h2>
        <p className="text-lg drop-shadow-md max-w-3xl mx-auto">
          Innovative technology solutions designed to enhance communication, security, 
          and operational efficiency for your business needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((product, index) => (
          <div 
            key={index}
            className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8 hover:bg-gray-800/60 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <div className="flex items-start mb-6">
              <div className="mr-6 flex-shrink-0">
                {product.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-blue-400 font-semibold drop-shadow-md mb-3">
                  {product.tagline}
                </p>
                <span className="inline-block bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                  {product.status}
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 drop-shadow-md mb-6 text-sm leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-200 drop-shadow-lg mb-3">
                Key Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-gray-300 drop-shadow-md text-sm">
                    <FaShieldAlt className="text-green-400 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-200 drop-shadow-lg mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-200 drop-shadow-lg mb-3">
                Legal & Compliance
              </h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/Privacy Policy SMS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-sm"
                >
                  <FaShieldAlt className="mr-2" />
                  Privacy Policy (PDF)
                </a>
                <a
                  href="/Terms and Conditions SMS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-sm"
                >
                  <FaShieldAlt className="mr-2" />
                  Terms & Conditions (PDF)
                </a>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Both products use SMS for messaging and registration. Please review our Privacy Policy and Terms & Conditions before using the applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/ContactUs"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <FaEnvelope className="mr-2" />
                Request Demo
              </Link>
              <Link
                to="/CompanyServices"
                className="inline-flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-200 drop-shadow-lg mb-4">
            Custom Product Development
          </h3>
          <p className="text-gray-300 drop-shadow-md mb-6">
            Need a custom solution for your specific business requirements? Our development team 
            can create tailored products that integrate seamlessly with your existing systems and workflows.
          </p>
          <Link
            to="/ContactUs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Discuss Your Project
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Products;
