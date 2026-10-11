import { Link } from "react-router-dom";
import AgentForgeArchitecture from "./AgentForgeArchitecture.jsx";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";

export const capabilities = [
  {
    title: "Event-driven backbone",
    text: "a Kafka-compatible event backbone that agents and systems use to exchange messages and work.",
  },
  {
    title: "Governed provisioning",
    text: "agents and tenants are onboarded through a questionnaire and approval flow before they can act.",
  },
  {
    title: "Schema registry",
    text: "message contracts are registered and versioned, so agents exchange structured, checkable events.",
  },
  {
    title: "Tenant isolation",
    text: "each tenant’s agents get their own credentials, topics, and permissions.",
  },
  {
    title: "Audit trail",
    text: "provisioning decisions and agent events are recorded for review.",
  },
  {
    title: "Pause and stop",
    text: "an operator can pause or stop an agent by revoking its credentials on the backbone.",
  },
  {
    title: "Python SDK",
    text: "for building agents and connecting them to the backbone.",
  },
];

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
    title: "Governed provisioning",
    text: "Agents and tenants are onboarded through a defined questionnaire and approval flow that sets their permissions, topics, schemas, and tenant isolation before they can act — so each agent starts on the Kafka-compatible event backbone with a known scope and message contracts registered in the schema registry.",
  },
  {
    title: "Pilot to production",
    text: "Discipline to move from experiment to production without losing isolation or operational control.",
  },
];

function AgentForge() {
  return (
    <Page
      title="AgentForge"
      description="AgentForge by Project8X: Command and Control for Agentic Operations. A Kafka-compatible backbone to provision, govern, observe, and stop AI agents. Available for design-partner pilots."
      width="wide"
    >
      <header className="sd-page-head">
        <div>
          <p className="sd-kicker">AgentForge</p>
          <h1 className="sd-h1 sd-h1-wide">
            AgenticAI backbone for agent communication and governance.
          </h1>
          <hr className="sd-rule" />
          <p className="sd-lede">
            <strong>
              Command and Control for Agentic Operations: provision, govern, observe,
              and stop AI agents.
            </strong>{" "}
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
      <section className="sd-af-section" aria-labelledby="af-capabilities-heading">
        <h2 id="af-capabilities-heading">Current capabilities</h2>
        <p>
          AgentForge is at the foundation (MVP) stage and available for
          design-partner pilots. What it does today:
        </p>
        <ul className="sd-capability-list">
          {capabilities.map((item) => (
            <li key={item.title}>
              <strong>{item.title}:</strong> {item.text}
            </li>
          ))}
        </ul>
      </section>
      <AgentForgeArchitecture />
      <section className="sd-af-section" aria-labelledby="af-estate-heading">
        <h2 id="af-estate-heading">How it fits your contact-center estate</h2>
        <p>
          AgentForge does not replace Genesys Cloud, Amazon Connect, your CRM, or
          your integration layer. It sits beside them as the governed channel AI
          agents use to communicate and act.
        </p>
        <p>
          Events come in from those systems and go back out to them through APIs
          and connectors you control, so agent work travels a path that is
          provisioned, schema-checked, isolated by tenant, and recorded.
          Connectors are built for each estate during a pilot; AgentForge does
          not claim certified or prebuilt platform integrations.
        </p>
      </section>
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
