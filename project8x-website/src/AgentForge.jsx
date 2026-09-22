import { Link } from "react-router-dom";
import Page from "./Page.jsx";

function AgentForge() {
  return (
    <Page title="AgentForge">
      <p className="sd-kicker">AgentForge</p>
      <h1 className="sd-h1">AgentForge</h1>
      <hr className="sd-rule" />
      <div className="sd-prose">
        <p>
          Coordinate autonomous AI agents on an event-driven backbone built for
          real tenants — not a bolt-on chatbot.
        </p>
      </div>
      <div className="sd-actions">
        <Link to="/ContactUs" className="sd-btn sd-btn-primary">
          Talk to an architect
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
