// src/CompanyServices.js
import React from "react";
import { 
  FaHeadset, 
  FaCogs, 
  FaChartLine, 
  FaRocket, 
  FaPhone, 
  FaFileAlt, 
  FaComments, 
  FaDatabase 
} from "react-icons/fa";

//Images related to each service
const cctImage = "/cct.png";
const sidImage = "/sid.png";
const rtaImage = "/rta.png";
const doImage = "/do.png";
const tpmImage = "/tpm.png";
const rfpImage = "/rfp.png";
const mccsImage = "/mccs.png";
const ddoImage = "/ddo.png";


function CompanyServices() {
  const services = [
    {
      icon: <FaHeadset className="text-2xl text-blue-400" />,
      title: "Contact Center Technology Consulting",
      description: "Expert consulting to optimize contact center operations, from business process analysis and redesign to technology assessments and implementation strategies.",
      details: "Drawing on decades of experience with multi-site environments for large-scale enterprises, we help streamline workflows, enhance customer satisfaction, and reduce costs through tailored contact center solutions. Our expertise includes advanced technologies and best practices to optimize operations and deliver exceptional customer experiences. Select for more information.",
      image: cctImage
    },
    {
      icon: <FaCogs className="text-2xl text-green-400" />,
      title: "System Integration and Deployment",
      description: "Seamless integration of contact center platforms including Genesys, Avaya, Cisco ICM, NICE, and Verint systems.",
      details: "Our services cover full-stack deployments, custom API developments (REST, JavaScript, Python), and migrations from Unix to Windows or Oracle to MS SQL. With proven success at Bank of America and IBM, we ensure reliable, secure integrations that support voice, email, chat, and predictive dialing across data centers.",
      image: sidImage
    },
    {
      icon: <FaChartLine className="text-2xl text-yellow-400" />,
      title: "Real-Time Analytics and Dashboard Development",
      description: "Custom analytics dashboards built using Power BI, Python, JavaScript, and T-SQL reporting.",
      details: "Project8X integrates real-time data displays, CMS, Cognos, and Crystal Reports to deliver operational visibility. Based on our work at Expedia and EDS, we create intuitive tools that drive decision-making, monitor performance, and improve agent efficiency in dynamic contact centers.",
      image: rtaImage
    },
    {
      icon: <FaRocket className="text-2xl text-purple-400" />,
      title: "DevOps and Automation Implementation",
      description: "Modern DevOps practices including CI/CD pipelines, Docker containerization, and AI-driven automation tools.",
      details: "Our mentoring and implementation services, honed through team leadership at Fortune 500 firms, enhance deployment efficiency, system reliability, and scalability. Whether automating multichannel routing or optimizing infrastructure, Project8X empowers your teams to innovate faster.",
      image: doImage
    },
    {
      icon: <FaPhone className="text-2xl text-red-400" />,
      title: "Telephony Project Management",
      description: "Complex telephony projects including ACD upgrades, carrier circuit installations, and multi-site rollouts.",
      details: "As certified project managers, we handle vendor coordination, component procurement, and customer programming requirements. Our track record ensures on-time, budget-compliant deliveries that minimize disruptions.",
      image: tpmImage
    },
    {
      icon: <FaFileAlt className="text-2xl text-indigo-400" />,
      title: "RFP Development and Vendor Selection",
      description: "Comprehensive RFP creation, proof-of-concept coding, and vendor evaluation services.",
      details: "Leveraging experience from IBM alliances and engagements with Avaya, Cisco, and Genesys, we architect solutions for contact center consolidation and enhancements. Project8X guides you through selections that align with your business needs, ensuring cost-effective, high-impact investments.",
      image: rfpImage
    },
    {
      icon: <FaComments className="text-2xl text-orange-400" />,
      title: "Multi-Channel Communication Solutions",
      description: "Unified customer experiences with multichannel services encompassing voice, email, web chat, fax, and collaboration tools.",
      details: "We integrate platforms like Siebel CTI, Avaya IC, and Business Advocate for intelligent routing and support. With implementations across US and Canada sites at EDS and Expedia, Project8X delivers scalable solutions that boost agent productivity and customer engagement.",
      image: mccsImage
    },
    {
      icon: <FaDatabase className="text-2xl text-teal-400" />,
      title: "Database Optimization and Custom Development",
      description: "Database optimizations, custom scripting in C#, Java, and SQL, and secure environments using VMware and Oracle.",
      details: "Our services include predictive dialer tuning, reporting analysis, and lab design for dev/test setups. Proven at Lockheed Martin for Homeland Security projects and Protection One, Project8X ensures low-latency, reliable systems tailored to your operational demands.",
      image: ddoImage
    }
  ];

  return (
    <div className="bg-transparent p-6 text-gray-200 shadow-inner">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-200 drop-shadow-lg">
          Project8X Service Offerings
        </h2>
        <p className="text-lg drop-shadow-md max-w-3xl mx-auto">
          Comprehensive technology solutions designed to optimize your contact center operations, 
          enhance customer experiences, and drive business growth through innovative technology implementations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <div className="flex items-start mb-4">
              <div className="mr-4 flex-shrink-0">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-200 drop-shadow-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 drop-shadow-md text-sm mb-3">
                  {service.description}
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="relative max-w-24 flex-shrink-0">
                <img
                  src={service.image}
                  className="w-full h-auto object-contain"
                  alt={service.title}
                />
              </div>
              <p className="text-gray-300 drop-shadow-md text-sm flex-1">
                {service.details}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-200 drop-shadow-lg mb-4">
            Ready to Transform Your Contact Center?
          </h3>
          <p className="text-gray-300 drop-shadow-md mb-6">
            Let our experienced team help you implement the right solutions for your business. 
            Contact us today to discuss your specific needs and discover how Project8X can drive your success.
          </p>
          <a 
            href="/ContactUs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
}

export default CompanyServices;
