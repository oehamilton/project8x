import { Link } from "react-router-dom";
import Page from "./Page.jsx";

const executives = [
  {
    name: "Othell Hamilton",
    title: "CEO and Founder",
    image: "/ceo.png",
    description:
      "Over 35 years of hands-on expertise in communication technologies, software engineering, and contact center innovations.",
    details:
      "As the CEO and Founder of Project8X, I have over 35 years of hands-on expertise in communication technologies, software engineering, and contact center innovations, all to help businesses thrive in a connected world. I define my career by delivering high-impact solutions that enhance efficiency, security, and customer satisfaction for Fortune 500 clients and major organizations.",
    additionalInfo:
      "Designing transformative solutions for industry leaders such as Expedia, EDS, Lockheed Martin, ABB, Best Buy, Coca-Cola, Disney, Hertz, Bank of America, Exxon, Aetna, Allstate, CSAA, and IKEA, among others. My specialization lies in business process re-engineering with global implementations. I founded Project8X to unite top-tier talent in delivering innovative, AI-driven solutions.",
  },
  {
    name: "TBD",
    title: "CTO and Founder",
    image: "/road to the stars.png",
    description:
      "Leading technology innovation and strategic development for Project8X's cutting-edge solutions.",
    details: "The story will be revealed soon...",
    additionalInfo:
      "Stay tuned for more information about our Chief Technology Officer and their vision for Project8X's technological future.",
  },
];

function ExecutiveLeadership() {
  return (
    <Page title="About">
      <p className="sd-kicker">About</p>
      <h1 className="sd-h1">A delivery practice, led from the work.</h1>
      <hr className="sd-rule" />
      <p className="sd-lede">
        Project8X is a contact center technology practice. The public record of
        who leads it is below. The CTO biography is still unpublished.
      </p>

      {executives.map((executive) => (
        <article className="sd-person" key={executive.title}>
          <img
            src={executive.image}
            alt={
              executive.name === "TBD"
                ? ""
                : `${executive.name}, ${executive.title}`
            }
          />
          <div>
            <h2>{executive.name}</h2>
            <p className="sd-role">{executive.title}</p>
            <p>{executive.description}</p>
            <p>{executive.details}</p>
            <p>{executive.additionalInfo}</p>
          </div>
        </article>
      ))}

      <div className="sd-actions">
        <Link to="/ContactUs" className="sd-btn sd-btn-primary">
          Talk to an architect
        </Link>
      </div>
    </Page>
  );
}

export default ExecutiveLeadership;
