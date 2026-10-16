import { useId, useState } from "react";
import { buildSignupPayload, isSignupEmail, newsSignupEndpoint } from "./signupConfig.js";

const INVALID_COPY = "Enter an email address like name@company.com.";
const SUCCESS_COPY = "Thanks. We received that address for AI governance updates.";
const ERROR_COPY = "We couldn't save that email. Please try again.";
const COMING_SOON_COPY = "Signup is coming soon.";

function NewsSignup({ endpoint = newsSignupEndpoint(), fetchImpl }) {
  const id = useId();
  const emailId = `${id}-email`;
  const privacyId = `${id}-privacy`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const open = Boolean(endpoint);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!open) return;
    if (!isSignupEmail(email)) {
      setStatus("invalid");
      return;
    }
    if (event.currentTarget.elements.website?.value) return;
    setStatus("sending");
    try {
      const doFetch = fetchImpl ?? globalThis.fetch.bind(globalThis);
      const response = await doFetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildSignupPayload(email)),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const invalid = status === "invalid";
  const failed = status === "error";

  return (
    <section className="sd-section sd-news-signup" aria-labelledby={`${id}-heading`}>
      <div className="sd-news-signup-card">
        <p className="sd-kicker">Updates</p>
        <h2 id={`${id}-heading`}>Get AI governance updates</h2>
        <p className="sd-lede">
          Occasional notes on AI governance and contact-center regulation.
        </p>
        <form className="sd-news-signup-form" onSubmit={onSubmit} noValidate>
          <div className="sd-news-signup-row">
            <div className="sd-field">
              <label htmlFor={emailId}>Email</label>
              <input
                id={emailId}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={254}
                value={email}
                disabled={!open || status === "sending"}
                aria-invalid={invalid || undefined}
                aria-describedby={`${privacyId}${invalid || failed ? ` ${id}-message` : ""}`}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status === "invalid" || status === "error" || status === "sent") {
                    setStatus("idle");
                  }
                }}
              />
            </div>
            <button
              type="submit"
              className={`sd-btn sd-btn-primary${status === "sending" ? " is-sending" : ""}`}
              disabled={!open || status === "sending"}
            >
              {status === "sending" ? "Sending…" : open ? "Get updates" : "Coming soon"}
            </button>
          </div>
          <div className="sd-hp" aria-hidden="true">
            <label htmlFor={`${id}-website`}>Leave this field empty</label>
            <input
              id={`${id}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
          <div className="sd-form-status" role="status" aria-live="polite">
            {!open ? <p>{COMING_SOON_COPY}</p> : null}
            {status === "sent" ? <p className="sd-form-ok">{SUCCESS_COPY}</p> : null}
          </div>
          {invalid || failed ? (
            <p id={`${id}-message`} className="sd-form-error" role="alert">
              {invalid ? INVALID_COPY : ERROR_COPY}
            </p>
          ) : null}
        </form>
        <p id={privacyId} className="sd-news-signup-privacy">
          We’ll only use this email for occasional AI governance and CX regulation
          updates. We won’t sell or share it. You can unsubscribe any time.
        </p>
      </div>
    </section>
  );
}

export default NewsSignup;
