import { Link } from "react-router-dom";
import Page from "./Page.jsx";

function AgentForge() {
  return (
    <Page title="AgentForge">
      <p className="sd-kicker">AgentForge</p>
      <h1 className="sd-h1">The agent desktop, treated as delivery.</h1>
      <hr className="sd-rule" />
      <div className="sd-prose">
        <p>
          AgentForge is the Project8X name for the agent experience: the desktop,
          the work routed to it, and how that experience is stood up with Genesys,
          Avaya, or Cisco rather than bolted on later.
        </p>
        <p>
          This page is a working draft. Positioning, scope, and any proof points
          are still with Marketing.
        </p>
      </div>
      <div className="sd-actions">
        <Link to="/ContactUs" className="sd-btn sd-btn-primary">
          Talk to an architect
        </Link>
        <Link to="/platforms" className="sd-btn sd-btn-secondary">
          View platforms
        </Link>
      </div>
      <p className="sd-note">
        Draft copy for review. Do not treat the description above as final
        product language.
      </p>
    </Page>
  );
}

export default AgentForge;
