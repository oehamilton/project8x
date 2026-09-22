import { Link } from "react-router-dom";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";

const sections = [
  {
    title: "Communication",
    text: "A backbone for how agents exchange messages and work — structured, routable, and built for multi-agent systems rather than one-off integrations.",
  },
  {
    title: "Governance",
    text: "Tenant isolation, schemas, and control so agent behavior stays auditable and contained as the estate grows.",
  },
  {
    title: "Pilot to production",
    text: "Discipline to move from experiment to production without losing isolation or operational control.",
  },
];

function AgentForge() {
  return (
    <Page title="AgentForge">
      <header className="sd-page-head">
        <div>
          <p className="sd-draft" role="note">
            Working draft — scope and proof points are still being sharpened.
          </p>
          <p className="sd-kicker">AgentForge</p>
          <h1 className="sd-h1 sd-h1-wide">
            AgenticAI backbone for agent communication and governance.
          </h1>
          <hr className="sd-rule" />
          <p className="sd-lede">
            AgentForge is Project8X’s name for the fabric that lets autonomous agents
            communicate and stay governed — isolation, schemas, and control with a
            clear path from pilot to production.
          </p>
          <div className="sd-actions">
            <Link to="/ContactUs" className="sd-btn sd-btn-primary">
              Talk to an architect
            </Link>
            <Link to="/CompanyServices" className="sd-btn sd-btn-secondary">
              See our services
            </Link>
          </div>
        </div>
        <SignalFigure variant="agents" />
      </header>
      {sections.map((section) => (
        <section className="sd-af-section" key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
      <p className="sd-quiet-admin">
        <Link to="/admin" rel="nofollow">
          Admin
        </Link>
      </p>
    </Page>
  );
}

export default AgentForge;
