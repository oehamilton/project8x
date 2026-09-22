import { Link } from "react-router-dom";
import Page from "./Page.jsx";
import { serviceGroups } from "./siteContent.js";

function CompanyServices() {
  return (
    <Page title="Services">
      <p className="sd-kicker">Services</p>
      <h1 className="sd-h1">Platforms, architecture, and programs.</h1>
      <hr className="sd-rule" />
      <p className="sd-lede">
        Contact center technology, from the recommendation through deployment
        and the systems that have to keep running afterward.
      </p>

      {serviceGroups.map((group) => (
        <section className="sd-group" key={group.id} aria-labelledby={`${group.id}-heading`}>
          <div className="sd-group-head">
            <h2 id={`${group.id}-heading`}>{group.label}</h2>
            <p>{group.summary}</p>
          </div>
          <ul className="sd-service-list">
            {group.items.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="sd-service-link">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="sd-actions">
        <Link to="/ContactUs" className="sd-btn sd-btn-primary">
          Talk to an architect
        </Link>
      </div>
    </Page>
  );
}

export default CompanyServices;
