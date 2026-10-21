// Routes Amplify will 301 to a trailing slash, then look for <route>/index.html.
// A missing folder index is what makes /ContactUs/ return the SPA shell with HTTP 404.
//
// "admin" is retired. There must not be an admin.html file: Amplify serves /admin
// from admin.html with status 200 when that file exists. With no admin.html, Amplify
// 301s /admin to /admin/ and then requires admin/index.html. This copy stops that
// 404 and lets the client router send the visitor to /. It is not an HTTP 301 to /.
// That redirect is an Amplify console rule (see amplifyConsoleRedirects.js).
export const spaFallbackRoutes = [
  "ContactUs",
  "CompanyServices",
  "Products",
  "ExecutiveLeadership",
  "platforms",
  "jurivane",
  "agentforge",
  "AgentForge",
  "work",
  "news",
  "privacy",
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
  "admin",
];
