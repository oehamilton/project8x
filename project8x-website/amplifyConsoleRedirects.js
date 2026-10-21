/**
 * Amplify Hosting does not load this file on deploy.
 *
 * amplify.yml only builds and publishes project8x-website/build. customHttp.yml
 * (removed when /admin was retired) can set response headers only. public/_redirects
 * is a Netlify file; Amplify does not read it.
 *
 * Paste the objects in `amplifyConsoleRedirects` into
 * Amplify console → Hosting → Rewrites and redirects, with every 301 above the
 * SPA catch-all. Saving that editor replaces the whole list: merge these rules
 * with any domain or other rules already there. If a 200 rewrite to /index.html
 * is already saved, keep that one rule and do not add a second catch-all. The
 * catch-all in this list must stay last.
 *
 * Amplify's wildcard is `<*>`, not `*`. A `<*>` placeholder has to be the last
 * thing in `source`, so /admin, /admin/, and /admin.html each need their own rule.
 */

export const adminRedirects = [
  { source: "/admin.html", target: "/", status: "301", condition: null },
  { source: "/admin", target: "/", status: "301", condition: null },
  { source: "/admin/", target: "/", status: "301", condition: null },
  { source: "/admin/<*>", target: "/", status: "301", condition: null },
];

// These lived only in public/_redirects, which Amplify never applied.
export const legacyProductRedirects = [
  { source: "/agentforge", target: "/jurivane", status: "301", condition: null },
  { source: "/agentforge/", target: "/jurivane", status: "301", condition: null },
  { source: "/AgentForge", target: "/jurivane", status: "301", condition: null },
  { source: "/AgentForge/", target: "/jurivane", status: "301", condition: null },
];

// Same regex the site used to ship in _redirects. It excludes real asset types
// (including pdf and html). Because `.html` is excluded, this rule will not
// send /admin.html anywhere — that URL needs the 301 above.
export const spaCatchAllRedirect = {
  source:
    "</^[^.]+$|\\.(?!(css|gif|ico|jpg|jpeg|js|png|txt|svg|woff|woff2|ttf|map|json|webp|pdf|html|xml|webmanifest)$)([^.]+$)/>",
  target: "/index.html",
  status: "200",
  condition: null,
};

export const amplifyConsoleRedirects = [
  ...adminRedirects,
  ...legacyProductRedirects,
  spaCatchAllRedirect,
];
