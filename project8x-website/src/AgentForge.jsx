import { Link } from "react-router-dom";
import Page from "./Page.jsx";

function AgentForge() {
  return (
    <Page title="AgentForge">
      <p className="sd-draft" role="note">
        Working draft — copy pending. Marketing has not locked this page.
      </p>
      <p className="sd-kicker">AgentForge</p>
      <h1 className="sd-h1 sd-h1-wide">Copy pending.</h1>
      <hr className="sd-rule" />
      <p className="sd-lede">
        A high-level placeholder only: AgentForge is Project8X’s AgenticAI
        backbone for agent communication and governance. Final wording is not
        set.
      </p>
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
