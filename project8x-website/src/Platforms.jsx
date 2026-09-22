import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";

const platformSections = [
  {
    id: "genesys",
    title: "Genesys Cloud",
    body: "Integration and deployment of Genesys Cloud into the estate already in place: routing, channels, and the systems agents and supervisors depend on. Scope is set per program. We do not publish a certification claim here.",
  },
  {
    id: "avaya",
    title: "Avaya",
    body: "Avaya programs we are asked to run tend to be upgrades, multi-site rollouts, and the work of keeping voice coherent with the rest of the contact center.",
  },
  {
    id: "cisco",
    title: "Cisco",
    body: "Cisco contact center work, including Cisco ICM, covers integration with the wider stack and the cutover planning that goes with it.",
  },
  {
    id: "amazon-connect",
    title: "Amazon Connect",
    body: "Cloud contact-center delivery on Amazon Connect — designed into the estate, not a parallel experiment.",
  },
  {
    id: "verint",
    title: "Verint",
    body: "Workforce engagement and analytics kept in the same program as the voice/digital platform — so measurement moves with the cutover.",
  },
];

function Platforms() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView();
  }, [location.hash]);

  return (
    <Page title="Platforms">
      <header className="sd-page-head">
        <div>
          <p className="sd-kicker">Platforms</p>
          <h1 className="sd-h1 sd-h1-platforms">
            Delivery on the contact-center platforms enterprises already run — and the adjacent systems that make them measurable.
          </h1>
          <hr className="sd-rule" />
          <div className="sd-prose">
            <p>
              We architect and integrate Genesys, Avaya, Cisco, and Amazon Connect, and we work Verint into the same delivery story when workforce engagement and analytics have to move with the platform — not as a bolted-on afterthought.
            </p>
          </div>
        </div>
        <SignalFigure variant="topology" />
      </header>

      {platformSections.map((platform) => (
        <section className="sd-platform sd-anchor" id={platform.id} key={platform.id}>
          <h2>{platform.title}</h2>
          <div className="sd-prose">
            <p>{platform.body}</p>
          </div>
        </section>
      ))}

      <p className="sd-lede sd-platform-close">
        The through-line is contact-center delivery: cutover discipline, multi-site ops, and systems that hold under real load.
      </p>

      <div className="sd-actions">
        <Link to="/ContactUs" className="sd-btn sd-btn-primary">
          Talk to an architect
        </Link>
        <Link to="/CompanyServices" className="sd-btn sd-btn-secondary">
          View services
        </Link>
      </div>
    </Page>
  );
}

export default Platforms;
