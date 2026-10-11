import { useId, useState } from "react";
import { SALES_EMAIL, contactAccessKey, contactEndpoint } from "./config.js";

export const PLATFORMS = [
  "Genesys Cloud",
  "Amazon Connect",
  "Avaya",
  "Cisco",
  "Verint",
  "Other",
];

const EMPTY = {
  name: "",
  email: "",
  company: "",
  platform: "",
  message: "",
  website: "", // honeypot: hidden from people, tempting to bots
};

export function buildSubject(values) {
  const who = values.company.trim() || values.name.trim();
  return `Platform assessment request — ${who}`;
}

export function buildMailto(values, to = SALES_EMAIL) {
  const body = [
    `Name: ${values.name.trim()}`,
    `Work email: ${values.email.trim()}`,
    `Company: ${values.company.trim() || "—"}`,
    `Platform: ${values.platform || "—"}`,
    "",
    values.message.trim(),
  ].join("\n");
  const params = new URLSearchParams({ subject: buildSubject(values), body });
  // mailto bodies want %20, not "+", for spaces.
  return `mailto:${to}?${params.toString().replace(/\+/g, "%20")}`;
}

export function buildPayload(values, accessKey = "") {
  return {
    ...(accessKey ? { access_key: accessKey } : {}),
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    platform: values.platform,
    message: values.message.trim(),
    subject: buildSubject(values),
    _subject: buildSubject(values),
    source: "project8x.com contact form",
  };
}

function defaultOpenMailto(url) {
  window.location.href = url;
}

function ContactForm({
  endpoint = contactEndpoint(),
  accessKey = contactAccessKey(),
  fetchImpl,
  openMailto = defaultOpenMailto,
}) {
  const id = useId();
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mailto | error

  const update = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity?.();
      return;
    }
    if (values.website) {
      // Honeypot filled: act as if it worked and send nothing.
      setStatus("sent");
      return;
    }
    if (!endpoint) {
      openMailto(buildMailto(values));
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const doFetch = fetchImpl ?? globalThis.fetch.bind(globalThis);
      const response = await doFetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildPayload(values, accessKey)),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const f = (name) => `${id}-${name}`;

  return (
    <form className="sd-form" onSubmit={onSubmit} aria-describedby={f("hint")}>
      <p id={f("hint")} className="sd-form-hint">
        Fields marked * are required. We use this only to reply to you.
      </p>
      <div className="sd-form-grid">
        <div className="sd-field">
          <label htmlFor={f("name")}>Name *</label>
          <input id={f("name")} name="name" type="text" autoComplete="name" required
            value={values.name} onChange={update("name")} />
        </div>
        <div className="sd-field">
          <label htmlFor={f("email")}>Work email *</label>
          <input id={f("email")} name="email" type="email" autoComplete="email" required
            value={values.email} onChange={update("email")} />
        </div>
        <div className="sd-field">
          <label htmlFor={f("company")}>Company</label>
          <input id={f("company")} name="company" type="text" autoComplete="organization"
            value={values.company} onChange={update("company")} />
        </div>
        <div className="sd-field">
          <label htmlFor={f("platform")}>Platform</label>
          <select id={f("platform")} name="platform" value={values.platform}
            onChange={update("platform")}>
            <option value="">Select a platform</option>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
        <div className="sd-field sd-field-wide">
          <label htmlFor={f("message")}>What’s the challenge? *</label>
          <textarea id={f("message")} name="message" rows={5} required
            value={values.message} onChange={update("message")} />
        </div>
        <div className="sd-hp" aria-hidden="true">
          <label htmlFor={f("website")}>Leave this field empty</label>
          <input id={f("website")} name="website" type="text" tabIndex={-1} autoComplete="off"
            value={values.website} onChange={update("website")} />
        </div>
      </div>
      <div className="sd-actions sd-form-actions">
        <button type="submit" className="sd-btn sd-btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request a platform assessment"}
        </button>
      </div>
      <div className="sd-form-status" role="status" aria-live="polite">
        {status === "sent" ? (
          <p className="sd-form-ok">Thanks — your message is in. An architect will reply by email.</p>
        ) : null}
        {status === "mailto" ? (
          <p className="sd-form-ok">
            Your email app should open with the message filled in — press send there. If nothing
            opened, email <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a>.
          </p>
        ) : null}
      </div>
      {status === "error" ? (
        <p className="sd-form-error" role="alert">
          Something went wrong and your message was not sent. Please try again, or email{" "}
          <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a>.
        </p>
      ) : null}
    </form>
  );
}

export default ContactForm;
