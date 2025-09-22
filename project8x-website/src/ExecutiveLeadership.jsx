// src/ExecutiveLeadership.js
import React from "react";
import { FaCrown, FaRocket } from "react-icons/fa";

const ceoImage = "/ceo.png";
const ctoImage = "/road to the stars.png";

function ExecutiveLeadership() {
  const executives = [
    {
      icon: <FaCrown className="text-2xl text-yellow-400" />,
      name: "Othell Hamilton",
      title: "CEO and Founder",
      image: ceoImage,
      description: "Over 35 years of hands-on expertise in communication technologies, software engineering, and contact center innovations.",
      details: "As the CEO and Founder of Project8X, I have over 35 years of hands-on expertise in communication technologies, software engineering, and contact center innovations, all to help businesses thrive in a connected world. I define my career by delivering high-impact solutions that enhance efficiency, security, and customer satisfaction for Fortune 500 clients and major organizations.",
      additionalInfo: "Designing transformative solutions for industry leaders such as Expedia, EDS, Lockheed Martin, ABB, Best Buy, Coca-Cola, Disney, Hertz, Bank of America, Exxon, Aetna, Allstate, CSAA, and IKEA, among others. My specialization lies in business process re-engineering with global implementations. I founded Project8X to unite top-tier talent in delivering innovative, AI-driven solutions."
    },
    {
      icon: <FaRocket className="text-2xl text-blue-400" />,
      name: "TBD",
      title: "CTO and Founder",
      image: ctoImage,
      description: "Leading technology innovation and strategic development for Project8X's cutting-edge solutions.",
      details: "The story will be revealed soon...",
      additionalInfo: "Stay tuned for more information about our Chief Technology Officer and their vision for Project8X's technological future."
    }
  ];

  return (
    <div className="bg-transparent p-6 text-gray-200 shadow-inner">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-200 drop-shadow-lg">
          Project8X Executive Leadership
        </h2>
        <p className="text-lg drop-shadow-md max-w-3xl mx-auto">
          Meet the visionary leaders driving Project8X's mission to deliver innovative technology solutions 
          and exceptional service to our clients worldwide.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {executives.map((executive, index) => (
          <div 
            key={index}
            className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8 hover:bg-gray-800/60 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <div className="flex items-start mb-6">
              <div className="mr-4 flex-shrink-0">
                {executive.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-200 drop-shadow-lg mb-1">
                  {executive.name}
                </h3>
                <p className="text-blue-400 font-semibold drop-shadow-md mb-3">
                  {executive.title}
                </p>
                <p className="text-gray-300 drop-shadow-md text-sm">
                  {executive.description}
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="relative max-w-32 flex-shrink-0">
                <img
                  src={executive.image}
                  className="w-full h-auto object-contain rounded-lg"
                  alt={`${executive.name} - ${executive.title}`}
                />
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-gray-300 drop-shadow-md text-sm">
                  {executive.details}
                </p>
                <p className="text-gray-300 drop-shadow-md text-sm">
                  {executive.additionalInfo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-200 drop-shadow-lg mb-4">
            Leadership Excellence
          </h3>
          <p className="text-gray-300 drop-shadow-md mb-6">
            Our executive team brings decades of combined experience in technology, business strategy, 
            and client success. Together, we're committed to delivering exceptional results and 
            driving innovation in the contact center technology space.
          </p>
          <a 
            href="/ContactUs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Connect with Our Leadership
          </a>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveLeadership;
