import { Link } from "react-router-dom";
import Page from "./Page.jsx";

const capabilities = [
  {
    kicker: "Services",
    title: "Advise, then deliver",
    text: "Consulting, integration, and the program that gets a contact center into production.",
    to: "/CompanyServices",
    link: "View services",
  },
  {
    kicker: "Platforms",
    title: "Genesys, Avaya, Cisco",
    text: "The three estates we are asked to integrate, migrate, and keep coherent.",
    to: "/platforms",
    link: "View platforms",
  },
  {
    kicker: "AgentForge",
    title: "The agent experience",
    text: "What people on the floor actually use, designed with the platform rather than after it.",
    to: "/agentforge",
    link: "See AgentForge",
  },
];

function DefaultPage() {
  return (
    <Page>
      <header className="sd-hero">
        <p className="sd-kicker">Contact center delivery</p>
        <h1>Enterprise contact centers, delivered.</h1>
        <hr className="sd-rule" />
        <p className="sd-lede">
          Contact center technology consulting and implementation for multi-site
          enterprises on Genesys, Avaya, and Cisco.
        </p>
        <div className="sd-actions">
          <Link to="/ContactUs" className="sd-btn sd-btn-primary">
            Talk to an architect
          </Link>
          <Link to="/agentforge" className="sd-btn sd-btn-secondary">
            See AgentForge
          </Link>
        </div>
      </header>

      <section className="sd-trust" aria-label="Experience">
        <p>
          Practitioners with 35+ years in communications technology. Organizations
          named in our public materials include Bank of America, IBM, EDS,
          Lockheed Martin, and Expedia.
        </p>
      </section>

      <section className="sd-section" aria-labelledby="capabilities-heading">
        <h2 id="capabilities-heading">Where to start</h2>
        <div className="sd-capability-grid">
          {capabilities.map((item) => (
            <article className="sd-capability" key={item.title}>
              <p className="sd-kicker">{item.kicker}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link to={item.to} className="sd-text-link">
                {item.link}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}

export default DefaultPage;
