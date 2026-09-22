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
            Moving between contact-center platforms without losing the floor.
          </p>
          <div className="sd-prose">
            <p>
              Migrations across Genesys, Avaya, Cisco, and Amazon Connect — architecture, parallel run, and cutover discipline so queues, routing, and reporting hold on day one.
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
