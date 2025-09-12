import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeadset, FaCogs, FaChartLine, FaRocket, FaPhone, FaFileAlt, FaComments, FaDatabase } from "react-icons/fa";

// Service data with detailed content
const serviceDetails = {
  "contact-center-technology-consulting": {
    icon: <FaHeadset className="text-4xl text-blue-400" />,
    title: "Contact Center Technology Consulting",
    image: "/cct.png",
    content: {
      overview: "Drawing on decades of experience with multi-site environments for large-scale enterprises, we help streamline workflows, enhance customer satisfaction, and reduce costs through tailored contact center solutions. Our expertise includes advanced technologies and best practices to optimize operations and deliver exceptional customer experiences.",
      
      keySolutions: [
        {
          title: "Interactive Voice Response (IVR)",
          description: "Customizable IVR systems guide customers efficiently, reducing wait times and improving self-service options."
        },
        {
          title: "Automatic Call Distribution (ACD)",
          description: "Intelligent routing ensures calls reach the right agent, boosting first-call resolution rates."
        },
        {
          title: "Computer Telephony Integration (CTI)",
          description: "Seamlessly connects telephony with CRM systems for personalized, data-driven interactions."
        },
        {
          title: "AI Agents and Bots",
          description: "AI-powered chatbots and virtual agents handle routine inquiries, enabling 24/7 support and freeing human agents for complex issues."
        },
        {
          title: "Cloud-Based Solutions",
          description: "Scalable, secure cloud platforms provide flexibility, reduce infrastructure costs, and enable remote work for agents."
        },
        {
          title: "WebRTC",
          description: "Enables browser-based voice and video communication, enhancing accessibility and reducing dependency on traditional phone systems."
        },
        {
          title: "Agent Assist Tools",
          description: "Real-time transcription, sentiment analysis, and knowledge base suggestions empower agents to resolve issues faster."
        },
        {
          title: "Omnichannel Integration",
          description: "Unifies voice, email, chat, SMS, and social media interactions for a consistent customer experience."
        },
        {
          title: "Analytics and Reporting",
          description: "Advanced analytics provide insights into customer behavior, agent performance, and operational efficiency."
        }
      ],
      
      bestPractices: [
        {
          title: "Personalization",
          description: "Leverage customer data to tailor interactions, improving satisfaction and loyalty."
        },
        {
          title: "Proactive Support",
          description: "Use predictive analytics to anticipate customer needs and address issues before they escalate."
        },
        {
          title: "Continuous Training",
          description: "Equip agents with ongoing training and AI-driven tools to handle diverse scenarios effectively."
        },
        {
          title: "Security and Compliance",
          description: "Implement robust security measures and ensure adherence to industry regulations (e.g., GDPR, HIPAA)."
        },
        {
          title: "Scalability",
          description: "Design systems to handle peak loads and support business growth without compromising performance."
        },
        {
          title: "Customer Feedback Loops",
          description: "Regularly collect and analyze feedback to refine processes and enhance service quality."
        }
      ],
      
      conclusion: "By combining these technologies and best practices, we create efficient, customer-centric contact centers that drive operational excellence and business success."
    }
  },
  "system-integration-deployment": {
    icon: <FaCogs className="text-4xl text-green-400" />,
    title: "System Integration and Deployment",
    image: "/sid.png",
    content: {
      overview: "Coming soon - detailed information about our System Integration and Deployment services will be available here.",
      keySolutions: [],
      bestPractices: [],
      conclusion: "Please check back soon for comprehensive details about our integration and deployment capabilities."
    }
  },
  "real-time-analytics-dashboard": {
    icon: <FaChartLine className="text-4xl text-yellow-400" />,
    title: "Real-Time Analytics and Dashboard Development",
    image: "/rta.png",
    content: {
      overview: "Coming soon - detailed information about our Real-Time Analytics and Dashboard Development services will be available here.",
      keySolutions: [],
      bestPractices: [],
      conclusion: "Please check back soon for comprehensive details about our analytics and dashboard capabilities."
    }
  },
  "devops-automation-implementation": {
    icon: <FaRocket className="text-4xl text-purple-400" />,
    title: "DevOps and Automation Implementation",
    image: "/do.png",
    content: {
      overview: "Coming soon - detailed information about our DevOps and Automation Implementation services will be available here.",
      keySolutions: [],
      bestPractices: [],
      conclusion: "Please check back soon for comprehensive details about our DevOps and automation capabilities."
    }
  },
  "telephony-project-management": {
    icon: <FaPhone className="text-4xl text-red-400" />,
    title: "Telephony Project Management",
    image: "/tpm.png",
    content: {
      overview: "Coming soon - detailed information about our Telephony Project Management services will be available here.",
      keySolutions: [],
      bestPractices: [],
      conclusion: "Please check back soon for comprehensive details about our telephony project management capabilities."
    }
  },
  "rfp-development-vendor-selection": {
    icon: <FaFileAlt className="text-4xl text-indigo-400" />,
    title: "RFP Development and Vendor Selection",
    image: "/rfp.png",
    content: {
      overview: "Coming soon - detailed information about our RFP Development and Vendor Selection services will be available here.",
      keySolutions: [],
      bestPractices: [],
      conclusion: "Please check back soon for comprehensive details about our RFP development and vendor selection capabilities."
    }
  },
  "multi-channel-communication-solutions": {
    icon: <FaComments className="text-4xl text-orange-400" />,
    title: "Multi-Channel Communication Solutions",
    image: "/mccs.png",
    content: {
      overview: "Coming soon - detailed information about our Multi-Channel Communication Solutions will be available here.",
      keySolutions: [],
      bestPractices: [],
      conclusion: "Please check back soon for comprehensive details about our multi-channel communication capabilities."
    }
  },
  "database-optimization-custom-development": {
    icon: <FaDatabase className="text-4xl text-teal-400" />,
    title: "Database Optimization and Custom Development",
    image: "/ddo.png",
    content: {
      overview: "Coming soon - detailed information about our Database Optimization and Custom Development services will be available here.",
      keySolutions: [],
      bestPractices: [],
      conclusion: "Please check back soon for comprehensive details about our database optimization and development capabilities."
    }
  }
};

