import { Link } from "react-router-dom";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";

function PlatformMigrations() {
  return (
    <Page title="Platform migrations">
      <header className="sd-page-head">
        <div>
          <p className="sd-kicker">Services</p>
          <h1 className="sd-h1">Platform migrations</h1>
          <hr className="sd-rule" />
          <p className="sd-lede">
            Moving contact-center platforms without losing the floor — cutover discipline across Genesys, Avaya, Cisco, and Amazon Connect.
          </p>
          <div className="sd-prose">
            <p>
              Architecture, sequencing, and day-one operations when the estate changes platforms — multi-site, routing, and the systems that have to move with voice and digital.
            </p>
            <p>
              Verint stays in that cutover when workforce engagement and analytics have to move with the platform.
            </p>
          </div>
          <div className="sd-actions">
            <Link to="/ContactUs" className="sd-btn sd-btn-primary">
              Talk to an architect
            </Link>
          </div>
        </div>
        <SignalFigure variant="migration" />
      </header>
    </Page>
  );
}

export default PlatformMigrations;
