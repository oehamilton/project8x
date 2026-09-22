import { Link } from "react-router-dom";
import Page from "./Page.jsx";
import SignalFigure from "./SignalFigure.jsx";

function Work() {
  return (
    <Page title="Work">
      <header className="sd-page-head">
        <div>
          <p className="sd-kicker">Work</p>
          <h1 className="sd-h1">Organizations already on the record.</h1>
          <hr className="sd-rule" />
          <div className="sd-prose">
        <p>
          Project8X publishes the organizations its practitioners have worked
          with. It does not publish written case studies on this site.
        </p>
        <p>
          Names already on these pages include Bank of America, IBM, EDS,
          Lockheed Martin, Expedia, ABB, Best Buy, Coca-Cola, Disney, Hertz,
          Exxon, Aetna, Allstate, CSAA, and IKEA. Ask for work that is relevant
          to your estate. We will not dress a logo list up as a result.
        </p>
          </div>
        </div>
        <SignalFigure variant="sites" />
      </header>
      <div className="sd-actions">
        <Link to="/ContactUs" className="sd-btn sd-btn-primary">
          Talk to an architect
        </Link>
        <Link to="/about" className="sd-btn sd-btn-secondary">
          About the practice
        </Link>
      </div>
    </Page>
  );
}

export default Work;
