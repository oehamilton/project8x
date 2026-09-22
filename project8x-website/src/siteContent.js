export const serviceGroups = [
  {
    id: "platforms",
    label: "Platforms",
    summary: "Genesys Cloud · Avaya · Cisco · Amazon Connect · Verint.",
    items: [
      { title: "Genesys Cloud", description: "Designed, integrated, and hardened for multi-site operations.", to: "/platforms#genesys" },
      { title: "Avaya", description: "Upgrades and multi-site rollouts that keep voice coherent.", to: "/platforms#avaya" },
      { title: "Cisco", description: "Cisco contact center work, including Cisco ICM.", to: "/platforms#cisco" },
      { title: "Amazon Connect", description: "Cloud contact center on AWS — designed, integrated, and stood up for the operations you already run.", to: "/platforms#amazon-connect" },
      { title: "Verint", description: "Workforce and customer engagement platforms — integrated with the contact-center estate rather than bolted on beside it.", to: "/platforms#verint" },
      {
        title: "Platform migrations",
        description: "Moving contact-center platforms without losing the floor — cutover discipline across Genesys, Avaya, Cisco, and Amazon Connect.",
        to: "/platform-migrations",
      },
    ],
  },
  {
    id: "architecture",
    label: "Architecture & integration",
    summary: "How the platform sits in the estate you already run.",
    items: [
      {
        title: "Contact Center Technology Consulting",
        description: "Business process, technology assessment, and implementation strategy.",
        to: "/service/contact-center-technology-consulting",
      },
      {
        title: "System Integration and Deployment",
        description: "Genesys, Avaya, Cisco, Amazon Connect, Verint, and the systems they have to live with.",
        to: "/service/system-integration-deployment",
      },
      {
        title: "Multi-Channel Communication Solutions",
        description: "Voice, email, chat, and the routing that keeps them one conversation.",
        to: "/service/multi-channel-communication-solutions",
      },
      {
        title: "Website Development Services",
        description: "Sites that connect to the contact center instead of sitting beside it.",
        to: "/service/website-development-services",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations & analytics",
    summary: "What the floor can see, and what keeps it running.",
    items: [
      {
        title: "Real-Time Analytics and Dashboard Development",
        description: "Operational visibility in Power BI, Python, JavaScript, and T-SQL.",
        to: "/service/real-time-analytics-dashboard",
      },
      {
        title: "DevOps and Automation Implementation",
        description: "Pipelines, containers, and the automation around a live estate.",
        to: "/service/devops-automation-implementation",
      },
      {
        title: "Database Optimization and Custom Development",
        description: "Performance, custom scripting, and environments that can be trusted in production.",
        to: "/service/database-optimization-custom-development",
      },
    ],
  },
  {
    id: "programs",
    label: "Programs & RFPs",
    summary: "The cutover, the vendor decision, and the plan that holds.",
    items: [
      {
        title: "Telephony Project Management",
        description: "ACD upgrades, carrier circuits, and multi-site rollouts.",
        to: "/service/telephony-project-management",
      },
      {
        title: "RFP Development and Vendor Selection",
        description: "Requirements, proof of concept, and a structured path to a vendor decision.",
        to: "/service/rfp-development-vendor-selection",
      },
    ],
  },
];
