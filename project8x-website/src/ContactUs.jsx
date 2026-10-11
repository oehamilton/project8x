import { Link } from "react-router-dom";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";
import ContactForm from "./contact/ContactForm.jsx";
import { bookingUrl } from "./contact/config.js";

const groups = [
  {
    title: "Start a program",
    items: [
      { label: "Sales", email: "sales@project8x.com" },
      { label: "Services", email: "services@project8x.com" },
      { label: "Product demos", email: "demo@project8x.com" },
      { label: "General", email: "info@project8x.com" },
    ],
  },
  {
    title: "Already working with us",
    items: [
      { label: "Technical support", email: "support@project8x.com" },
      { label: "Help desk", email: "help@project8x.com" },
      { label: "Accounts", email: "accounts@project8x.com" },
      { label: "Billing", email: "billing@project8x.com" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Human resources", email: "hr@project8x.com" },
      { label: "Careers", email: "careers@project8x.com" },
      { label: "Press", email: "press@project8x.com" },
      { label: "Feedback", email: "feedback@project8x.com" },
    ],
  },
];

function ContactUs({ booking = bookingUrl(), formProps = {} }) {
  return (
    <Page
      title="Contact"
      description="Talk to a Project8X contact-center architect. Request a platform assessment for Genesys Cloud, Amazon Connect, Avaya, Cisco, or Verint, or find the right Project8X email address."
    >
      <header className="sd-page-head">
        <div>
          <p className="sd-kicker">Contact</p>
          <h1 className="sd-h1">Talk to an architect.</h1>
          <hr className="sd-rule" />
          <p className="sd-lede">
            Tell us the platform, the constraint, and the date. An architect reads
            every request and replies by email.
          </p>
          {booking ? (
            <div className="sd-actions">
              <a
                className="sd-btn sd-btn-secondary"
                href={booking}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book an architect call
              </a>
            </div>
          ) : null}
        </div>
        <SignalFigure variant="contact" />
      </header>

      <section
        id="contact-form"
        className="sd-section sd-contact-primary"
        aria-labelledby="contact-form-heading"
      >
        <h2 id="contact-form-heading">Request a platform assessment</h2>
        <ContactForm {...formProps} />
      </section>

      <section className="sd-section" aria-labelledby="contact-directory-heading">
        <h2 id="contact-directory-heading">Prefer email?</h2>
        <p className="sd-lede sd-contact-lede">
          New contact-center work starts with{" "}
          <a className="sd-text-link" href="mailto:sales@project8x.com">
            sales@project8x.com
          </a>
          . For anything else, use the address that matches the question.
        </p>
        <div className="sd-contact-grid">
          {groups.map((group) => (
            <section key={group.title} aria-label={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.email}>
                    <span>{item.label}</span>
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <p className="sd-note">
        Looking for COMMS, EZ-SMS.NET, or AZIMUTH? Those stay on the{" "}
        <Link to="/Products" className="sd-text-link">
          products page
        </Link>
        .
      </p>
    </Page>
  );
}

export default ContactUs;
