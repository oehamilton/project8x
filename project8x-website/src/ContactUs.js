import React from "react";
import { 
  FaHeadset, 
  FaShoppingCart, 
  FaQuestionCircle, 
  FaLifeRing, 
  FaCreditCard, 
  FaUsers, 
  FaBriefcase, 
  FaComments, 
  FaNewspaper, 
  FaCogs, 
  FaUserCog,
  FaRocket
} from "react-icons/fa";

function ContactUs() {
  const contactInfo = [
    {
      icon: <FaRocket className="text-2xl text-cyan-400" />,
      title: "Product Demos",
      description: "Request a demo of our products and services",
      email: "demo@project8x.com"
    },
    {
      icon: <FaHeadset className="text-2xl text-blue-400" />,
      title: "Technical Support",
      description: "For support of existing products or services",
      email: "support@project8x.com"
    },
    {
      icon: <FaShoppingCart className="text-2xl text-green-400" />,
      title: "Sales Inquiries",
      description: "For sales inquiries and new business opportunities",
      email: "sales@project8x.com"
    },
    {
      icon: <FaQuestionCircle className="text-2xl text-yellow-400" />,
      title: "General Information",
      description: "For general information about Project8X",
      email: "info@project8x.com"
    },
    {
      icon: <FaLifeRing className="text-2xl text-purple-400" />,
      title: "Help Desk",
      description: "For help with any issues or questions",
      email: "help@project8x.com"
    },
    {
      icon: <FaCreditCard className="text-2xl text-red-400" />,
      title: "Billing",
      description: "For billing inquiries or payment-related questions",
      email: "billing@project8x.com"
    },
    {
      icon: <FaUsers className="text-2xl text-indigo-400" />,
      title: "Human Resources",
      description: "For human resources matters and employee inquiries",
      email: "hr@project8x.com"
    },
    {
      icon: <FaBriefcase className="text-2xl text-orange-400" />,
      title: "Careers",
      description: "For career opportunities and job applications",
      email: "careers@project8x.com"
    },
    {
      icon: <FaComments className="text-2xl text-pink-400" />,
      title: "Feedback",
      description: "For feedback on our products or services",
      email: "feedback@project8x.com"
    },
    {
      icon: <FaNewspaper className="text-2xl text-cyan-400" />,
      title: "Press & Media",
      description: "For press inquiries and media relations",
      email: "press@project8x.com"
    },
    {
      icon: <FaCogs className="text-2xl text-teal-400" />,
      title: "Services",
      description: "For information about our services",
      email: "services@project8x.com"
    },
    {
      icon: <FaUserCog className="text-2xl text-gray-400" />,
      title: "Account Management",
      description: "For account-related questions or management",
      email: "accounts@project8x.com"
    }
  ];

  return (
    <div className="bg-transparent p-6 text-gray-200 shadow-inner">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-200 drop-shadow-lg">
          Contact Project8X
        </h2>
        <p className="text-lg drop-shadow-md max-w-2xl mx-auto">
          We're here to help! Reach out to our specialized teams for any inquiries, 
          support, or feedback. Our experts are ready to assist you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactInfo.map((contact, index) => (
          <div 
            key={index}
            className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">
                {contact.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-200 drop-shadow-lg">
                {contact.title}
              </h3>
            </div>
            <p className="text-gray-300 drop-shadow-md mb-4 text-sm">
              {contact.description}
            </p>
            <a 
              href={`mailto:${contact.email}`}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-sm"
            >
              {contact.email}
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-200 drop-shadow-lg mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-300 drop-shadow-md mb-6">
            Can't find what you're looking for? Our main contact line is always available 
            for urgent matters and general inquiries.
          </p>
          <a 
            href="mailto:contact@project8x.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Contact Us Directly
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
