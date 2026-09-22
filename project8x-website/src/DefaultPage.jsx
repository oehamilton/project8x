import { Link } from "react-router-dom";
import Page from "./Page.jsx";

const capabilities = [
  {
    title: "Delivery that survives cutover",
    text: "Architecture, integration, and program leadership for contact-center programs that have to work on day one — and day one hundred.",
    to: "/CompanyServices",
  },
  {
    title: "Genesys · Avaya · Cisco depth",
    text: "Platform work grounded in how queues, routing, and multi-site ops actually run — not generic IT slides.",
    to: "/platforms",
  },
  {
    title: "AgentForge",
    text: "An event-driven backbone for coordinating autonomous AI agents — isolation, schemas, and a clear path from pilot to production.",
    to: "/AgentForge",
  },
];

function DefaultPage() {
  return (
    <Page>
      <header className="sd-hero">
        <img className="sd-hero-mark" src="/Project8Xwt_tr.png" alt="" />
        <h1>Contact-center systems that hold under real load.</h1>
        <hr className="sd-rule" />
        <p className="sd-lede">
          Project8X designs, integrates, and stabilizes Genesys, Avaya, and Cisco
          platforms for Fortune 500 operations — with 35+ years in the chair.
        </p>
        <div className="sd-actions">
          <Link to="/ContactUs" className="sd-btn sd-btn-primary">
            Talk to an architect
          </Link>
          <Link to="/AgentForge" className="sd-btn sd-btn-secondary">
            See AgentForge
          </Link>
        </div>
      </header>

      <section className="sd-trust" aria-label="Trust">
        <p>
          35+ years in contact-center and telecom delivery · Fortune 500 programs
          · Genesys · Avaya · Cisco
        </p>
      </section>

      <section className="sd-section" aria-labelledby="capabilities-heading">
        <h2 id="capabilities-heading" className="sd-sr">
          Capabilities
        </h2>
        <div className="sd-capability-grid">
          {capabilities.map((item) => (
            <article className="sd-capability" key={item.title}>
              <h3>
                <Link to={item.to}>{item.title}</Link>
              </h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sd-band" aria-labelledby="cutover-heading">
        <h2 id="cutover-heading">Need an architect on the next cutover?</h2>
        <p>
          Tell us the platform, the constraint, and the date. We’ll answer with a
          clear plan — not a pitch deck.
        </p>
        <div className="sd-actions">
          <Link to="/ContactUs" className="sd-btn sd-btn-primary">
            Talk to an architect
          </Link>
        </div>
      </section>
    </Page>
  );
}

export default DefaultPage;
