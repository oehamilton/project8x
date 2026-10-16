/**
 * Cloudflare Web Analytics beacon (cookieless).
 *
 * Token: VITE_CF_BEACON_TOKEN, inlined at build time. When it is missing
 * or not a single site token, no script is inserted, so local dev and
 * tests do not call Cloudflare.
 *
 * beacon.min.js (checked Oct 2026) reads data-cf-beacon. spa:true, the
 * string "true", or an omitted spa value selects History-and-Navigation-API
 * mode. spa:false turns SPA measurement off. In that mode the beacon
 * listens for Navigation API "navigate" events when the browser has them,
 * and otherwise wraps history.pushState and listens for popstate.
 *
 * This app uses react-router BrowserRouter (createBrowserHistory), not
 * HashRouter. Link clicks call history.pushState on window.history at
 * navigation time, so a beacon that patches that method still sees them
 * if it loads after the router is created. Hash-only changes are not
 * counted. replaceState (for example the /agentforge redirect) is counted
 * on browsers that emit Navigation API navigate events, and is not wrapped
 * by the pushState fallback.
 */

export const CF_BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js";

const TOKEN = /^[A-Za-z0-9_-]{10,128}$/;

export function cleanBeaconToken(value) {
  const text = typeof value === "string" ? value.trim() : "";
  return TOKEN.test(text) ? text : "";
}

export function cloudflareBeaconToken(env = import.meta.env) {
  return cleanBeaconToken(env?.VITE_CF_BEACON_TOKEN);
}

export function beaconOptions(token) {
  return { token, spa: true };
}

export function mountCloudflareBeacon(doc = document, token = cloudflareBeaconToken()) {
  const value = cleanBeaconToken(token);
  if (!value || typeof doc?.createElement !== "function") return null;
  const parent = doc.body || doc.head;
  if (!parent) return null;
  const existing = doc.querySelector?.("script[data-cf-beacon]");
  if (existing) return existing;

  const script = doc.createElement("script");
  script.type = "module";
  script.src = CF_BEACON_SRC;
  script.setAttribute("data-cf-beacon", JSON.stringify(beaconOptions(value)));
  parent.appendChild(script);
  return script;
}
