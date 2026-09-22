import { Link } from "react-router-dom";
import Page from "./Page.jsx";

function AgentForge() {
  return (
    <Page title="AgentForge">
      <p className="sd-draft" role="note">
        Draft. Marketing still owns final positioning, scope, and proof.
      </p>
      <p className="sd-kicker">AgentForge</p>
      <h1 className="sd-h1">AgentForge</h1>
      <hr className="sd-rule" />
      <div className="sd-prose">
        <p>
          AgentForge is the Project8X name for the agent experience: the desktop,
          the work routed to it, and standing that up with Genesys, Avaya, and
          Cisco rather than bolting it on later.
        </p>
        <p>The agent desktop is delivery.</p>
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
