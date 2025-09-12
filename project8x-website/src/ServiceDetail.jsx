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
      overview: "Our System Integration and Deployment services deliver seamless, scalable, and secure contact center solutions tailored to enterprise needs. We specialize in integrating advanced contact center platforms with existing infrastructure, ensuring robust performance across voice, email, chat, and omnichannel interactions. Our expertise spans full-stack deployments, custom API development, and complex migrations, enabling businesses to optimize workflows and enhance customer experiences.",
      
      coreServices: [
        {
          title: "Platform Integration",
          description: "We integrate leading contact center platforms with enterprise systems, ensuring compatibility and streamlined operations. Supported platforms include industry-standard solutions for telephony, CRM, and workforce management, enabling unified communication across channels like voice, email, chat, SMS, and social media."
        },
        {
          title: "Custom API Development",
          description: "Our team builds tailored APIs using modern frameworks and languages, including REST APIs for flexible, scalable integrations with web-based systems, JavaScript for dynamic, client-side functionality in contact center applications, and Python for automation, data processing, and backend integrations. These APIs enable seamless data flow between contact center platforms, CRMs, and other enterprise tools, enhancing operational efficiency."
        },
        {
          title: "System Deployments",
          description: "We manage end-to-end deployments, from planning and configuration to testing and go-live. Our services include Full-Stack Deployments for comprehensive setup of contact center infrastructure, Cloud and On-Premises Solutions for flexible deployment options, and Predictive Dialing Integration for optimizing outbound campaigns with higher productivity."
        },
        {
          title: "System Migrations",
          description: "We execute complex migrations to modernize legacy systems, ensuring minimal downtime and data integrity. Examples include Operating System Migrations from Unix-based to Windows-based environments, Database Migrations from Oracle to MS SQL or other modern database platforms, and Legacy System Upgrades to support new features and compliance requirements."
        },
        {
          title: "Omnichannel Support",
          description: "Our integrations enable consistent customer experiences across multiple channels, including voice, email, chat, SMS, and social media, with real-time data synchronization."
        }
      ],
      
      bestPractices: [
        {
          title: "Security and Compliance",
          description: "We implement robust security protocols, including encryption and access controls, to protect sensitive customer data and ensure compliance with regulations like GDPR, HIPAA, and PCI-DSS."
        },
        {
          title: "Scalability",
          description: "Our solutions are designed to handle high call volumes and support business growth, with load-balanced architectures and cloud-ready deployments."
        },
        {
          title: "Testing and Validation",
          description: "Rigorous testing, including stress testing and user acceptance testing (UAT), ensures reliability and performance under real-world conditions."
        },
        {
          title: "Documentation and Training",
          description: "We provide comprehensive documentation and training for IT teams and end-users to ensure smooth adoption and ongoing maintenance."
        }
      ],
      
      technologies: [
        {
          title: "Platforms",
          description: "Expertise in integrating industry-leading contact center platforms, ensuring compatibility with existing systems."
        },
        {
          title: "Cloud Solutions",
          description: "Leveraging cloud-based infrastructure for flexibility, cost-efficiency, and remote accessibility."
        },
        {
          title: "WebRTC",
          description: "Enabling browser-based voice and video communication for enhanced accessibility."
        },
        {
          title: "AI and Automation",
          description: "Incorporating AI-driven tools, such as agent assist and predictive analytics, to optimize performance."
        },
        {
          title: "Monitoring and Analytics",
          description: "Real-time monitoring and advanced analytics to track system performance and customer interactions."
        }
      ],
      
      conclusion: "With decades of experience in multi-site, enterprise-grade deployments, we deliver reliable, secure, and high-performance contact center integrations. Our proven methodologies and tailored solutions ensure seamless transitions, enhanced operational efficiency, and superior customer experiences across data centers and communication channels."
    }
  },
  "real-time-analytics-dashboard": {
    icon: <FaChartLine className="text-4xl text-yellow-400" />,
    title: "Real-Time Analytics and Dashboard Development",
    image: "/rta.png",
    content: {
      overview: "Our Real-Time Analytics and Dashboard Development services empower contact centers with actionable insights through custom-built, intuitive, and scalable analytics solutions. By leveraging advanced tools and technologies, we provide real-time visibility into operational performance, customer interactions, and agent efficiency, enabling data-driven decision-making and enhanced customer experiences.",
      
      coreServices: [
        {
          title: "Custom Analytics Dashboards",
          description: "We design and develop tailored dashboards using industry-leading tools to visualize key performance indicators (KPIs) and operational metrics in real time. Supported technologies include Power BI for interactive, cloud-based dashboards, Python for advanced data processing and visualization using libraries like Pandas, Matplotlib, and Plotly, JavaScript for interactive, web-based visualizations with frameworks like D3.js and Chart.js, and T-SQL for robust reporting and querying for SQL Server-based data environments."
        },
        {
          title: "Real-Time Data Integration",
          description: "We integrate dashboards with contact center systems, CRMs, and other data sources to provide real-time insights. Supported integrations include Content Management Systems (CMS) for streamlined data access, Reporting tools for comprehensive analytics and historical data analysis, and Real-time data feeds from voice, chat, email, and social media channels."
        },
        {
          title: "Operational Visibility",
          description: "Our solutions deliver clear, actionable insights into Agent Performance with metrics like average handle time (AHT), first-call resolution (FCR), and agent utilization, Customer Experience through sentiment analysis, customer satisfaction (CSAT) scores, and interaction trends, and Operational Efficiency including queue times, call volumes, and service-level agreement (SLA) compliance."
        },
        {
          title: "Custom Reporting",
          description: "We create tailored reports to meet specific business needs, including ad-hoc, scheduled, and automated reporting. Our solutions support both real-time and historical data analysis for strategic planning."
        },
        {
          title: "Scalable Architecture",
          description: "Dashboards are built to handle high data volumes and scale with business growth, leveraging cloud-based platforms for flexibility and performance."
        }
      ],
      
      bestPractices: [
        {
          title: "User-Centric Design",
          description: "We prioritize intuitive, user-friendly interfaces to ensure accessibility for both technical and non-technical users."
        },
        {
          title: "Data Accuracy and Integrity",
          description: "Rigorous data validation and quality checks ensure reliable insights for decision-making."
        },
        {
          title: "Security and Compliance",
          description: "We implement encryption, role-based access controls, and compliance with regulations like GDPR and PCI-DSS to protect sensitive data."
        },
        {
          title: "Performance Optimization",
          description: "Optimized queries and caching mechanisms ensure fast load times and real-time updates, even with large datasets."
        },
        {
          title: "Continuous Improvement",
          description: "Feedback loops and iterative updates keep dashboards aligned with evolving business needs."
        }
      ],
      
      technologies: [
        {
          title: "Visualization Tools",
          description: "Power BI, Tableau, and JavaScript-based frameworks (D3.js, Chart.js)."
        },
        {
          title: "Data Processing",
          description: "Python (Pandas, Plotly, Matplotlib) for advanced analytics and automation."
        },
        {
          title: "Database Querying",
          description: "T-SQL for efficient SQL Server reporting and data extraction."
        },
        {
          title: "Cloud Platforms",
          description: "AWS, Azure, or Google Cloud for scalable, secure data storage and processing."
        },
        {
          title: "AI and Machine Learning",
          description: "Predictive analytics and anomaly detection to anticipate trends and issues."
        },
        {
          title: "WebRTC Integration",
          description: "Real-time communication data for enhanced monitoring of voice and video interactions."
        }
      ],
      
      conclusion: "With extensive experience in building analytics solutions for dynamic, multi-site contact centers, we deliver tools that drive operational excellence and improve decision-making. Our custom dashboards and real-time analytics empower businesses to monitor performance, optimize agent efficiency, and enhance customer satisfaction in fast-paced environments."
    }
  },
  "devops-automation-implementation": {
    icon: <FaRocket className="text-4xl text-purple-400" />,
    title: "DevOps and Automation Implementation",
    image: "/do.png",
    content: {
      overview: "Our DevOps and Automation Implementation services transform contact center operations by leveraging modern DevOps practices, advanced automation tools, and scalable infrastructure. We empower organizations to achieve faster deployments, enhanced system reliability, and improved scalability through streamlined processes and innovative technologies. Our expertise, honed through extensive experience with enterprise-grade environments, ensures seamless automation of workflows and infrastructure optimization.",
      
      coreServices: [
        {
          title: "CI/CD Pipelines",
          description: "We design and implement Continuous Integration and Continuous Deployment (CI/CD) pipelines to automate software delivery, enabling rapid and reliable updates. Supported tools include Jenkins, GitLab CI/CD, and GitHub Actions for automated build, test, and deployment workflows, along with automated testing including unit, integration, and end-to-end testing to ensure code quality."
        },
        {
          title: "Containerization and Orchestration",
          description: "We utilize containerization to enhance scalability and portability of contact center applications. Services include Docker for containerizing applications for consistent environments across development, testing, and production, and Kubernetes for orchestrating containerized workloads for high availability and auto-scaling."
        },
        {
          title: "AI-Driven Automation",
          description: "We integrate AI-powered tools to optimize contact center operations, including Intelligent Multichannel Routing for automating the distribution of voice, email, chat, and social media interactions to the right agents, Predictive Maintenance using AI to anticipate system issues and reduce downtime, and Chatbots and Virtual Agents for automating routine customer inquiries to improve efficiency."
        },
        {
          title: "Infrastructure as Code (IaC)",
          description: "We implement IaC to automate infrastructure provisioning and management, ensuring consistency and repeatability. Supported tools include Terraform and Ansible for provisioning and configuring cloud and on-premises infrastructure, and Cloud Platforms including AWS, Azure, and Google Cloud for scalable, secure deployments."
        },
        {
          title: "Monitoring and Observability",
          description: "We deploy real-time monitoring and logging solutions to ensure system reliability and performance. Tools include Prometheus and Grafana for real-time metrics and dashboards, ELK Stack for centralized logging and analysis, and Alerting Systems with automated alerts for proactive issue resolution."
        },
        {
          title: "Team Enablement and Mentoring",
          description: "We provide hands-on mentoring to empower your teams with DevOps best practices, fostering a culture of collaboration, automation, and continuous improvement."
        }
      ],
      
      bestPractices: [
        {
          title: "Automation-First Approach",
          description: "Automate repetitive tasks like deployments, testing, and monitoring to reduce errors and accelerate delivery."
        },
        {
          title: "Scalability and Resilience",
          description: "Design systems to handle peak loads and recover quickly from failures using auto-scaling and failover mechanisms."
        },
        {
          title: "Security by Design",
          description: "Integrate security practices like secrets management, vulnerability scanning, and compliance checks into CI/CD pipelines."
        },
        {
          title: "Collaboration and Culture",
          description: "Promote DevOps principles like shared responsibility and cross-functional collaboration to enhance team productivity."
        },
        {
          title: "Continuous Feedback",
          description: "Implement feedback loops through monitoring and analytics to drive iterative improvements."
        }
      ],
      
      technologies: [
        {
          title: "CI/CD Tools",
          description: "Jenkins, GitLab CI/CD, GitHub Actions, CircleCI."
        },
        {
          title: "Containerization",
          description: "Docker, Kubernetes, Helm."
        },
        {
          title: "AI and Automation",
          description: "AI-driven routing, predictive analytics, and chatbot frameworks."
        },
        {
          title: "Infrastructure Management",
          description: "Terraform, Ansible, CloudFormation."
        },
        {
          title: "Monitoring and Logging",
          description: "Prometheus, Grafana, ELK Stack, Splunk."
        },
        {
          title: "Cloud Platforms",
          description: "AWS, Azure, Google Cloud for scalable deployments."
        },
        {
          title: "WebRTC",
          description: "For real-time communication in contact center applications."
        }
      ],
      
      conclusion: "With deep expertise in enterprise-scale DevOps transformations, we deliver automation solutions that enhance deployment efficiency, system reliability, and scalability. Our tailored implementations and mentoring services enable contact centers to innovate faster, optimize multichannel operations, and achieve operational excellence in dynamic environments."
    }
  },
  "telephony-project-management": {
    icon: <FaPhone className="text-4xl text-red-400" />,
    title: "Telephony Project Management",
    image: "/tpm.png",
    content: {
      overview: "Our Telephony Project Management services deliver end-to-end management of complex telephony projects, ensuring seamless upgrades, installations, and multi-site rollouts for contact centers. Led by certified project managers, we provide expert coordination, meticulous planning, and execution to achieve on-time, budget-compliant deliveries with minimal disruptions. Our solutions optimize telephony infrastructure to support voice, omnichannel communications, and advanced contact center functionalities.",
      
      coreServices: [
        {
          title: "ACD Upgrades and Implementations",
          description: "We manage the upgrade and deployment of Automatic Call Distribution (ACD) systems, ensuring enhanced call routing, improved agent efficiency, and seamless integration with existing platforms. Services include system configuration and optimization for high call volumes, integration with CRM, IVR, and omnichannel platforms, and testing and validation to ensure reliability and performance."
        },
        {
          title: "Carrier Circuit Installations",
          description: "We oversee the installation and configuration of carrier circuits (e.g., SIP trunks, T1, PRI) to ensure robust, high-quality connectivity. Our services include coordination with telecom providers for circuit provisioning, testing for latency, jitter, and call quality, and compliance with industry standards and regulations."
        },
        {
          title: "Multi-Site Rollouts",
          description: "We manage large-scale telephony deployments across multiple locations, ensuring consistency and scalability. Key activities include standardized configurations for uniform performance across sites, centralized management for monitoring and maintenance, and phased rollouts to minimize operational disruptions."
        },
        {
          title: "Vendor Coordination",
          description: "We handle all aspects of vendor management, including selection and negotiation with telephony hardware and software vendors, coordination of installation schedules and deliverables, and ensuring vendor compliance with project requirements and SLAs."
        },
        {
          title: "Component Procurement",
          description: "We manage the procurement of telephony hardware, software, and infrastructure components, ensuring compatibility and cost-efficiency. This includes sourcing servers, headsets, gateways, and other equipment, evaluating cloud-based vs. on-premises solutions for optimal deployment, and budget tracking to align with financial goals."
        },
        {
          title: "Customer Programming Requirements",
          description: "We customize telephony systems to meet specific business needs, including tailored IVR scripts and call flows, integration with AI agents, chatbots, and WebRTC for enhanced functionality, and configuration of predictive dialing and omnichannel routing."
        }
      ],
      
      bestPractices: [
        {
          title: "Project Planning and Risk Management",
          description: "Detailed project plans, risk assessments, and contingency strategies ensure smooth execution and timely delivery."
        },
        {
          title: "Stakeholder Collaboration",
          description: "Regular communication with stakeholders, including IT teams, vendors, and business units, ensures alignment and transparency."
        },
        {
          title: "Change Management",
          description: "Structured processes to manage system changes, minimizing disruptions to ongoing operations."
        },
        {
          title: "Quality Assurance",
          description: "Comprehensive testing, including load testing and failover scenarios, ensures system reliability and performance."
        },
        {
          title: "Compliance and Security",
          description: "Adherence to industry standards (e.g., PCI-DSS, GDPR) and implementation of secure configurations to protect sensitive data."
        },
        {
          title: "Post-Deployment Support",
          description: "Ongoing support, training, and documentation to ensure long-term success and adoption."
        }
      ],
      
      technologies: [
        {
          title: "Telephony Platforms",
          description: "Expertise in leading ACD and PBX systems, ensuring seamless integration and performance."
        },
        {
          title: "Cloud-Based Solutions",
          description: "Leveraging cloud telephony (e.g., SIP, VoIP) for scalability and flexibility."
        },
        {
          title: "WebRTC",
          description: "Enabling browser-based voice and video for modern contact centers."
        },
        {
          title: "AI and Automation",
          description: "Integrating AI-driven tools like chatbots and agent assist for enhanced efficiency."
        },
        {
          title: "Monitoring Tools",
          description: "Real-time monitoring of call quality, system performance, and uptime."
        },
        {
          title: "Project Management Tools",
          description: "Tools like Jira, MS Project, and Trello for planning, tracking, and reporting."
        }
      ],
      
      conclusion: "With a proven track record in managing complex telephony projects, our certified project managers deliver reliable, scalable, and efficient solutions tailored to enterprise needs. By combining technical expertise, meticulous planning, and robust vendor coordination, we ensure telephony implementations that enhance contact center performance, support omnichannel communications, and drive business success with minimal disruptions."
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

      {/* Additional Images for System Integration and Deployment */}
      {serviceId === "system-integration-deployment" && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">API Development</div>
                <div className="text-green-200 text-sm mt-2">REST, JavaScript, Python</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Platform Integration</div>
                <div className="text-blue-200 text-sm mt-2">Enterprise Systems</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">System Migration</div>
                <div className="text-purple-200 text-sm mt-2">Legacy to Modern</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Images for Real-Time Analytics and Dashboard Development */}
      {serviceId === "real-time-analytics-dashboard" && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Power BI</div>
                <div className="text-yellow-200 text-sm mt-2">Interactive Dashboards</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Python Analytics</div>
                <div className="text-blue-200 text-sm mt-2">Data Processing</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Real-Time Data</div>
                <div className="text-green-200 text-sm mt-2">Live Insights</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Images for DevOps and Automation Implementation */}
      {serviceId === "devops-automation-implementation" && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">CI/CD</div>
                <div className="text-purple-200 text-sm mt-2">Automated Pipelines</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Docker & K8s</div>
                <div className="text-blue-200 text-sm mt-2">Containerization</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">AI Automation</div>
                <div className="text-green-200 text-sm mt-2">Smart Operations</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Images for Telephony Project Management */}
      {serviceId === "telephony-project-management" && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">ACD Systems</div>
                <div className="text-red-200 text-sm mt-2">Call Distribution</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Multi-Site</div>
                <div className="text-blue-200 text-sm mt-2">Enterprise Rollouts</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Vendor Mgmt</div>
                <div className="text-green-200 text-sm mt-2">Coordination</div>
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
      {service.content.keySolutions && service.content.keySolutions.length > 0 && (
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

      {/* Core Services Section for System Integration and Deployment */}
      {service.content.coreServices && service.content.coreServices.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.content.coreServices.map((serviceItem, index) => (
              <div
                key={index}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-green-400 drop-shadow-lg mb-3">
                  {serviceItem.title}
                </h3>
                <p className="text-gray-300 drop-shadow-md text-sm">
                  {serviceItem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices Section */}
      {service.content.bestPractices && service.content.bestPractices.length > 0 && (
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

      {/* Technologies Section for System Integration and Deployment */}
      {service.content.technologies && service.content.technologies.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Technologies and Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.content.technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-purple-400 drop-shadow-lg mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-300 drop-shadow-md text-sm">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technology Stack Visualization for Real-Time Analytics */}
      {serviceId === "real-time-analytics-dashboard" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Analytics Technology Stack
          </h2>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="bg-yellow-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Power BI</span>
                </div>
                <div className="text-gray-300 text-sm">Dashboards</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Python</span>
                </div>
                <div className="text-gray-300 text-sm">Analytics</div>
              </div>
              <div className="text-center">
                <div className="bg-green-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">T-SQL</span>
                </div>
                <div className="text-gray-300 text-sm">Database</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">D3.js</span>
                </div>
                <div className="text-gray-300 text-sm">Visualization</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AWS</span>
                </div>
                <div className="text-gray-300 text-sm">Cloud</div>
              </div>
              <div className="text-center">
                <div className="bg-red-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI/ML</span>
                </div>
                <div className="text-gray-300 text-sm">Intelligence</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technology Stack Visualization for DevOps and Automation */}
      {serviceId === "devops-automation-implementation" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            DevOps Technology Stack
          </h2>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Jenkins</span>
                </div>
                <div className="text-gray-300 text-sm">CI/CD</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Docker</span>
                </div>
                <div className="text-gray-300 text-sm">Containers</div>
              </div>
              <div className="text-center">
                <div className="bg-green-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">K8s</span>
                </div>
                <div className="text-gray-300 text-sm">Orchestration</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Terraform</span>
                </div>
                <div className="text-gray-300 text-sm">IaC</div>
              </div>
              <div className="text-center">
                <div className="bg-red-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Prometheus</span>
                </div>
                <div className="text-gray-300 text-sm">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AWS</span>
                </div>
                <div className="text-gray-300 text-sm">Cloud</div>
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
