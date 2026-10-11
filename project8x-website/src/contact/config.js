// Build-time contact settings. Set these in the Amplify console (or a local
// .env) and rebuild. VITE_* values are public: they ship in the browser bundle.
//   VITE_CONTACT_ENDPOINT   form endpoint that accepts a JSON POST (Formspree,
//                           Web3Forms, a Lambda function URL). Unset = mailto.
//   VITE_CONTACT_ACCESS_KEY optional; sent as "access_key" (Web3Forms needs it).
//   VITE_BOOKING_URL        optional scheduling link for "Book an architect call".

export const SALES_EMAIL = "sales@project8x.com";

const clean = (value) => (typeof value === "string" ? value.trim() : "");

export function contactEndpoint() {
  return clean(import.meta.env.VITE_CONTACT_ENDPOINT);
}

export function contactAccessKey() {
  return clean(import.meta.env.VITE_CONTACT_ACCESS_KEY);
}

export function bookingUrl() {
  const url = clean(import.meta.env.VITE_BOOKING_URL);
  return /^https:\/\//i.test(url) ? url : "";
}
