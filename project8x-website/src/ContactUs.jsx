import { Link } from "react-router-dom";
import Page from "./Page.jsx";

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

function ContactUs() {
  return (
    <Page title="Contact">
      <p className="sd-kicker">Contact</p>
      <h1 className="sd-h1">Talk to an architect.</h1>
      <hr className="sd-rule" />
      <div className="sd-contact-primary">
        <p className="sd-lede">
          New contact center work starts with sales. For anything else, use the
          address that matches the question.
        </p>
        <div className="sd-actions">
          <a className="sd-btn sd-btn-primary" href="mailto:sales@project8x.com">
            Talk to an architect
          </a>
          <a className="sd-btn sd-btn-secondary" href="mailto:contact@project8x.com">
            contact@project8x.com
          </a>
        </div>
      </div>

      <div className="sd-contact-grid">
        {groups.map((group) => (
          <section key={group.title}>
            <h2>{group.title}</h2>
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
