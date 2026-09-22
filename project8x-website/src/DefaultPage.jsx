import { Link } from "react-router-dom";
import Page from "./Page.jsx";

const capabilities = [
  {
    title: "Platforms that fit how you actually run",
    text: "Genesys Cloud, Avaya, and Cisco — designed, integrated, and hardened for multi-site ops, not slideware.",
    to: "/platforms",
  },
  {
    title: "Programs that ship",
    text: "ACD upgrades, multi-site rollouts, vendor selection, and RFPs led by people who’ve lived the cutover.",
    to: "/CompanyServices",
  },
  {
    title: "AgentForge — coordinate the agents",
    text: "An event-driven backbone for autonomous AI agents — tenant isolation, schemas, and a path from pilot to production.",
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
          Project8X designs, integrates, and stabilizes contact-center platforms
          for Fortune 500 operations — Genesys, Avaya, and Cisco — with 35+ years
          in the chair.
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

      <section className="sd-trust" aria-label="Trusted in production">
        <p className="sd-kicker">Trusted in production</p>
        <ul>
          <li>35+ years contact-center &amp; telecom delivery</li>
          <li>Fortune 500 programs (banking, travel, retail, industrial)</li>
          <li>Genesys · Avaya · Cisco depth</li>
          <li>Architecture → cutover → stabilize</li>
        </ul>
        <p className="sd-trust-names">
          Bank of America · Expedia · Lockheed Martin · IBM · Disney · IKEA
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
