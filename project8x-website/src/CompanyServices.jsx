// src/CompanyServices.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaHeadset, 
  FaCogs, 
  FaChartLine, 
  FaRocket, 
  FaPhone, 
  FaFileAlt, 
  FaComments, 
  FaDatabase,
  FaCode
} from "react-icons/fa";

//Images related to each service
const cctImage = "/cct.png";
const sidImage = "/sid.png";
const rtaImage = "/rta.png";
const doImage = "/do.png";
const tpmImage = "/tpms.png";
const rfpImage = "/rfps.png";
const mccsImage = "/mccs.png";
const ddoImage = "/ddo.png";
const wdImage = "/do.png";


function CompanyServices() {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: <FaHeadset className="text-2xl text-blue-400" />,
      title: "Contact Center Technology Consulting",
      description: "Expert consulting to optimize contact center operations, from business process analysis and redesign to technology assessments and implementation strategies.",
      details: "Drawing on decades of experience with multi-site environments for large-scale enterprises, we help streamline workflows, enhance customer satisfaction, and reduce costs through tailored contact center solutions. Our expertise includes advanced technologies and best practices to optimize operations and deliver exceptional customer experiences. Select for more information.",
      image: cctImage,
      route: "/service/contact-center-technology-consulting"
    },
    {
      icon: <FaCogs className="text-2xl text-green-400" />,
      title: "System Integration and Deployment",
      description: "Seamless integration of contact center platforms including Genesys, Avaya, Cisco ICM, AWS Connect, Google Dialogflow, and Verint systems.",
      details: "Our System Integration and Deployment services deliver seamless, scalable, and secure contact center solutions tailored to enterprise needs. We specialize in integrating advanced contact center platforms with existing infrastructure, ensuring robust performance across voice, email, chat, and omnichannel interactions. Our expertise spans full-stack deployments, custom API development, and complex migrations, enabling businesses to optimize workflows and enhance customer experiences.",
      image: sidImage,
      route: "/service/system-integration-deployment"
    },
    {
      icon: <FaChartLine className="text-2xl text-yellow-400" />,
      title: "Real-Time Analytics and Dashboard Development",
      description: "Custom analytics dashboards built using Power BI, Python, JavaScript, and T-SQL reporting.",
      details: "Our Real-Time Analytics and Dashboard Development services empower contact centers with actionable insights through custom-built, intuitive, and scalable analytics solutions. By leveraging advanced tools and technologies, we provide real-time visibility into operational performance, customer interactions, and agent efficiency, enabling data-driven decision-making and enhanced customer experiences.",
      image: rtaImage,
      route: "/service/real-time-analytics-dashboard"
    },
    {
      icon: <FaRocket className="text-2xl text-purple-400" />,
      title: "DevOps and Automation Implementation",
      description: "Modern DevOps practices including CI/CD pipelines, Docker containerization, and AI-driven automation tools.",
      details: "Our DevOps and Automation Implementation services transform contact center operations by leveraging modern DevOps practices, advanced automation tools, and scalable infrastructure. We empower organizations to achieve faster deployments, enhanced system reliability, and improved scalability through streamlined processes and innovative technologies. Our expertise, honed through extensive experience with enterprise-grade environments, ensures seamless automation of workflows and infrastructure optimization.",
      image: doImage,
      route: "/service/devops-automation-implementation"
    },
    {
      icon: <FaPhone className="text-2xl text-red-400" />,
      title: "Telephony Project Management",
      description: "Complex telephony projects including ACD upgrades, carrier circuit installations, and multi-site rollouts.",
      details: "Our Telephony Project Management services deliver end-to-end management of complex telephony projects, ensuring seamless upgrades, installations, and multi-site rollouts for contact centers. Led by certified project managers, we provide expert coordination, meticulous planning, and execution to achieve on-time, budget-compliant deliveries with minimal disruptions. Our solutions optimize telephony infrastructure to support voice, omnichannel communications, and advanced contact center functionalities.",
      image: tpmImage,
      route: "/service/telephony-project-management"
    },
    {
      icon: <FaFileAlt className="text-2xl text-indigo-400" />,
      title: "RFP Development and Vendor Selection",
      description: "Comprehensive RFP creation, proof-of-concept coding, and vendor evaluation services.",
      details: "Our RFP Development and Vendor Selection services provide comprehensive support to architect and implement contact center solutions that align with your business objectives. Leveraging extensive experience in enterprise environments, we create detailed Request for Proposals (RFPs), conduct proof-of-concept (PoC) development, and guide vendor evaluations to ensure cost-effective, high-impact investments. Our process ensures seamless consolidation and enhancement of contact center operations, delivering scalable and innovative solutions.",
      image: rfpImage,
      route: "/service/rfp-development-vendor-selection"
    },
    {
      icon: <FaComments className="text-2xl text-orange-400" />,
      title: "Multi-Channel Communication Solutions",
      description: "Unified customer experiences with multichannel services encompassing voice, email, web chat, fax, and collaboration tools.",
      details: "Our Multi-Channel Communication Solutions deliver unified, seamless customer experiences across diverse communication channels, including voice, email, web chat, SMS, social media, and collaboration tools. By integrating advanced platforms and leveraging intelligent routing, we enhance agent productivity, improve customer engagement, and ensure scalability across multi-site contact centers. Our expertise ensures cohesive, omnichannel interactions that drive operational efficiency and customer satisfaction.",
      image: mccsImage,
      route: "/service/multi-channel-communication-solutions"
    },
    {
      icon: <FaDatabase className="text-2xl text-teal-400" />,
      title: "Database Optimization and Custom Development",
      description: "Database optimizations, custom scripting in C#, Java, and SQL, and secure environments using VMware and Oracle.",
      details: "Our Database Optimization and Custom Development services deliver high-performance, secure, and scalable database solutions tailored to contact center needs. We specialize in optimizing database performance, developing custom scripts, and designing secure environments to support mission-critical operations. With expertise in predictive dialer tuning, advanced reporting, and development/test lab setups, we ensure low-latency, reliable systems that enhance operational efficiency and meet demanding business requirements.",
      image: ddoImage,
      route: "/service/database-optimization-custom-development"
    },
    {
      icon: <FaCode className="text-2xl text-cyan-400" />,
      title: "Website Development Services",
      description: "Modern, responsive, and user-centric websites tailored to enhance customer engagement and support contact center operations.",
      details: "Our Website Development Services deliver modern, responsive, and user-centric websites tailored to enhance customer engagement and support contact center operations. We specialize in creating scalable, secure, and high-performance web solutions that integrate seamlessly with contact center platforms, CRM systems, and omnichannel communication tools. Our expertise ensures visually appealing, functional websites that drive business success and elevate customer experiences.",
      image: wdImage,
      route: "/service/website-development-services"
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
            onClick={() => navigate(service.route)}
            className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
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
