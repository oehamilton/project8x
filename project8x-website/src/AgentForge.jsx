import { Link } from "react-router-dom";
import Page from "./Page.jsx";

const sections = [
  {
    title: "Desktop",
    text: "A focused agent workspace designed as part of the delivery, not a side app the floor has to invent around.",
  },
  {
    title: "Work routed",
    text: "Interactions, tasks, and context routed to the agent with the same discipline you’d expect from queue and routing design elsewhere in the estate.",
  },
  {
    title: "Stood up on Genesys · Avaya · Cisco",
    text: "Built against the platform you run — integrated in the program, not parked as a later add-on.",
  },
];

function AgentForge() {
  return (
    <Page title="AgentForge">
      <p className="sd-draft" role="note">
        Working draft — positioning and proof points are still being sharpened.
      </p>
      <p className="sd-kicker">AgentForge</p>
      <h1 className="sd-h1 sd-h1-wide">Agent desktop, treated as delivery.</h1>
      <hr className="sd-rule" />
      <p className="sd-lede">
        AgentForge is the Project8X name for the agent experience: the desktop,
        the work that reaches it, and how that experience is delivered on the
        contact-center platforms you already run.
      </p>
      {sections.map((section) => (
        <section className="sd-af-section" key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
      <div className="sd-actions">
        <Link to="/ContactUs" className="sd-btn sd-btn-primary">
          Talk to an architect
        </Link>
        <Link to="/CompanyServices" className="sd-btn sd-btn-secondary">
          See our services
        </Link>
      </div>
      <p className="sd-quiet-admin">
        <Link to="/admin" rel="nofollow">
          Admin
        </Link>
      </p>
    </Page>
  );
}

export default AgentForge;
