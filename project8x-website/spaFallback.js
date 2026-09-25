// Routes Amplify will 301 to a trailing slash, then look for <route>/index.html.
// A missing folder index is what makes /ContactUs/ return the SPA shell with HTTP 404.
export const spaFallbackRoutes = [
  "ContactUs",
  "CompanyServices",
  "Products",
  "ExecutiveLeadership",
  "platforms",
  "agentforge",
  "AgentForge",
  "work",
  "news",
  "about",
  "service/contact-center-technology-consulting",
  "service/system-integration-deployment",
  "service/real-time-analytics-dashboard",
  "service/devops-automation-implementation",
  "service/telephony-project-management",
  "service/rfp-development-vendor-selection",
  "service/multi-channel-communication-solutions",
  "service/database-optimization-custom-development",
  "service/website-development-services",
];
