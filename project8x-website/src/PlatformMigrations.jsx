import { Link } from "react-router-dom";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";

const steps = [
  {
    title: "Assess",
    body: "Map queues, routing, integrations, and site reality before the move — so scope matches the floor, not the slide deck.",
    figure: "estate",
  },
  {
    title: "Cutover",
    body: "Sequence the migration for multi-site ops: what moves when, what fails closed, and who owns the night of.",
    figure: "sequence",
  },
  {
    title: "Stabilize",
    body: "Hypercare after go-live — fix what only shows under load, then hand back a platform that stays runnable.",
    figure: "stabilize",
  },
];

function PlatformMigrations() {
  return (
    <Page title="Platform migrations">
      <p className="sd-kicker">Services</p>
      <h1 className="sd-h1 sd-h1-migrations">Platform migrations that hold on day one.</h1>
      <hr className="sd-rule" />
      <p className="sd-lede">
        Contact-center platform moves across Genesys, Avaya, Cisco, Amazon Connect, and Verint-adjacent estates — multi-site, cutover-disciplined, built to stabilize.
      </p>

      <ol className="sd-migration-steps">
        {steps.map((step) => (
          <li className="sd-migration-step" key={step.title}>
            <SignalFigure variant={step.figure} />
            <div>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="sd-actions">
        <Link to="/ContactUs" className="sd-btn sd-btn-primary">
          Talk to an architect
        </Link>
        <Link to="/platforms" className="sd-btn sd-btn-secondary">
          See platforms
        </Link>
      </div>
    </Page>
  );
}

export default PlatformMigrations;
