import { Link } from "react-router-dom";
import Page from "./Page.jsx";

function AgentForge() {
  return (
    <Page title="AgentForge">
      <p className="sd-kicker">AgentForge</p>
      <h1 className="sd-h1">AgentForge — coordinate the agents</h1>
      <hr className="sd-rule" />
      <div className="sd-prose">
        <p>
          An event-driven backbone for autonomous AI agents — tenant isolation,
          schemas, and a path from pilot to production.
        </p>
      </div>
      <div className="sd-actions">
        <Link to="/ContactUs" className="sd-btn sd-btn-primary">
          Talk to an architect
        </Link>
      </div>
    </Page>
  );
}

export default AgentForge;
