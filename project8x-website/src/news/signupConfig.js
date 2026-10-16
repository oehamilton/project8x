// Build-time News signup. VITE_* values are public: they ship in the bundle.
//   VITE_NEWS_SIGNUP_ENDPOINT  https URL that accepts
//     POST application/json { "email": "...", "source": "project8x.com/news" }
//     and returns 2xx when the address was accepted.
//     Unset, or not http(s) as allowed below = the form stays disabled.
// Do not put a newsletter API key in a VITE_ variable.

const clean = (value) => (typeof value === "string" ? value.trim() : "");

export function newsSignupEndpoint(value = import.meta.env.VITE_NEWS_SIGNUP_ENDPOINT) {
  const raw = clean(value);
  if (!raw) return "";
  let url;
  try {
    url = new URL(raw);
  } catch {
    return "";
  }
  if (url.username || url.password) return "";
  if (url.protocol === "https:") return url.toString();
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol === "http:" && local) return url.toString();
  return "";
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isSignupEmail(value) {
  const email = clean(value);
  return email.length <= 254 && EMAIL.test(email);
}

export function buildSignupPayload(email) {
  return {
    email: clean(email),
    source: "project8x.com/news",
  };
}
