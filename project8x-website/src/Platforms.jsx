import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Page from "./Page.jsx";

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
      <p className="sd-kicker">Platforms</p>
      <h1 className="sd-h1">Genesys, Avaya, and Cisco.</h1>
      <hr className="sd-rule" />
      <p className="sd-lede">
        Project8X integrates contact center platforms with the infrastructure
        already running. Related delivery work has also included AWS Connect,
        Google Dialogflow, and Verint.
      </p>

      {platformSections.map((platform) => (
        <section className="sd-platform sd-anchor" id={platform.id} key={platform.id}>
          <h2>{platform.title}</h2>
          <div className="sd-prose">
            <p>{platform.body}</p>
          </div>
        </section>
      ))}

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
