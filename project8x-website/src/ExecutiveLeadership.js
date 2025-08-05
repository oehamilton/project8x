// src/DefaultPage.js
import React from "react";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon
const ceoImage = "/ceo.png";
const ctoImage = "/cto.png";

function ExecutiveLeadership() {
  return (
    <div className="bg-gray-900 p-6 text-gray-200 shadow-inner">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">
        Welcome to Project8X Executive Leadership
      </h2>
      <div className="mt-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-200">
          Othell Hamilton, CEO and Founder
        </h3>
        <div className="flex flex-row gap-4">
          <div className="relative max-w-xs">
            {" "}
            {/* Constrain image container width */}
            <img
              src={ceoImage}
              className="w-full h-auto object-contain"
              alt="slide image"
            />
          </div>
          <p className="flex-1">
            As the CEO and Founder of Project8X, I bring over 35 years of
            hands-on expertise in communication technologies, software
            engineering, and contact center innovations to help businesses
            thrive in a connected world. My career began in the late 1980s as a
            programmer and office manager at Mrs. Baird's Bakeries, where I
            designed and managed IVR systems and developed Sybase SQL reports
            for regional call centers covering Texas, Oklahoma, Louisiana, and
            New Mexico. From there, I advanced to senior roles at Protection
            One, where I managed CTI infrastructure across five contact centers,
            integrating Cisco ICM, Periphonic IVR, and Avaya Passageway using C#
            and Java, while optimizing MS SQL databases for predictive dialing.
            At IBM, as a Contact Center Technology Consultant, I led
            transformative projects for Fortune 500 clients including Aetna
            (Cisco ICM integration with Pegasystems), Allstate (Siebel-Avaya
            expansions), CSAA (Aspect-Epiphany-Genesys POC), and IKEA (contact
            center assessments and RFP development). My work focused on business
            process re-engineering, multi-site implementations of IVRs, ACDs,
            CTI, email/fax servers, web chat, and advanced reporting tools like
            Cognos and CMS. I continued building my expertise at Expedia as a
            Senior Network Engineer, architecting multi-channel CTI/IVR systems
            with custom T-SQL reports and REST APIs. At EDS, I deployed Avaya IC
            for multichannel services (voice, email, chat, Siebel 8.0) and
            supported migrations from Unix to Windows platforms. My tenure at
            Lockheed Martin involved overseeing secure installations for
            Homeland Security (TSA) and HUD/HFA, including Oracle Databases,
            Genesys, Avaya VOP, NICE, and VMware lab environments. Later, as
            Technical Telephony Project Manager at Bank of America, I
            coordinated Aspect ACD, NICE integrations, and infrastructure
            upgrades across sites. Most recently, I've integrated Verint with
            Genesys, developed real-time analytics dashboards using Power BI,
            Python, and JavaScript, and mentored teams on DevOps practices like
            CI/CD and Docker. With certifications in Machine Learning with
            Python, Genesys Administration, Avaya IC, Cisco IPCC, and Project
            Management from IBM, I've consistently delivered solutions that
            enhance efficiency, security, and customer satisfaction. Today, as
            CEO of Project8X, I'm passionate about leveraging this deep industry
            knowledge to offer cutting-edge services as an independent
            contractor. Having collaborated with giants like Bank of America,
            IBM, and Lockheed Martin, I founded Project8X to provide
            personalized, high-impact technology solutions that drive real
            business results. Let's connect and explore how we can elevate your
            operations.
          </p>
        </div>
        <h3 className="text-lg font-bold text-gray-200">
          Kevin Buckley, CTO and Founder
        </h3>
        <div className="flex flex-row gap-4">
          <div className="relative max-w-xs">
            {" "}
            {/* Constrain image container width */}
            <img
              src={ctoImage}
              className="w-full h-auto object-contain"
              alt="slide image"
            />
          </div>
          <p className="flex-1">Lucky Charms</p>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveLeadership;
