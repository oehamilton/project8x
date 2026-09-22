export const serviceGroups = [
  {
    id: "advise",
    label: "Advise",
    summary: "Direction before the platform decision is locked.",
    items: [
      {
        title: "Contact Center Technology Consulting",
        description:
          "Business process, technology assessment, and implementation strategy for multi-site contact centers.",
        to: "/service/contact-center-technology-consulting",
      },
      {
        title: "RFP Development and Vendor Selection",
        description:
          "Requirements, proof of concept, and a structured path to a vendor decision.",
        to: "/service/rfp-development-vendor-selection",
      },
    ],
  },
  {
    id: "deliver",
    label: "Deliver",
    summary: "Integration, telephony, and the cutover itself.",
    items: [
      {
        title: "System Integration and Deployment",
        description:
          "Genesys, Avaya, Cisco ICM, and the systems they have to live with.",
        to: "/service/system-integration-deployment",
      },
      {
        title: "Telephony Project Management",
        description:
          "ACD upgrades, carrier circuits, and multi-site rollouts run to a plan.",
        to: "/service/telephony-project-management",
      },
      {
        title: "Multi-Channel Communication Solutions",
        description:
          "Voice, email, chat, and the routing that keeps them one conversation.",
        to: "/service/multi-channel-communication-solutions",
      },
      {
        title: "Website Development Services",
        description:
          "Sites that connect to the contact center instead of sitting beside it.",
        to: "/service/website-development-services",
      },
    ],
  },
  {
    id: "operate",
    label: "Operate",
    summary: "What the floor can see, and what keeps it running.",
    items: [
      {
        title: "Real-Time Analytics and Dashboard Development",
        description:
          "Operational visibility in Power BI, Python, JavaScript, and T-SQL.",
        to: "/service/real-time-analytics-dashboard",
      },
      {
        title: "DevOps and Automation Implementation",
        description:
          "Pipelines, containers, and the automation around a live estate.",
        to: "/service/devops-automation-implementation",
      },
      {
        title: "Database Optimization and Custom Development",
        description:
          "Performance, custom scripting, and environments that can be trusted in production.",
        to: "/service/database-optimization-custom-development",
      },
    ],
  },
];

export const platforms = [
  { id: "genesys", label: "Genesys", to: "/platforms#genesys" },
  { id: "avaya", label: "Avaya", to: "/platforms#avaya" },
  { id: "cisco", label: "Cisco", to: "/platforms#cisco" },
];

export const softwareProducts = {
  id: "products",
  label: "Software products",
  to: "/Products",
};
