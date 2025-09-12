import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeadset, FaCogs, FaChartLine, FaRocket, FaPhone, FaFileAlt, FaComments, FaDatabase, FaCode } from "react-icons/fa";

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
      overview: "Our RFP Development and Vendor Selection services provide comprehensive support to architect and implement contact center solutions that align with your business objectives. Leveraging extensive experience in enterprise environments, we create detailed Request for Proposals (RFPs), conduct proof-of-concept (PoC) development, and guide vendor evaluations to ensure cost-effective, high-impact investments. Our process ensures seamless consolidation and enhancement of contact center operations, delivering scalable and innovative solutions.",
      
      coreServices: [
        {
          title: "RFP Creation",
          description: "We develop tailored, detailed RFPs that clearly outline your contact center requirements, including technical specifications, performance metrics, and compliance needs. Key components include functional requirements for telephony, IVR, ACD, and omnichannel platforms, technical specifications for integration with CRM, AI agents, and cloud-based systems, scalability, security, and compliance requirements (e.g., GDPR, PCI-DSS, HIPAA), and clear evaluation criteria and timelines to streamline vendor responses."
        },
        {
          title: "Proof-of-Concept (PoC) Development",
          description: "We design and implement PoCs to validate vendor solutions and ensure alignment with business needs. Services include prototyping integrations with existing systems using APIs (REST, JavaScript, Python), testing key functionalities like call routing, real-time analytics, and WebRTC-based communications, and performance benchmarking to assess scalability and reliability under real-world conditions."
        },
        {
          title: "Vendor Evaluation and Selection",
          description: "We guide you through a structured vendor selection process to identify the best-fit solutions. Our approach includes vendor shortlisting based on technical capabilities, cost, and alignment with business goals, evaluation of vendor proposals against RFP criteria, including demos and PoC results, negotiation support to secure favorable terms and pricing, and risk assessments to ensure vendor reliability and long-term support."
        },
        {
          title: "Solution Architecture for Contact Center Consolidation",
          description: "We design consolidated contact center solutions to optimize operations across multiple sites or channels. This includes integration of voice, email, chat, SMS, and social media for a unified customer experience, migration strategies for legacy systems to modern cloud-based or hybrid platforms, and incorporation of AI-driven tools like chatbots, agent assist, and predictive analytics."
        },
        {
          title: "Stakeholder Alignment",
          description: "We collaborate with stakeholders to ensure RFP and vendor selections align with strategic business objectives, IT requirements, and operational needs."
        }
      ],
      
      bestPractices: [
        {
          title: "Clarity and Specificity",
          description: "Craft RFPs with precise requirements to minimize ambiguity and attract high-quality vendor responses."
        },
        {
          title: "Objective Evaluation Criteria",
          description: "Use standardized scorecards and metrics to ensure fair and transparent vendor evaluations."
        },
        {
          title: "Future-Proofing",
          description: "Prioritize scalable, flexible solutions that support emerging technologies like AI, WebRTC, and cloud platforms."
        },
        {
          title: "Stakeholder Engagement",
          description: "Involve key stakeholders early to align on priorities and ensure buy-in throughout the process."
        },
        {
          title: "Compliance and Security",
          description: "Embed regulatory and security requirements (e.g., data encryption, access controls) into RFPs and vendor evaluations."
        },
        {
          title: "Cost-Benefit Analysis",
          description: "Balance cost with long-term value, ensuring investments deliver measurable ROI."
        }
      ],
      
      technologies: [
        {
          title: "Contact Center Platforms",
          description: "Expertise in evaluating leading platforms for ACD, IVR, and omnichannel capabilities."
        },
        {
          title: "Cloud Solutions",
          description: "Assessing cloud-based telephony and contact center platforms (e.g., SIP, VoIP) for scalability and flexibility."
        },
        {
          title: "WebRTC",
          description: "Evaluating browser-based communication solutions for modern contact centers."
        },
        {
          title: "AI and Automation",
          description: "Incorporating AI-driven tools like chatbots, predictive analytics, and agent assist in vendor evaluations."
        },
        {
          title: "API and Integration Tools",
          description: "Assessing REST, JavaScript, and Python-based integrations for seamless connectivity."
        },
        {
          title: "Analytics Platforms",
          description: "Evaluating tools for real-time reporting and performance monitoring."
        }
      ],
      
      conclusion: "With deep expertise in contact center solution design and vendor management, we deliver RFPs and vendor selection processes that ensure high-impact, cost-effective investments. Our structured approach, combined with PoC development and stakeholder alignment, empowers organizations to consolidate and enhance contact center operations, driving efficiency and exceptional customer experiences."
    }
  },
  "multi-channel-communication-solutions": {
    icon: <FaComments className="text-4xl text-orange-400" />,
    title: "Multi-Channel Communication Solutions",
    image: "/mccs.png",
    content: {
      overview: "Our Multi-Channel Communication Solutions deliver unified, seamless customer experiences across diverse communication channels, including voice, email, web chat, SMS, social media, and collaboration tools. By integrating advanced platforms and leveraging intelligent routing, we enhance agent productivity, improve customer engagement, and ensure scalability across multi-site contact centers. Our expertise ensures cohesive, omnichannel interactions that drive operational efficiency and customer satisfaction.",
      
      coreServices: [
        {
          title: "Omnichannel Integration",
          description: "We unify multiple communication channels into a single platform for a consistent customer experience. Supported channels include voice with seamless integration with telephony systems for high-quality voice interactions, email with automated handling and intelligent routing, web chat with real-time solutions and AI-driven chatbots, SMS for quick, convenient customer interactions, social media integration with platforms like Twitter, Facebook, and WhatsApp, and collaboration tools like Microsoft Teams or Slack for internal agent collaboration."
        },
        {
          title: "Intelligent Routing",
          description: "We implement advanced routing solutions to direct customer inquiries to the most suitable agents or automated systems, leveraging skills-based routing to match inquiries to agents based on expertise and availability, AI-driven routing using predictive analytics to prioritize and route high-value interactions, and context preservation to maintain interaction history across channels for personalized service."
        },
        {
          title: "Platform Integration",
          description: "We integrate leading contact center platforms with CRMs, IVR systems, and other enterprise tools to streamline operations. Supported integrations include Computer Telephony Integration (CTI) for real-time data access during customer interactions, Customer Relationship Management (CRM) systems for personalized, data-driven support, and AI agents and chatbots for automated, 24/7 customer assistance."
        },
        {
          title: "Scalable Multi-Site Deployments",
          description: "We design solutions for multi-site contact centers, ensuring consistent performance and centralized management across locations. Services include standardized configurations for uniform customer experiences, cloud-based or hybrid deployments for flexibility and scalability, and real-time monitoring and failover mechanisms for high availability."
        },
        {
          title: "Agent Productivity Tools",
          description: "We provide tools to enhance agent efficiency, including Agent Assist with real-time AI-driven suggestions, sentiment analysis, and knowledge base access, Unified Desktop as a single interface for managing all customer interactions across channels, and Analytics Dashboards with real-time insights into agent performance and customer metrics."
        }
      ],
      
      bestPractices: [
        {
          title: "Customer-Centric Design",
          description: "Prioritize seamless, personalized experiences across all channels to boost satisfaction and loyalty."
        },
        {
          title: "Scalability and Flexibility",
          description: "Design solutions to handle peak volumes and adapt to new channels or technologies."
        },
        {
          title: "Security and Compliance",
          description: "Implement encryption, access controls, and compliance with regulations like GDPR, PCI-DSS, and HIPAA."
        },
        {
          title: "Continuous Optimization",
          description: "Use analytics and customer feedback to refine routing logic and improve interaction quality."
        },
        {
          title: "Agent Training",
          description: "Provide ongoing training to ensure agents are proficient in handling omnichannel interactions."
        },
        {
          title: "Proactive Engagement",
          description: "Leverage predictive analytics to anticipate customer needs and initiate interactions."
        }
      ],
      
      technologies: [
        {
          title: "Contact Center Platforms",
          description: "Expertise in integrating industry-leading platforms for ACD, IVR, and omnichannel support."
        },
        {
          title: "Cloud Solutions",
          description: "AWS, Azure, or Google Cloud for scalable, secure deployments."
        },
        {
          title: "WebRTC",
          description: "Browser-based voice and video for enhanced accessibility and reduced infrastructure costs."
        },
        {
          title: "AI and Automation",
          description: "Chatbots, virtual agents, and predictive analytics for efficient customer handling."
        },
        {
          title: "Analytics Tools",
          description: "Real-time dashboards and reporting for performance monitoring."
        },
        {
          title: "Collaboration Platforms",
          description: "Integration with tools like Microsoft Teams, Slack, or Zoom for seamless agent collaboration."
        }
      ],
      
      conclusion: "With extensive experience in deploying omnichannel solutions for enterprise contact centers, we deliver scalable, unified communication platforms that enhance customer engagement and agent productivity. Our expertise in intelligent routing, platform integration, and multi-site deployments ensures seamless, high-impact solutions that drive operational excellence and superior customer experiences."
    }
  },
  "database-optimization-custom-development": {
    icon: <FaDatabase className="text-4xl text-teal-400" />,
    title: "Database Optimization and Custom Development",
    image: "/ddo.png",
    content: {
      overview: "Our Database Optimization and Custom Development services deliver high-performance, secure, and scalable database solutions tailored to contact center needs. We specialize in optimizing database performance, developing custom scripts, and designing secure environments to support mission-critical operations. With expertise in predictive dialer tuning, advanced reporting, and development/test lab setups, we ensure low-latency, reliable systems that enhance operational efficiency and meet demanding business requirements.",
      
      coreServices: [
        {
          title: "Database Optimization",
          description: "We enhance database performance to support high-volume contact center operations. Services include query optimization for streamlining SQL queries for faster execution and reduced resource usage, index tuning for designing and optimizing indexes to improve data retrieval speeds, database partitioning for segmenting large datasets for better scalability and performance, and performance monitoring for real-time analysis of database metrics to identify and resolve bottlenecks."
        },
        {
          title: "Custom Scripting and Development",
          description: "We build tailored solutions to meet specific operational needs, using modern programming languages and frameworks, including C# for developing robust applications for contact center integrations and automation, Java for building scalable backend systems for data processing and API integrations, SQL for creating advanced stored procedures, triggers, and scripts for efficient data management, and Python for automating workflows and integrating AI-driven analytics."
        },
        {
          title: "Predictive Dialer Tuning",
          description: "We optimize predictive dialer systems to maximize outbound campaign efficiency, including fine-tuning algorithms for optimal call pacing and agent utilization, integrating with CRM and analytics platforms for real-time performance insights, and ensuring compliance with regulations like TCPA and GDPR."
        },
        {
          title: "Reporting and Analytics Development",
          description: "We create custom reporting solutions to provide actionable insights, including real-time and historical reports for call volumes, agent performance, and customer metrics, integration with analytics platforms like Power BI or Tableau for dynamic visualizations, and automated report generation for operational and compliance needs."
        },
        {
          title: "Secure Development and Test Environments",
          description: "We design and implement secure lab environments for development and testing, ensuring reliability and data protection. Services include virtualization using VMware or similar platforms to create isolated dev/test environments, database platforms supporting Oracle, MS SQL, MySQL, and PostgreSQL for flexible testing, and security hardening implementing encryption, access controls, and compliance with standards like PCI-DSS and HIPAA."
        },
        {
          title: "Cloud and Hybrid Solutions",
          description: "We leverage cloud-based databases (e.g., AWS RDS, Azure SQL, Google Cloud SQL) and hybrid architectures to provide scalability, flexibility, and cost-efficiency."
        }
      ],
      
      bestPractices: [
        {
          title: "Performance-Driven Design",
          description: "Optimize databases and scripts for low latency and high throughput, ensuring seamless contact center operations."
        },
        {
          title: "Security and Compliance",
          description: "Implement robust security measures, including encryption and role-based access, to protect sensitive data."
        },
        {
          title: "Scalability",
          description: "Design systems to handle growing data volumes and peak loads without performance degradation."
        },
        {
          title: "Testing and Validation",
          description: "Conduct rigorous testing in dev/test environments to ensure reliability and compatibility before production deployment."
        },
        {
          title: "Documentation and Training",
          description: "Provide comprehensive documentation and training to support ongoing maintenance and adoption."
        },
        {
          title: "Continuous Monitoring",
          description: "Use real-time monitoring and alerting to proactively address performance issues."
        }
      ],
      
      technologies: [
        {
          title: "Database Platforms",
          description: "Oracle, MS SQL Server, MySQL, PostgreSQL, MongoDB."
        },
        {
          title: "Programming Languages",
          description: "C#, Java, SQL, Python."
        },
        {
          title: "Virtualization",
          description: "VMware, Hyper-V for secure dev/test environments."
        },
        {
          title: "Cloud Solutions",
          description: "AWS RDS, Azure SQL, Google Cloud SQL for scalable database hosting."
        },
        {
          title: "Analytics Tools",
          description: "Power BI, Tableau, and custom SQL reporting for actionable insights."
        },
        {
          title: "AI and Automation",
          description: "Integration with AI-driven analytics for predictive dialer optimization and reporting."
        },
        {
          title: "Monitoring Tools",
          description: "Prometheus, Grafana, and database-native monitoring for performance tracking."
        }
      ],
      
      conclusion: "With deep expertise in database optimization and custom development for enterprise contact centers, we deliver reliable, low-latency solutions tailored to operational demands. Our proven approach to predictive dialer tuning, advanced reporting, and secure environment design ensures scalable, high-performance systems that drive efficiency and support business-critical operations."
    }
  },
  "website-development-services": {
    icon: <FaCode className="text-4xl text-cyan-400" />,
    title: "Website Development Services",
    image: "/do.png",
    content: {
      overview: "Our Website Development Services deliver modern, responsive, and user-centric websites tailored to enhance customer engagement and support contact center operations. We specialize in creating scalable, secure, and high-performance web solutions that integrate seamlessly with contact center platforms, CRM systems, and omnichannel communication tools. Our expertise ensures visually appealing, functional websites that drive business success and elevate customer experiences.",
      
      coreServices: [
        {
          title: "Custom Website Development",
          description: "We design and build tailored websites to meet specific business needs, including Frontend Development using HTML, CSS, JavaScript, and frameworks like React or Vue.js for intuitive, responsive user interfaces, Backend Development with Node.js, Python (Django/Flask), or Java for robust server-side applications and seamless data processing, and Content Management Systems (CMS) implementing platforms like WordPress, Drupal, or custom CMS solutions for easy content updates and scalability."
        },
        {
          title: "Omnichannel Integration",
          description: "We integrate websites with contact center systems to enable seamless customer interactions, including WebRTC for browser-based voice and video for real-time customer support directly from the website, Live Chat and Chatbots with AI-powered chatbots and live chat for instant customer assistance, and CRM Integration connecting with platforms like Salesforce or HubSpot to personalize customer interactions and track engagement."
        },
        {
          title: "E-Commerce Solutions",
          description: "We develop secure, scalable e-commerce websites with features like product catalogs, shopping carts, and payment gateway integrations (e.g., Stripe, PayPal), customer account management and order tracking, and integration with contact centers for post-purchase support and returns."
        },
        {
          title: "Responsive and Accessible Design",
          description: "We ensure websites are optimized for all devices (desktop, tablet, mobile) and comply with accessibility standards (e.g., WCAG 2.1), providing mobile-first design for seamless user experiences, cross-browser compatibility and fast load times, and accessibility features for inclusive usability."
        },
        {
          title: "SEO and Performance Optimization",
          description: "We optimize websites for search engines and performance, including SEO Best Practices with keyword optimization, meta tags, and structured data for better search rankings, Performance Tuning with minifying code, optimizing images, and leveraging CDNs for faster load times, and Analytics Integration using tools like Google Analytics or Adobe Analytics for tracking user behavior and engagement."
        },
        {
          title: "Security and Compliance",
          description: "We implement robust security measures to protect user data and ensure compliance with regulations, including SSL/TLS encryption and secure API integrations, compliance with GDPR, CCPA, and PCI-DSS for data privacy and payment security, and regular security audits and vulnerability testing."
        }
      ],
      
      bestPractices: [
        {
          title: "User-Centric Design",
          description: "Prioritize intuitive navigation, engaging visuals, and clear calls-to-action to enhance user experience."
        },
        {
          title: "Agile Development",
          description: "Use iterative development and testing to deliver high-quality websites aligned with business goals."
        },
        {
          title: "Scalability",
          description: "Build websites to handle high traffic and support future growth with cloud-based or modular architectures."
        },
        {
          title: "Continuous Testing",
          description: "Conduct usability, performance, and security testing to ensure reliability across devices and browsers."
        },
        {
          title: "Maintenance and Support",
          description: "Provide ongoing updates, backups, and technical support to keep websites secure and up-to-date."
        },
        {
          title: "Customer Feedback Integration",
          description: "Incorporate feedback loops to refine website functionality and improve user satisfaction."
        }
      ],
      
      technologies: [
        {
          title: "Frontend Frameworks",
          description: "React, Vue.js, Angular for dynamic, responsive interfaces."
        },
        {
          title: "Backend Technologies",
          description: "Node.js, Python (Django/Flask), Java (Spring), PHP (Laravel)."
        },
        {
          title: "CMS Platforms",
          description: "WordPress, Drupal, Joomla, or custom-built CMS solutions."
        },
        {
          title: "Cloud Hosting",
          description: "AWS, Azure, Google Cloud for scalable, secure hosting."
        },
        {
          title: "WebRTC and Communication Tools",
          description: "Enabling real-time voice, video, and chat functionalities."
        },
        {
          title: "AI and Automation",
          description: "AI-driven chatbots and personalization engines for enhanced user engagement."
        },
        {
          title: "Analytics and SEO Tools",
          description: "Google Analytics, SEMrush, Yoast SEO for performance tracking and optimization."
        }
      ],
      
      conclusion: "With extensive experience in building enterprise-grade websites, we deliver solutions that enhance customer engagement and integrate seamlessly with contact center operations. Our focus on responsive design, omnichannel integration, and robust security ensures scalable, high-performance websites that drive business success and deliver exceptional user experiences."
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

      {/* Additional Images for RFP Development and Vendor Selection */}
      {serviceId === "rfp-development-vendor-selection" && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">RFP Creation</div>
                <div className="text-indigo-200 text-sm mt-2">Detailed Requirements</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">PoC Development</div>
                <div className="text-blue-200 text-sm mt-2">Proof of Concept</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Vendor Selection</div>
                <div className="text-green-200 text-sm mt-2">Evaluation Process</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Images for Multi-Channel Communication Solutions */}
      {serviceId === "multi-channel-communication-solutions" && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Omnichannel</div>
                <div className="text-orange-200 text-sm mt-2">Unified Experience</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Smart Routing</div>
                <div className="text-blue-200 text-sm mt-2">AI-Powered</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Multi-Site</div>
                <div className="text-green-200 text-sm mt-2">Scalable Deploy</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Images for Database Optimization and Custom Development */}
      {serviceId === "database-optimization-custom-development" && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">DB Optimization</div>
                <div className="text-teal-200 text-sm mt-2">High Performance</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Custom Dev</div>
                <div className="text-blue-200 text-sm mt-2">C#, Java, Python</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Predictive Dialer</div>
                <div className="text-green-200 text-sm mt-2">Tuning & Analytics</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Images for Website Development Services */}
      {serviceId === "website-development-services" && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Custom Dev</div>
                <div className="text-cyan-200 text-sm mt-2">React, Vue, Angular</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">E-Commerce</div>
                <div className="text-blue-200 text-sm mt-2">Secure & Scalable</div>
              </div>
            </div>
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                <div className="text-white text-2xl font-bold">Omnichannel</div>
                <div className="text-green-200 text-sm mt-2">WebRTC & Chat</div>
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

      {/* Technology Stack Visualization for Telephony Project Management */}
      {serviceId === "telephony-project-management" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Telephony Technology Stack
          </h2>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="bg-red-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">ACD</span>
                </div>
                <div className="text-gray-300 text-sm">Call Distribution</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SIP</span>
                </div>
                <div className="text-gray-300 text-sm">VoIP Protocols</div>
              </div>
              <div className="text-center">
                <div className="bg-green-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">WebRTC</span>
                </div>
                <div className="text-gray-300 text-sm">Real-time Comm</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI</span>
                </div>
                <div className="text-gray-300 text-sm">Intelligence</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Jira</span>
                </div>
                <div className="text-gray-300 text-sm">Project Mgmt</div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Cloud</span>
                </div>
                <div className="text-gray-300 text-sm">Infrastructure</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technology Stack Visualization for RFP Development and Vendor Selection */}
      {serviceId === "rfp-development-vendor-selection" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            RFP & Vendor Selection Technology Stack
          </h2>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="bg-indigo-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">RFP</span>
                </div>
                <div className="text-gray-300 text-sm">Requirements</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PoC</span>
                </div>
                <div className="text-gray-300 text-sm">Proof of Concept</div>
              </div>
              <div className="text-center">
                <div className="bg-green-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">API</span>
                </div>
                <div className="text-gray-300 text-sm">Integration</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI</span>
                </div>
                <div className="text-gray-300 text-sm">Intelligence</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Analytics</span>
                </div>
                <div className="text-gray-300 text-sm">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Cloud</span>
                </div>
                <div className="text-gray-300 text-sm">Platforms</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technology Stack Visualization for Multi-Channel Communication Solutions */}
      {serviceId === "multi-channel-communication-solutions" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Multi-Channel Technology Stack
          </h2>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Voice</span>
                </div>
                <div className="text-gray-300 text-sm">Telephony</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Chat</span>
                </div>
                <div className="text-gray-300 text-sm">Web Chat</div>
              </div>
              <div className="text-center">
                <div className="bg-green-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SMS</span>
                </div>
                <div className="text-gray-300 text-sm">Text Messaging</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Social</span>
                </div>
                <div className="text-gray-300 text-sm">Social Media</div>
              </div>
              <div className="text-center">
                <div className="bg-red-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI</span>
                </div>
                <div className="text-gray-300 text-sm">Intelligence</div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Cloud</span>
                </div>
                <div className="text-gray-300 text-sm">Platforms</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technology Stack Visualization for Database Optimization and Custom Development */}
      {serviceId === "database-optimization-custom-development" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Database & Development Technology Stack
          </h2>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="bg-teal-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SQL</span>
                </div>
                <div className="text-gray-300 text-sm">Database</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">C#</span>
                </div>
                <div className="text-gray-300 text-sm">Development</div>
              </div>
              <div className="text-center">
                <div className="bg-green-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Java</span>
                </div>
                <div className="text-gray-300 text-sm">Backend</div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Python</span>
                </div>
                <div className="text-gray-300 text-sm">Automation</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">VMware</span>
                </div>
                <div className="text-gray-300 text-sm">Virtualization</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Cloud</span>
                </div>
                <div className="text-gray-300 text-sm">Platforms</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technology Stack Visualization for Website Development Services */}
      {serviceId === "website-development-services" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 drop-shadow-lg mb-6">
            Website Development Technology Stack
          </h2>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="bg-cyan-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">React</span>
                </div>
                <div className="text-gray-300 text-sm">Frontend</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Node.js</span>
                </div>
                <div className="text-gray-300 text-sm">Backend</div>
              </div>
              <div className="text-center">
                <div className="bg-green-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">WordPress</span>
                </div>
                <div className="text-gray-300 text-sm">CMS</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AWS</span>
                </div>
                <div className="text-gray-300 text-sm">Cloud</div>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">WebRTC</span>
                </div>
                <div className="text-gray-300 text-sm">Real-time</div>
              </div>
              <div className="text-center">
                <div className="bg-red-600 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI</span>
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