function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <div className="bg-transparent p-6 text-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-200 drop-shadow-lg">Service Not Found</h2>
          <p className="text-gray-300 drop-shadow-md mb-6">The requested service could not be found.</p>
          <button
            onClick={() => navigate("/CompanyServices")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent p-6 text-gray-200 shadow-inner">
      {/* Header with Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/CompanyServices")}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 mb-4"
        >
          <FaArrowLeft className="text-lg" />
          <span>Back to Services</span>
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            {service.icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-200 drop-shadow-lg">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Service Image */}
      <div className="mb-8 text-center">
        <img
          src={service.image}
          alt={service.title}
          className="max-w-md mx-auto h-auto object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Additional Images for Contact Center Technology Consulting */}
      {serviceId === "contact-center-technology-consulting" && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">IVR & ACD</div>
                <div className="text-blue-200 text-sm mt-2">Smart Routing Solutions</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">AI & Bots</div>
                <div className="text-green-200 text-sm mt-2">Intelligent Automation</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Cloud Solutions</div>
                <div className="text-purple-200 text-sm mt-2">Scalable Infrastructure</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overview Section */}
      <div className="mb-12">
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-4">
            Overview
          </h2>
          <p className="text-gray-300 drop-shadow-md text-lg leading-relaxed">
            {service.content.overview}
          </p>
        </div>
      </div>

      {/* Key Solutions Section */}
      {service.content.keySolutions.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Key Solutions and Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.content.keySolutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-blue-400 drop-shadow-lg mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-300 drop-shadow-md text-sm">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices Section */}
      {service.content.bestPractices.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.content.bestPractices.map((practice, index) => (
              <div
                key={index}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-green-400 drop-shadow-lg mb-3">
                  {practice.title}
                </h3>
                <p className="text-gray-300 drop-shadow-md text-sm">
                  {practice.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technology Stack Visualization for Contact Center */}
      {serviceId === "contact-center-technology-consulting" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Technology Stack Overview
          </h2>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">IVR</span>
                </div>
                <div className="text-gray-300 text-sm">Voice Response</div>
              </div>
              <div className="text-center">
                <div className="bg-green-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">ACD</span>
                </div>
                <div className="text-gray-300 text-sm">Call Distribution</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">CTI</span>
                </div>
                <div className="text-gray-300 text-sm">Telephony Integration</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <div className="text-gray-300 text-sm">Intelligence</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conclusion Section */}
      {service.content.conclusion && (
        <div className="mb-12">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-4">
              Conclusion
            </h2>
            <p className="text-gray-300 drop-shadow-md text-lg leading-relaxed">
              {service.content.conclusion}
            </p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-200 drop-shadow-lg mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-300 drop-shadow-md mb-6">
            Contact us today to discuss your specific needs and discover how Project8X can help 
            transform your contact center operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/ContactUs")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("/CompanyServices")}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              View All Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
